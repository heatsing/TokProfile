create table public.tiktok_authorizations (
  id bigint generated always as identity primary key,
  open_id text not null,
  username text,
  granted_scopes text[] not null,
  status text not null,
  consented_at timestamptz not null,
  disconnected_at timestamptz,
  last_refreshed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tiktok_authorizations_open_id_unique unique (open_id),
  constraint tiktok_authorizations_open_id_check check (
    length(open_id) between 8 and 255
  ),
  constraint tiktok_authorizations_username_check check (
    username is null
    or (
      username = lower(username)
      and username ~ '^[a-z0-9._]{2,24}$'
    )
  ),
  constraint tiktok_authorizations_scopes_check check (
    cardinality(granted_scopes) > 0
  ),
  constraint tiktok_authorizations_status_check check (
    status in ('active', 'disconnected', 'refresh_failed')
  )
);

create index tiktok_authorizations_status_updated_idx
  on public.tiktok_authorizations (status, updated_at desc);

create table public.tiktok_oauth_tokens (
  authorization_id bigint primary key references public.tiktok_authorizations(id) on delete cascade,
  access_token_ciphertext text not null,
  refresh_token_ciphertext text not null,
  access_token_expires_at timestamptz not null,
  refresh_token_expires_at timestamptz not null,
  encryption_key_version integer not null,
  rotated_at timestamptz not null default now(),
  constraint tiktok_oauth_tokens_expiry_check check (
    refresh_token_expires_at > access_token_expires_at
  ),
  constraint tiktok_oauth_tokens_key_version_check check (
    encryption_key_version > 0
  )
);

create table public.tiktok_authorization_sessions (
  session_token_hash text primary key,
  authorization_id bigint not null references public.tiktok_authorizations(id) on delete cascade,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  constraint tiktok_authorization_sessions_hash_check check (
    session_token_hash ~ '^[a-f0-9]{64}$'
  )
);

create index tiktok_authorization_sessions_authorization_idx
  on public.tiktok_authorization_sessions (authorization_id, expires_at desc);

alter table public.tiktok_authorizations enable row level security;
alter table public.tiktok_oauth_tokens enable row level security;
alter table public.tiktok_authorization_sessions enable row level security;

alter table public.tiktok_authorizations force row level security;
alter table public.tiktok_oauth_tokens force row level security;
alter table public.tiktok_authorization_sessions force row level security;

revoke all on table public.tiktok_authorizations from public, anon, authenticated;
revoke all on table public.tiktok_oauth_tokens from public, anon, authenticated;
revoke all on table public.tiktok_authorization_sessions from public, anon, authenticated;

grant select on table public.tiktok_authorizations to service_role;
grant select on table public.tiktok_oauth_tokens to service_role;
grant select on table public.tiktok_authorization_sessions to service_role;

create or replace function public.store_tiktok_authorization(payload jsonb)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  authorization_pk bigint;
begin
  insert into public.tiktok_authorizations (
    open_id,
    username,
    granted_scopes,
    status,
    consented_at,
    disconnected_at,
    last_refreshed_at
  )
  values (
    payload->>'openId',
    lower(payload->>'username'),
    array(select jsonb_array_elements_text(payload->'grantedScopes')),
    'active',
    (payload->>'consentedAt')::timestamptz,
    null,
    (payload->>'consentedAt')::timestamptz
  )
  on conflict (open_id) do update set
    username = excluded.username,
    granted_scopes = excluded.granted_scopes,
    status = 'active',
    consented_at = excluded.consented_at,
    disconnected_at = null,
    last_refreshed_at = excluded.last_refreshed_at,
    updated_at = now()
  returning id into authorization_pk;

  insert into public.tiktok_oauth_tokens (
    authorization_id,
    access_token_ciphertext,
    refresh_token_ciphertext,
    access_token_expires_at,
    refresh_token_expires_at,
    encryption_key_version,
    rotated_at
  )
  values (
    authorization_pk,
    payload->>'accessTokenCiphertext',
    payload->>'refreshTokenCiphertext',
    (payload->>'accessTokenExpiresAt')::timestamptz,
    (payload->>'refreshTokenExpiresAt')::timestamptz,
    (payload->>'encryptionKeyVersion')::integer,
    now()
  )
  on conflict (authorization_id) do update set
    access_token_ciphertext = excluded.access_token_ciphertext,
    refresh_token_ciphertext = excluded.refresh_token_ciphertext,
    access_token_expires_at = excluded.access_token_expires_at,
    refresh_token_expires_at = excluded.refresh_token_expires_at,
    encryption_key_version = excluded.encryption_key_version,
    rotated_at = now();

  insert into public.tiktok_authorization_sessions (
    session_token_hash,
    authorization_id,
    expires_at
  )
  values (
    payload->>'sessionTokenHash',
    authorization_pk,
    (payload->>'sessionExpiresAt')::timestamptz
  )
  on conflict (session_token_hash) do update set
    authorization_id = excluded.authorization_id,
    expires_at = excluded.expires_at,
    revoked_at = null;

  return authorization_pk;
end;
$$;

create or replace function public.rotate_tiktok_oauth_tokens(payload jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.tiktok_oauth_tokens
  set
    access_token_ciphertext = payload->>'accessTokenCiphertext',
    refresh_token_ciphertext = payload->>'refreshTokenCiphertext',
    access_token_expires_at = (payload->>'accessTokenExpiresAt')::timestamptz,
    refresh_token_expires_at = (payload->>'refreshTokenExpiresAt')::timestamptz,
    encryption_key_version = (payload->>'encryptionKeyVersion')::integer,
    rotated_at = now()
  where authorization_id = (payload->>'authorizationId')::bigint;

  if not found then
    raise exception 'Authorization token row not found';
  end if;

  update public.tiktok_authorizations
  set
    granted_scopes = array(
      select jsonb_array_elements_text(payload->'grantedScopes')
    ),
    status = 'active',
    last_refreshed_at = now(),
    updated_at = now()
  where id = (payload->>'authorizationId')::bigint;
end;
$$;

create or replace function public.disconnect_tiktok_authorization(
  target_authorization_id bigint
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.tiktok_authorizations
  set
    status = 'disconnected',
    disconnected_at = now(),
    updated_at = now()
  where id = target_authorization_id;

  delete from public.tiktok_oauth_tokens
  where authorization_id = target_authorization_id;

  update public.tiktok_authorization_sessions
  set revoked_at = now()
  where authorization_id = target_authorization_id
    and revoked_at is null;
end;
$$;

revoke all on function public.store_tiktok_authorization(jsonb)
  from public, anon, authenticated;
revoke all on function public.rotate_tiktok_oauth_tokens(jsonb)
  from public, anon, authenticated;
revoke all on function public.disconnect_tiktok_authorization(bigint)
  from public, anon, authenticated;

grant execute on function public.store_tiktok_authorization(jsonb)
  to service_role;
grant execute on function public.rotate_tiktok_oauth_tokens(jsonb)
  to service_role;
grant execute on function public.disconnect_tiktok_authorization(bigint)
  to service_role;

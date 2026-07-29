create table public.tiktok_creators (
  id bigint generated always as identity primary key,
  username text not null,
  display_name text,
  avatar_url text,
  bio_description text,
  is_verified boolean,
  follower_count bigint,
  following_count bigint,
  likes_count bigint,
  video_count bigint,
  source_provider text not null,
  source_account_id text,
  source_access text not null,
  last_captured_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tiktok_creators_username_format check (
    username = lower(username)
    and username ~ '^[a-z0-9._]{2,24}$'
  ),
  constraint tiktok_creators_username_unique unique (username),
  constraint tiktok_creators_source_provider_check check (
    source_provider = 'tiktok_display_api'
  ),
  constraint tiktok_creators_source_access_check check (
    source_access = 'creator_authorized'
  ),
  constraint tiktok_creators_counts_nonnegative check (
    (follower_count is null or follower_count >= 0)
    and (following_count is null or following_count >= 0)
    and (likes_count is null or likes_count >= 0)
    and (video_count is null or video_count >= 0)
  )
);

create table public.tiktok_creator_snapshots (
  id bigint generated always as identity primary key,
  creator_id bigint not null references public.tiktok_creators(id) on delete cascade,
  captured_at timestamptz not null,
  window_start timestamptz not null,
  window_end timestamptz not null,
  source_provider text not null,
  source_access text not null,
  sample_size integer not null,
  created_at timestamptz not null default now(),
  constraint tiktok_creator_snapshots_window_check check (
    window_end >= window_start
  ),
  constraint tiktok_creator_snapshots_sample_size_check check (
    sample_size between 0 and 100
  ),
  constraint tiktok_creator_snapshots_source_provider_check check (
    source_provider = 'tiktok_display_api'
  ),
  constraint tiktok_creator_snapshots_source_access_check check (
    source_access = 'creator_authorized'
  ),
  constraint tiktok_creator_snapshots_creator_capture_unique unique (
    creator_id,
    captured_at
  )
);

create index tiktok_creator_snapshots_creator_captured_idx
  on public.tiktok_creator_snapshots (creator_id, captured_at desc);

create table public.tiktok_post_snapshots (
  snapshot_id bigint not null references public.tiktok_creator_snapshots(id) on delete cascade,
  tiktok_post_id text not null,
  published_at timestamptz not null,
  description text,
  share_url text,
  view_count bigint not null,
  like_count bigint not null,
  comment_count bigint not null,
  share_count bigint not null,
  created_at timestamptz not null default now(),
  primary key (snapshot_id, tiktok_post_id),
  constraint tiktok_post_snapshots_post_id_check check (
    tiktok_post_id ~ '^[0-9]{1,32}$'
  ),
  constraint tiktok_post_snapshots_counts_nonnegative check (
    view_count >= 0
    and like_count >= 0
    and comment_count >= 0
    and share_count >= 0
  )
);

alter table public.tiktok_creators enable row level security;
alter table public.tiktok_creator_snapshots enable row level security;
alter table public.tiktok_post_snapshots enable row level security;

alter table public.tiktok_creators force row level security;
alter table public.tiktok_creator_snapshots force row level security;
alter table public.tiktok_post_snapshots force row level security;

revoke all on table public.tiktok_creators from public, anon, authenticated;
revoke all on table public.tiktok_creator_snapshots from public, anon, authenticated;
revoke all on table public.tiktok_post_snapshots from public, anon, authenticated;

grant select on table public.tiktok_creators to service_role;
grant select on table public.tiktok_creator_snapshots to service_role;
grant select on table public.tiktok_post_snapshots to service_role;

create or replace function public.store_tiktok_creator_snapshot(payload jsonb)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  creator_pk bigint;
  snapshot_pk bigint;
  post_payload jsonb;
begin
  if payload->>'sourceProvider' <> 'tiktok_display_api'
    or payload->>'sourceAccess' <> 'creator_authorized' then
    raise exception 'Unsupported snapshot source';
  end if;

  insert into public.tiktok_creators (
    username,
    display_name,
    avatar_url,
    bio_description,
    is_verified,
    follower_count,
    following_count,
    likes_count,
    video_count,
    source_provider,
    source_account_id,
    source_access,
    last_captured_at
  )
  values (
    lower(payload->'creator'->>'username'),
    payload->'creator'->>'displayName',
    payload->'creator'->>'avatarUrl',
    payload->'creator'->>'bioDescription',
    (payload->'creator'->>'isVerified')::boolean,
    (payload->'creator'->>'followerCount')::bigint,
    (payload->'creator'->>'followingCount')::bigint,
    (payload->'creator'->>'likesCount')::bigint,
    (payload->'creator'->>'videoCount')::bigint,
    payload->>'sourceProvider',
    payload->'creator'->>'sourceAccountId',
    payload->>'sourceAccess',
    (payload->>'capturedAt')::timestamptz
  )
  on conflict (username) do update set
    display_name = excluded.display_name,
    avatar_url = excluded.avatar_url,
    bio_description = excluded.bio_description,
    is_verified = excluded.is_verified,
    follower_count = excluded.follower_count,
    following_count = excluded.following_count,
    likes_count = excluded.likes_count,
    video_count = excluded.video_count,
    source_provider = excluded.source_provider,
    source_account_id = excluded.source_account_id,
    source_access = excluded.source_access,
    last_captured_at = excluded.last_captured_at,
    updated_at = now()
  returning id into creator_pk;

  insert into public.tiktok_creator_snapshots (
    creator_id,
    captured_at,
    window_start,
    window_end,
    source_provider,
    source_access,
    sample_size
  )
  values (
    creator_pk,
    (payload->>'capturedAt')::timestamptz,
    (payload->>'windowStart')::timestamptz,
    (payload->>'windowEnd')::timestamptz,
    payload->>'sourceProvider',
    payload->>'sourceAccess',
    jsonb_array_length(coalesce(payload->'posts', '[]'::jsonb))
  )
  on conflict (creator_id, captured_at) do update set
    window_start = excluded.window_start,
    window_end = excluded.window_end,
    sample_size = excluded.sample_size
  returning id into snapshot_pk;

  delete from public.tiktok_post_snapshots
  where snapshot_id = snapshot_pk;

  for post_payload in
    select value from jsonb_array_elements(coalesce(payload->'posts', '[]'::jsonb))
  loop
    insert into public.tiktok_post_snapshots (
      snapshot_id,
      tiktok_post_id,
      published_at,
      description,
      share_url,
      view_count,
      like_count,
      comment_count,
      share_count
    )
    values (
      snapshot_pk,
      post_payload->>'id',
      (post_payload->>'publishedAt')::timestamptz,
      post_payload->>'description',
      post_payload->>'shareUrl',
      (post_payload->>'views')::bigint,
      (post_payload->>'likes')::bigint,
      (post_payload->>'comments')::bigint,
      (post_payload->>'shares')::bigint
    );
  end loop;

  return snapshot_pk;
end;
$$;

revoke all on function public.store_tiktok_creator_snapshot(jsonb)
  from public, anon, authenticated;
grant execute on function public.store_tiktok_creator_snapshot(jsonb)
  to service_role;

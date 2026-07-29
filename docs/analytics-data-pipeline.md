# Creator Analytics Data Pipeline

## Status

The storage, provider, OAuth, encrypted token-vault and calculation boundaries are
implemented. Live capture remains disabled until the TikTok developer application,
registered callback, migrations and production credentials are configured.

## Approved product boundary

TokLens supports creator-authorized analytics through TikTok's Display API:

- `user.info.basic` for the authorized identity
- `user.info.profile` for profile fields
- `user.info.stats` for the authorized creator's account totals
- `video.list` for the authorized creator's public videos

The Research API is not a fallback for the commercial product. TikTok restricts
Research Tools to qualifying, approved researchers and eligible research purposes.
Arbitrary public-account analysis must remain unavailable unless a separate,
contractually approved data source is reviewed.

## Pipeline

```text
Creator OAuth consent
        |
        v
TikTok Display API provider
        |
        | validates account identity, dates and non-negative safe counts
        v
CreatorSnapshotService
        |
        +-- capture rate limit: 6 per authorized account / 15 minutes
        +-- Upstash cache: 15 minutes
        |
        v
Supabase transaction function
        |
        +-- tiktok_creators
        +-- tiktok_creator_snapshots
        +-- tiktok_post_snapshots
        |
        v
Pure analytics calculations
        |
        v
Estimated UI + source + sample size + captured time
```

## Data integrity

- Usernames are normalized to lowercase and validated.
- Provider and access values are constrained to `tiktok_display_api` and
  `creator_authorized`.
- Counts must be non-negative.
- Observation windows cannot end before they begin.
- A snapshot stores no more than 100 post rows.
- Duplicate `(creator_id, captured_at)` captures are idempotent.
- Missing source counts are not converted into zero.

## Database security

- All snapshot tables have RLS enabled and forced.
- No direct policies are created for `anon` or `authenticated`.
- Direct table privileges are revoked from public browser roles.
- The transaction function is executable only by `service_role`.
- The service role key is read only in a `server-only` runtime module.
- Foreign keys use cascade cleanup and indexed lookup paths.

Before production, verify privileges with:

```sql
select grantee, table_name, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name like 'tiktok_%'
order by table_name, grantee, privilege_type;
```

## Cache and rate limits

When Upstash is configured, snapshots use a 15-minute distributed cache and capture
requests use a distributed sliding-window limit of six requests per authorized account
per 15 minutes. Local memory implementations exist for development and tests only.

TikTok also enforces endpoint-specific upstream limits. A TikTok HTTP 429 is mapped to
a retryable provider error; the application must not immediately retry in a loop.

## Retention

The migration does not automatically delete analytics history because creator growth
tracking requires explicit product and legal retention decisions. Before enabling live
capture, define:

1. Snapshot retention period.
2. Creator deletion/disconnect behavior.
3. Token and consent retention.
4. Regional privacy request workflow.
5. Scheduled deletion job and audit evidence.

Access tokens must never be stored in these snapshot tables. Production OAuth tokens
require a separate encrypted server-only credential store.

## Production activation checklist

1. Create and review the TikTok developer application.
2. Register the exact static HTTPS callback.
3. Obtain approval for the four required read-only scopes.
4. Apply both Supabase migrations and verify RLS/privileges.
5. Configure Upstash and production environment variables.
6. Test connect, partial-consent, refresh, capture and disconnect flows.
7. Add scheduled cleanup for expired sessions.
8. Run a privacy/security review.
9. Enable the Login Kit entry point only after all checks pass.

# Creator Analytics Content Readiness

Last reviewed: 2026-07-26

## Decision

Do not publish the Cluster C connection, snapshot or metrics articles yet.

The OAuth, encrypted token storage, refresh, revoke and snapshot components exist in
the codebase, but the current workspace has no configured TikTok developer
credentials, Supabase project, Upstash connection or Vercel project. No real
creator-authorized production flow has been verified.

Publishing a connection guide with a `Connect your TikTok account` call to action
would describe an action the current product cannot complete.

## Primary user

The primary user for this cluster is a creator who wants to analyze their own
account with a trustworthy data source.

The creator is not starting with a metric. They are trying to complete a sequence:

1. Decide whether TokLens is trustworthy enough to connect.
2. Understand exactly which TikTok permissions are requested.
3. Complete authorization without sharing a password with TokLens.
4. Confirm which account was connected.
5. Capture a clearly timestamped first snapshot.
6. Understand which values came from TikTok and which TokLens calculated.
7. Disconnect access or request deletion without ambiguity.

If any earlier step is unclear or unavailable, later analytics education should not
send the creator into that flow.

## User question map

| Stage          | User question                             | Required product evidence                        | Current status                               |
| -------------- | ----------------------------------------- | ------------------------------------------------ | -------------------------------------------- |
| Trust          | Will TokLens receive my TikTok password?  | Official redirect and server-side OAuth exchange | Implemented in code; not production-verified |
| Consent        | What permissions am I granting?           | Exact approved scopes and consent screen         | Four scopes defined; approval not verified   |
| Access         | Can TokLens edit or publish content?      | Read-only scope inventory                        | No publishing scope requested                |
| Identity       | Which account did I connect?              | Authorized identity lookup and account match     | Implemented and unit-tested                  |
| Security       | Where are tokens stored?                  | Encrypted server-only vault                      | Implemented; migration not applied here      |
| Freshness      | When was my data captured?                | Manual capture with timestamp and sample window  | Implemented; no real capture verified        |
| Disconnect     | Does disconnect remove TikTok access?     | Upstream revoke plus local token/session cleanup | Implemented; no production verification      |
| Deletion       | Does disconnect delete analytics history? | Documented snapshot deletion workflow            | Not implemented                              |
| Retention      | How long are snapshots kept?              | Approved retention policy and scheduled deletion | Not defined                                  |
| Privacy rights | How do I request access or deletion?      | Operational request workflow                     | Not implemented                              |

## Requested permission inventory

TokLens currently constructs an authorization request for:

| Scope               | Intended use in TokLens                                                              | Not used for                          |
| ------------------- | ------------------------------------------------------------------------------------ | ------------------------------------- |
| `user.info.basic`   | Identify the authorized TikTok account and basic profile                             | Posting, messaging or password access |
| `user.info.profile` | Read authorized profile fields such as username, profile link and bio where returned | Editing the profile                   |
| `user.info.stats`   | Read authorized account totals such as follower, following, likes and video counts   | Audience demographics or revenue      |
| `video.list`        | Read the authorized creator's public videos and supported public video fields        | Drafts, private videos or publishing  |

TikTok requires app approval for additional scopes, and a user may grant only part of
a requested scope set. The current TokLens service rejects partial consent because
its snapshot contract requires all four scopes.

No content-publishing, direct-message or private-insight scope is requested in the
current code.

## Verified implementation boundary

### Implemented in code

- Static HTTPS callback validation.
- Random OAuth state stored in an HttpOnly, SameSite=Lax cookie for 10 minutes.
- Constant-time state comparison.
- Server-side authorization-code exchange.
- Exact required-scope validation.
- Authorized identity lookup.
- Independent AES-256-GCM encryption of access and refresh tokens.
- Opaque 30-day local session; only its SHA-256 hash is stored.
- Token refresh with identity and scope revalidation.
- Same-origin checks for capture and disconnect mutations.
- Manual snapshot capture.
- Maximum 100 post rows per snapshot.
- Snapshot source labels and timestamps.
- Upstream token revoke followed by local token deletion and session revocation.
- Unit tests for the core security and data boundaries.

### Not verified or not implemented

- Approved production TikTok developer application.
- Approved production access to all four scopes.
- Registered production callback.
- Applied and audited Supabase migrations.
- Production encryption-key storage and rotation.
- Distributed production rate limiting.
- A real creator authorization, refresh and snapshot capture.
- Reconnect behavior with an existing authorization record.
- Scheduled cleanup of expired sessions.
- Snapshot retention duration.
- Deletion of historical snapshots when a creator disconnects.
- Creator data-access and deletion-request operations.
- Incident-response and regional privacy review.

## Disconnect is not full deletion

The current disconnect transaction:

1. Revokes the active token with TikTok.
2. Marks the local authorization as disconnected.
3. Deletes encrypted OAuth tokens.
4. Revokes local authorization sessions.
5. Clears the browser session cookie after success.

It does not delete rows in:

- `tiktok_creators`
- `tiktok_creator_snapshots`
- `tiktok_post_snapshots`

Product copy and future content must therefore say `disconnect access` or `remove
local tokens`, not `delete all my data`.

The product must provide a separate deletion workflow before making a complete data
deletion promise.

## Content readiness

| Brief                          | Decision | Reason                                              |
| ------------------------------ | -------- | --------------------------------------------------- |
| 11. Connect TikTok permissions | Blocked  | No production authorization or deletion workflow    |
| 12. First analytics snapshot   | Blocked  | No real authorized snapshot has been verified       |
| 13. Analytics metrics glossary | Hold     | Final production fields and labels may still change |
| 14. Average views              | Hold     | Product CTA depends on a disclosed real sample      |
| 15. Average likes              | Hold     | Product CTA depends on a disclosed real sample      |
| 16+. Snapshot comparisons      | Blocked  | No production history or comparison experience      |

Existing formula and methodology articles can remain public because they explain
calculations without claiming that the connection workflow is live.

## Activation gates

Brief 11 becomes publishable only when:

1. Production TikTok app and all four scopes are approved.
2. The callback and environment are configured.
3. Both migrations are applied and database privileges are audited.
4. Connect, cancel, partial consent, refresh, reconnect and disconnect pass with a
   real owned test account.
5. Snapshot retention is approved and disclosed.
6. Disconnect versus delete behavior is visible before consent.
7. A complete deletion workflow and privacy-request process are operational.
8. The public privacy disclosure matches the production environment.

Brief 12 becomes publishable only after the above gates plus:

1. A consented first snapshot is captured successfully.
2. Raw fields, calculated fields, captured time and sample dates are visible.
3. Missing values remain unavailable rather than becoming zero.
4. The example is owned, consented or clearly synthetic.

## Current UI requirement

When OAuth runtime configuration is absent, the Analytics page must:

- State that account connection is unavailable in the environment.
- Avoid presenting an active connection button.
- State that no TikTok login or permissions are requested.
- Keep formulas and unavailable result states accessible.
- Link to the current privacy disclosure.

This preserves user trust while the production activation gates remain open.

## Primary sources

- TikTok Login Kit overview and Web authorization documentation.
- TikTok scope migration documentation.
- TikTok Display API documentation.
- TikTok OAuth token management and revoke documentation.

These sources define platform capabilities. TokLens implementation and production
verification determine which claims the product may make.

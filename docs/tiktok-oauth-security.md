# TikTok Login Kit and Token Security

## Current status

The web OAuth routes, encrypted token vault, refresh logic, disconnect flow and manual
snapshot capture are implemented. They remain inactive until the TikTok developer app,
redirect URI, Supabase migrations and production environment variables are configured.

## Web authorization flow

```text
GET /api/auth/tiktok/start
        |
        +-- generate 256-bit random state
        +-- store state in HttpOnly SameSite=Lax cookie for 10 minutes
        v
https://www.tiktok.com/v2/auth/authorize/
        |
        v
GET /api/auth/tiktok/callback
        |
        +-- constant-time state comparison
        +-- server-side code exchange
        +-- required-scope verification
        +-- authorized account identity lookup
        +-- AES-256-GCM token encryption
        +-- create opaque 30-day local session
        v
Creator Analytics
```

TikTok's current Web Login Kit uses the confidential-client model: the client secret
stays on the server and a random `state` value protects the redirect flow. TikTok's
documentation describes PKCE for desktop and native public clients, not for Web Login
Kit, so this web flow does not send unsupported PKCE parameters.

## Requested scopes

- `user.info.basic`
- `user.info.profile`
- `user.info.stats`
- `video.list`

If any required scope is missing, the connection is rejected and TokLens attempts to
revoke the newly issued token. Snapshot capture is never enabled for partial consent.

## Token vault

- Access and refresh tokens are encrypted independently using AES-256-GCM.
- Every encrypted value uses a new 96-bit initialization vector.
- Authentication tags detect ciphertext modification.
- The encryption key is supplied through `TIKTOK_TOKEN_ENCRYPTION_KEY`.
- Plaintext tokens are never written to the database, cookies, URLs or logs.
- Database rows record an encryption-key version for future rotation.
- A refreshed response replaces both access and refresh tokens because TikTok may
  rotate the refresh token.

The initial key must be exactly 32 random bytes encoded as base64. A compatible
PowerShell generation command is:

```powershell
$bytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
[Convert]::ToBase64String($bytes)
```

Store the result in the deployment secret manager, never in a committed environment
file.

## Local authorization session

The browser receives a 256-bit random opaque session token in an HttpOnly,
SameSite=Lax cookie. Supabase stores only its SHA-256 hash. Sessions expire after 30
days and are revoked together when a user disconnects.

Mutation routes require a same-origin `Origin` header:

- `POST /api/tiktok-analytics/capture`
- `POST /api/auth/tiktok/disconnect`

## Refresh behavior

Access tokens are refreshed when fewer than five minutes remain. The refresh response
must:

1. Return the same TikTok `open_id`.
2. Preserve every required scope.
3. Contain valid positive expiration values.
4. Use the Bearer token type.

If these checks fail, the new response is not persisted.

## Disconnect behavior

TokLens first asks TikTok to revoke the active access token. Only after successful
upstream revocation does the database transaction:

- mark the authorization disconnected;
- delete local encrypted tokens;
- revoke all local sessions.

If TikTok revocation fails, local credentials are retained so the operation can be
retried rather than falsely reporting a complete disconnect.

## Production checklist

1. Register the exact static HTTPS callback:
   `/api/auth/tiktok/callback`
2. Obtain approval for every requested scope.
3. Apply both Supabase migrations in order.
4. Configure all TikTok and Supabase server secrets.
5. Verify RLS and function privileges.
6. Add a scheduled cleanup for expired/revoked sessions.
7. Configure secret rotation and recovery procedures.
8. Test reconnect, partial consent, expiration and disconnect in TikTok's sandbox.
9. Complete privacy, data-retention and incident-response reviews.

# TokLens Privacy and Data-Handling Review

Reviewed: July 26, 2026

## Purpose

This document records the privacy-relevant behavior verified in the current TokLens
source tree. It is an engineering and product disclosure, not legal advice and not a
substitute for market-specific privacy review.

Claims in public product pages and editorial content must not exceed this evidence.

## Current reviewed behavior

### Public Viewer and profile inputs

- The shared Viewer form sends `q` and an optional `mode` with an HTTP GET request.
- The input therefore appears in the page URL and may appear in browser history,
  copied URLs, hosting request logs, and diagnostic records.
- The Next.js server parses and validates the input in application memory.
- The current Viewer flow does not write the query to Supabase or another application
  database.
- The live public-data connector is unavailable. The current service returns parsed,
  unverified identity data and does not retrieve arbitrary profile content.
- Users must not enter private information, credentials, or non-TikTok personal data.

### Engagement Calculator

- Calculator values are held in React component state.
- The calculation is performed in the browser.
- The current implementation does not send Calculator values to a TokLens API or
  persist them in application storage.
- Reloading the page clears the values unless the browser restores form state.

### Downloader preview

- The preview route receives a TikTok URL and a rights-confirmation boolean in a small
  JSON POST body.
- The route validates same-origin requests, content type, body size, TikTok host and
  path structure.
- The route derives an HMAC rate-limit identifier from the forwarded client IP. The raw
  address is not used as the rate-limit key.
- The local limiter keeps that derived identifier in process memory for a one-minute
  window.
- If Upstash is configured, the derived identifier is used by a one-minute distributed
  sliding-window limiter with Upstash analytics disabled.
- The current preview route returns validated metadata only. It does not fetch or
  deliver media.
- The temporary-media store is implemented with a 15-minute application expiry and
  cleanup, but it is not invoked to store a file by the current preview-only route.

Infrastructure providers can still process request data independently of application
database storage.

### Creator-authorized analytics

- TikTok OAuth routes and encrypted storage adapters are implemented but are not
  production-ready without credentials, migrations, provider approval, deletion jobs,
  and a completed retention review.
- Starting OAuth creates a 10-minute HttpOnly, SameSite=Lax state cookie.
- A completed authorized connection creates a 30-day opaque HttpOnly session cookie.
- The planned database stores a hash of the session token and encrypted OAuth tokens.
- Analytics snapshots and a 15-minute cache are implemented behind optional Supabase
  and Upstash configuration.
- Historical snapshot retention, post-disconnect deletion, privacy-request handling,
  and scheduled cleanup are not yet approved.

Production OAuth and historical analytics storage must remain disabled until those
items are resolved and the public privacy disclosure is updated.

### Analytics and telemetry

- GA4 and PostHog are listed as planned integrations.
- Neither SDK is present in the current runtime dependencies or application layout.
- No TikTok Viewer or Calculator analytics events are emitted by the current source.
- Search Console verification, hosting analytics, firewall logs, CDN logs, and
  deployment-level observability cannot be confirmed from this repository alone.

Any analytics integration requires:

1. A documented purpose and event inventory.
2. Data minimization.
3. Retention and access rules.
4. Consent or opt-out review where applicable.
5. An updated public disclosure before activation.

## Infrastructure request data

An HTTP request necessarily reaches network and hosting infrastructure. Depending on
the deployed provider and configuration, operational records can include:

- IP address or a provider-derived location.
- Request time.
- Requested path and search parameters.
- HTTP method and response status.
- Browser user-agent information.
- Referrer information.
- Firewall, cache, function, or request identifiers.

The repository is designed for Vercel but contains no linked production project
configuration. Exact production provider, log settings, plan, drains, and retention
cannot be verified from this workspace.

The application sets a global `strict-origin-when-cross-origin` Referrer Policy. This
reduces cross-origin referrer detail, but it does not make requests anonymous or remove
the input from the current page URL.

## Cookies

The current public Viewer, blog, profile input validation, Downloader preview, and
Calculator do not intentionally set a TokLens account cookie.

TikTok OAuth uses the two essential security/session cookies described above only when
the user starts or completes the optional connection flow.

Third-party destinations have their own cookie and privacy practices after a user
navigates away from TokLens.

## Retention summary

| Data or state                     | Current application behavior                               |
| --------------------------------- | ---------------------------------------------------------- |
| Viewer query                      | URL request; no application database write                 |
| Calculator values                 | Browser component state only                               |
| Local Downloader limiter key      | Derived HMAC key in memory for a one-minute window         |
| Upstash Downloader limiter key    | Derived HMAC key used for a one-minute sliding window      |
| Downloader media                  | No file stored by the current preview-only route           |
| OAuth state cookie                | 10-minute maximum age                                      |
| Authorized session cookie         | 30-day maximum age                                         |
| Analytics snapshot cache          | 15 minutes when the authorized pipeline is configured      |
| Historical analytics snapshots    | Disabled pending an approved retention and deletion policy |
| Hosting/CDN/firewall request logs | Deployment configuration not verifiable in this workspace  |

## Release blockers

Before enabling production OAuth, historical analytics, GA4, PostHog, or live media
delivery:

1. Verify the production hosting provider and its active log retention.
2. Confirm whether log drains, firewall analytics, or hosting analytics are enabled.
3. Approve snapshot, token, consent, and deletion retention periods.
4. Implement scheduled cleanup and privacy-request workflows.
5. Publish provider and purpose disclosures appropriate to the target markets.
6. Complete privacy and legal review.
7. Update `/privacy` and every relevant product notice.

## Public content rules

Public content must say:

- `No TikTok login` only when no TikTok account connection is needed for that action.
- `No application database storage` only for flows verified above.
- Request and infrastructure logs may still exist.
- Private browsing does not create network anonymity.
- TokLens cannot bypass private accounts or TikTok access controls.

Public content must not say:

- `100% anonymous`.
- `No logs`.
- `Leaves no trace`.
- `Invisible to every website or network`.
- `Private content unlocked`.

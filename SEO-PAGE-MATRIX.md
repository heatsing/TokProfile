# SEO Page Matrix

The application route and content registries are the implementation source of truth. Record manual exceptions here only when a page needs an owner, target intent, quality status, or remediation note that is not represented in code.

## Approved route migration — 2026-11-20

- `/` is the canonical TikTok Video Downloader landing page after explicit owner approval.
- `/tiktok-video-downloader` permanently redirects to `/` so existing links retain value without creating duplicate content.
- The previous Viewer and Creator Analytics homepage remains live and indexable at `/explore`.
- The sitemap lists `/` and `/explore`; it does not list the redirecting legacy downloader URL.

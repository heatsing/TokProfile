# SEO Page Matrix

The application route and content registries are the implementation source of truth. Record manual exceptions here only when a page needs an owner, target intent, quality status, or remediation note that is not represented in code.

## Approved route migration — 2026-11-20

- `/` is the canonical TikTok Video Downloader landing page after explicit owner approval.
- `/tiktok-video-downloader` permanently redirects to `/` so existing links retain value without creating duplicate content.
- The previous Viewer and Creator Analytics homepage remains live and indexable at `/explore`.
- At that release, the sitemap listed `/` and `/explore`; it did not list the
  redirecting legacy downloader URL. The later function-readiness decision below
  supersedes `/explore` indexation.

## Function-readiness indexation decision — 2026-11-20

- `/` now targets the truthful "TikTok video link checker" task because the current
  backend validates URLs but does not return a media file.
- `/tiktok-engagement-rate-calculator`, `/blog`, `/blog/[slug]`, `/help` and
  `/privacy` remain indexable and sitemap-eligible.
- `/explore`, `/viewer`, `/tiktok-profile-viewer` and `/tiktok-analytics` remain live
  but are `noindex` and omitted from the sitemap until their primary results are
  verified end to end.
- `/contact`, `/copyright` and `/terms` are public and crawlable but `noindex` pending,
  respectively, mailbox-delivery verification, notice-workflow verification and
  operator/legal approval.
- `/tiktok-to-mp3`, `/download-tiktok-stories`, `/story-viewer` and `/profile-viewer`
  were not created because the repository has no verified provider for those user
  outcomes. They are absent from navigation and sitemap.
- No existing URL was deleted or redirected as part of this decision.

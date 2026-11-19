# TokProfile Sitewide Function and SEO Audit

Audit date: 2026-11-20

This audit records what the deployed application can truthfully deliver before the
sitewide navigation, support-page and indexation changes described in
`tokprofile-sitewide-seo-handoff.md` are applied.

| Current route                        | Current task                      | Verified implementation                                                                                            | Index/navigation decision                                                                                                       |
| ------------------------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                  | TikTok video downloader           | Validates a full public TikTok video URL and rights confirmation. It does not fetch, store or return a media file. | Keep live and reposition visible/SEO copy as a video link and availability checker. Do not claim that a file can be downloaded. |
| `/tiktok-engagement-rate-calculator` | Engagement calculation            | Calculates a follower-based estimate from user-entered averages and shows the formula and limitations.             | Keep indexable, in sitemap and in public navigation.                                                                            |
| `/tiktok-profile-viewer`             | Public profile lookup             | Validates input only. No production public-profile data connector is available.                                    | Keep URL live, add `noindex`, remove from sitemap and public navigation until real data is returned.                            |
| `/viewer`                            | Public video/story/profile viewer | Detects and validates input only. It does not retrieve current Story, profile or video content.                    | Keep URL live, add `noindex`, remove from sitemap and public navigation.                                                        |
| `/tiktok-analytics`                  | Creator analytics                 | The UI and formulas exist, but production OAuth/provider credentials and a verified snapshot are unavailable.      | Keep URL live, add `noindex`, remove from sitemap and public navigation until the authorized flow is verified.                  |
| `/explore`                           | Tool directory/legacy home        | Advertises several validation-only or unavailable tools.                                                           | Keep URL live for compatibility, add `noindex`, remove from sitemap and public navigation.                                      |
| `/tiktok-video-downloader`           | Legacy downloader URL             | Permanently redirects to `/`.                                                                                      | Keep redirect; do not add to sitemap.                                                                                           |
| `/blog` and `/blog/[slug]`           | Editorial guides                  | Server-rendered editorial content is present.                                                                      | Keep indexable, in sitemap and linked as Guides.                                                                                |
| `/privacy`                           | Privacy disclosure                | Content exists but contains stale TokLens/Vercel references.                                                       | Correct to TokProfile/Cloudflare, keep indexable and in sitemap.                                                                |
| `/help`                              | Product help                      | Missing before this change.                                                                                        | Add factual help for the currently available checker and calculator; index and include in sitemap.                              |
| `/contact`                           | Contact route                     | Missing before this change.                                                                                        | Add mailto-based contact disclosure. Keep `noindex` until mailbox delivery is independently verified.                           |
| `/copyright`                         | Copyright route                   | Missing before this change.                                                                                        | Add a complaint-process page. Keep `noindex` until the inbox workflow is verified.                                              |
| `/terms`                             | Terms route                       | Missing before this change.                                                                                        | Add plain-language service terms. Keep `noindex` pending operator/legal approval.                                               |
| unknown URL                          | Error recovery                    | Default framework 404 only.                                                                                        | Add a branded, crawl-safe custom 404 with working recovery links.                                                               |

## Missing requested product routes

`/tiktok-to-mp3`, `/download-tiktok-stories`, `/story-viewer` and
`/profile-viewer` are not created in this release. They would be non-functional
placeholders because the repository has no verified media or profile provider for
those tasks. They remain absent from navigation and sitemap until end-to-end evidence
exists.

## Release gate

A tool may enter primary navigation and the sitemap only when its result is more than
input validation, its failure states are explicit, and its primary user outcome has
been verified end to end. A successful HTTP response alone is not evidence of a
working download or viewer.

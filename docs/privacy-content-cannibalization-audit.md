# Privacy Content Cannibalization Audit

Last reviewed: 2026-07-26

## Decision

Do not create a separate article for:

`what can people see on a private TikTok account`

Merge that intent into:

`/blog/public-vs-private-tiktok-accounts`

The proposed page and the existing comparison guide would give substantially the
same answer: identity fields can remain discoverable, approved followers control
access to restricted account content, individual post audiences still matter, and
a third-party viewer cannot bypass privacy controls.

Creating both pages would split internal links and make it unclear which URL should
rank for private-account visibility questions.

## User-task analysis

| Query or trigger                                  | User                                                                | Job to complete                                         | Canonical page                                         |
| ------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| `public vs private TikTok account`                | Creator choosing a setting                                          | Compare audience, discovery and reuse tradeoffs         | `/blog/public-vs-private-tiktok-accounts`              |
| `what can people see on a private TikTok account` | Creator auditing exposure or visitor encountering a private profile | Identify visible identity fields and restricted content | `/blog/public-vs-private-tiktok-accounts`              |
| `what information is public on TikTok`            | Creator or researcher auditing a profile field                      | Inventory public, conditional and private information   | `/blog/what-information-is-public-on-tiktok`           |
| `can people see who viewed their TikTok profile`  | Person concerned about visit visibility                             | Understand Profile View History                         | `/blog/can-people-see-who-viewed-their-tiktok-profile` |
| `watch TikTok without account privacy`            | Signed-out visitor                                                  | Understand no-login versus anonymity                    | `/blog/watching-tiktok-without-an-account-privacy`     |

## Overlap assessment

### Proposed private-account article versus public/private comparison

- Same primary entity: TikTok account privacy state.
- Same core facts: identity fields, follower approval, post access, searchability,
  downloads and reuse restrictions.
- Same user action: inspect or change privacy settings.
- Same primary evidence: TikTok public/private account and teen privacy guidance.
- Same safe product boundary: no private-content bypass.

Overlap is high enough that a second page would be a near-duplicate.

### Public-information inventory

The public-information guide remains separate because its task is field-level
classification across public, private, authorized and unavailable data. It should
summarize private-account visibility and link to the comparison guide for the
complete decision and settings workflow.

### Profile View History

Profile View History remains separate because it answers whether a visit may be
associated with an account. Public/private status is only a supporting concept,
not the query's main task.

### No-login privacy

The no-login guide remains separate because it explains request data, browser
history, infrastructure logs and TikTok account identity. It should not become a
general account-privacy guide.

## On-page implementation

The canonical public/private guide should:

1. Answer the private-account visibility question directly near the top.
2. Use the exact question as a descriptive heading, without keyword repetition.
3. Separate non-approved visitors from approved followers.
4. Distinguish account privacy from post, comment, message and view-history
   controls.
5. State that search visibility does not equal access to restricted content.
6. State that a public viewer cannot unlock private posts.
7. Link to the field inventory, Profile View History and no-login privacy guides.

## Internal-link ownership

- Links about choosing public versus private should use the comparison page.
- Links asking what remains visible on a private account should use the same
  comparison page, with descriptive anchor text.
- Links about a particular public profile field should use the public-information
  inventory.
- No page should link to a future private-viewer route or imply that one will
  bypass TikTok access controls.

## Evidence boundary

The merged answer is based on current TikTok Help Center guidance. It must be
reviewed when TikTok changes:

- Public/private account behavior.
- Teen privacy defaults.
- Post audiences.
- Download, Duet, Stitch or reuse controls.
- Search or off-platform visibility language.

Manual signed-out checks may document a specific observation, but they must not be
presented as universal behavior across regions, ages or sessions.

## Future split criteria

Reconsider a separate page only if evidence shows a distinct user task that cannot
be completed by the comparison guide, such as:

- A substantially different settings workflow.
- A new official private-account visibility feature.
- Search Console data showing two stable, non-overlapping intent groups.
- The comparison page becoming too broad to answer both tasks clearly.

Until then, one stronger canonical page is the lower-risk SEO and user experience
choice.

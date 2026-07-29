# TokLens

TokLens is a public TikTok content explorer and creator analytics platform for
English-speaking markets. The product is designed around focused public viewing,
authorized creator analytics, transparent methodology, and privacy-aware utility
tools.

## Technology

- Next.js 15 App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS
- Shadcn UI conventions with Radix primitives
- ESLint 9 with Next.js Core Web Vitals and TypeScript rules
- Prettier with Tailwind class sorting

Planned infrastructure integrations are Supabase PostgreSQL, Upstash Redis,
Cloudflare R2, Vercel, GA4, Google Search Console, and PostHog. They are not
required for the current local application.

The creator snapshot schema and server-side adapters are implemented but remain
inactive until Supabase credentials and a creator-authorized TikTok OAuth flow are
configured.

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer

The project is currently verified with Node.js 24 and npm 11.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   copy .env.example .env.local
   ```

   On macOS or Linux, use `cp .env.example .env.local`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start the local Next.js development server         |
| `npm run build`        | Create an optimized production build               |
| `npm run start`        | Serve the production build                         |
| `npm run test`         | Run the unit test suite once                       |
| `npm run test:watch`   | Run unit tests in watch mode                       |
| `npm run lint`         | Run ESLint with zero warnings allowed              |
| `npm run lint:fix`     | Fix safe ESLint findings                           |
| `npm run format`       | Format supported files with Prettier               |
| `npm run format:check` | Verify formatting without writing                  |
| `npm run typecheck`    | Run the TypeScript compiler without emitting files |
| `npm run check`        | Run formatting, lint, type checks, and unit tests  |

Before merging a change, run:

```bash
npm run check
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local`. Variables prefixed with `NEXT_PUBLIC_` are
included in browser bundles and must never contain secrets.

| Variable                        | Scope  | Required now | Description                      |
| ------------------------------- | ------ | -----------: | -------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Public |          Yes | Canonical application origin     |
| `NEXT_PUBLIC_SUPABASE_URL`      | Public |           No | Supabase project URL             |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public |           No | Supabase anonymous browser key   |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server |           No | Privileged Supabase key          |
| `TIKTOK_CLIENT_KEY`             | Server |           No | TikTok OAuth application key     |
| `TIKTOK_CLIENT_SECRET`          | Server |           No | TikTok OAuth secret              |
| `TIKTOK_REDIRECT_URI`           | Server |           No | Registered static HTTPS callback |
| `TIKTOK_TOKEN_ENCRYPTION_KEY`   | Server |           No | Base64 AES-256 token-vault key   |
| `UPSTASH_REDIS_REST_URL`        | Server |           No | Upstash REST endpoint            |
| `UPSTASH_REDIS_REST_TOKEN`      | Server |           No | Upstash REST token               |
| `R2_ACCOUNT_ID`                 | Server |           No | Cloudflare account identifier    |
| `R2_ACCESS_KEY_ID`              | Server |           No | R2 access key                    |
| `R2_SECRET_ACCESS_KEY`          | Server |           No | R2 secret key                    |
| `R2_BUCKET_NAME`                | Server |           No | R2 storage bucket                |

Public environment values are normalized in `src/config/env.ts`. Server-only
values are accessed lazily through `src/config/server-env.ts`, which is protected
by the Next.js `server-only` boundary.

## Project Structure

```text
src/
├── app/          Routes, layouts, metadata, and server-rendered pages
├── components/   Reusable product and Shadcn-style UI components
├── config/       Typed application, environment, and navigation configuration
├── hooks/        Reusable client-side React hooks
├── lib/          Framework helpers and third-party client construction
├── services/     Typed external-service and transport boundaries
├── types/        Shared TypeScript contracts
├── utils/        Pure, framework-independent utility functions
└── ...
```

Editorial content lives outside the application bundle:

```text
content/
└── blog/         Published and draft Markdown articles
docs/
└── content-plan.md
```

Architecture rules:

- Route-specific code stays close to its route under `app/`.
- Shared visual primitives live in `components/ui/`.
- Client hooks must include the `"use client"` boundary.
- Secret environment variables may only be read from server-only modules.
- External HTTP calls go through `services/`, not directly from presentational
  components.
- TikTok tools register through `services/tiktok/`; routes must use the shared
  parser, validation, error, and result contracts instead of implementing their
  own tool pipelines.
- Downloader preview requests use distributed Upstash rate limiting when the
  Redis environment variables are configured. The local fallback is not a
  substitute for distributed production limits.
- `utils/` contains deterministic helpers without React or Next.js dependencies.
- `lib/` contains framework-aware helpers and integration client factories.

## Blog CMS

Blog posts are Markdown files in `content/blog/`. Every post requires validated
frontmatter for:

- `title` and `description`
- `category`: TikTok Privacy, TikTok Download, TikTok Analytics, or Creator Growth
- non-empty `tags`
- `author.name` and `author.role`
- `publishedAt` and `updatedAt`
- `status`: `draft` or `published`

Only published posts appear in `/blog`, article routes, static parameters, and the
sitemap. Raw HTML is not enabled in Markdown rendering. Content briefs are kept in
`docs/content-plan.md` and are never auto-published.

## UI Conventions

The repository follows Shadcn UI conventions:

- Component source is owned by the project.
- Variants use `class-variance-authority`.
- Class names are merged through `src/lib/utils.ts`.
- Radix primitives provide accessible behavior where appropriate.
- Lucide supplies interface icons.

The design and product specifications are available in:

- [`docs/product-spec.md`](docs/product-spec.md)
- [`docs/seo-strategy.md`](docs/seo-strategy.md)
- [`docs/design-system.md`](docs/design-system.md)
- [`docs/content-plan.md`](docs/content-plan.md)
- [`docs/analytics-data-pipeline.md`](docs/analytics-data-pipeline.md)
- [`docs/tiktok-oauth-security.md`](docs/tiktok-oauth-security.md)

## Creator Snapshot Storage

Apply both migrations through the normal Supabase migration workflow before
configuring live storage:

1. `202607260001_creator_snapshots.sql`
2. `202607260002_tiktok_oauth.sql`

They create creator snapshots, encrypted authorization storage, opaque session
records and transaction functions restricted to the server-side `service_role`.

Creator analytics only reads snapshots produced by a creator-authorized TikTok
Display API provider. It does not use the TikTok Research API as a commercial-product
fallback and does not scrape arbitrary accounts.

## Security

- Never commit `.env` or `.env.local`.
- Never expose service-role, Redis, or R2 credentials through
  `NEXT_PUBLIC_*` variables.
- Validate user-controlled URLs at both UI and server boundaries.
- Treat third-party responses as untrusted.
- Preserve public/private content restrictions.
- Run `npm audit` as part of dependency review.

## Deployment

The application is designed for Vercel. Set all environment variables in the
deployment environment and ensure `NEXT_PUBLIC_SITE_URL` matches the production
origin before releasing.

The production command is:

```bash
npm run build
```

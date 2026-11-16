# posts-users

**Users & Posts** — a searchable people directory with per-person post feeds and a local post composer. The interface is a Deep Plum, Apple-derived design system built with React 19, Vite 8 and strict TypeScript.

## Preview

Open [`design/preview.html`](design/preview.html) directly in a browser. Add `#review` to the URL for the state switcher, or open `#invalid`, `#loading`, `#error`, `#empty`, `#no-results` directly.

## Stack

- React 19 + Vite 8
- TypeScript strict
- Vitest + Testing Library
- ESLint + typescript-eslint
- Cloudflare Pages (static output, SPA fallback)
- Data: [JSONPlaceholder](https://jsonplaceholder.typicode.com)

## Run

```bash
npm install
npm run dev
```

Checks:

```bash
npm run lint
npm run test -- --run
npm run build
```

`npm run test` is watch mode; use `--run` for a single pass.

## Architecture

```text
src/domain           pure entities and validation
src/infrastructure   HTTP repositories and ports
src/application      AsyncState and data hooks
src/presentation     atoms, organisms and CSS Modules
src/App.tsx          composition root + page shell
src/main.tsx         dependency injection of the HTTP repositories
```

The repositories are injected into `App` as props. `useUsers` owns the directory state; `usePosts` owns the per-person feed, aborts on switch and keeps local posts for the session. The search filter is a `useMemo` in `App`.

Local posts use negative IDs and are rendered with the “New” marker. They survive user switching in the current session, not a reload.

## Design

The design system, tokens and component rules live in [`DESIGN.md`](DESIGN.md). The approved static preview is in [`design/preview.html`](design/preview.html).

## CI/CD

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push to `main` and every pull request:

1. `npm ci`
2. `npm run lint`
3. `npm run test -- --run`
4. `npm run build`

On a push to `main`, a second job deploys the built `dist/` directory to Cloudflare Pages after the checks pass.

### Required GitHub secrets

Add these under **Settings → Secrets and variables → Actions**:

| Secret | Purpose |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with **Cloudflare Pages: Edit** permission |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |

Until both secrets exist, the deploy steps are skipped with a warning; the CI checks still run. The Pages project name is `users-posts`, matching [`wrangler.jsonc`](wrangler.jsonc).

### Deployment

The Pages project is created on first deploy, then:

```bash
npm run deploy
```

deploys `dist/` locally through Wrangler. Pages serves the SPA through [`public/_redirects`](public/_redirects) and the cache/security headers in [`public/_headers`](public/_headers).

No accounts, no persistence, no analytics. The product is a demo.

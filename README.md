# YFPP — Your Fucking Polling Place

A static single-page app that helps voters find their fucking polling place. Enter your registered address to get polling locations, early voting sites, drop-off locations, ballot information, and elected representatives.

**Live site:** [yourfuckingpollingplace.com](https://yourfuckingpollingplace.com)

## Prerequisites

- **Node.js** ≥ 22
- **pnpm** ≥ 11
- **1Password CLI** (`op`) — used to inject API keys at runtime

## Setup

```bash
pnpm install
```

Create a `.env.local` file with 1Password secret references:

```dotenv
# Google Civic Information API
VITE_API_KEY=op://vault/item/field
VITE_API_URL=https://www.googleapis.com/civicinfo/v2

# Mapbox
VITE_MAPBOX_API_ACCESS_TOKEN=op://vault/item/field

# Open States API
VITE_OPENSTATES_API_KEY=op://vault/item/field

# Development: point to static test data instead of live APIs
# VITE_API_DEV_VOTER_INFO_URL=test_data/test_data.json
# VITE_API_DEV_REPRESENTATIVES_URL=test_data/test_data_representatives.json
```

## Development

```bash
op run --env-file=".env.local" pnpm dev
```

The `op run` command resolves 1Password secret references in `.env.local` and injects the actual values as environment variables. Vite picks them up automatically.

## Build

```bash
pnpm build
```

Production output goes to `build/`.

## Quality Checks

```bash
pnpm tsc --noEmit    # Type check
pnpm lint            # ESLint (flat config)
pnpm lint:fix        # Auto-fix lint issues
pnpm format:check    # Prettier check
pnpm format          # Auto-format
```

Run lint and format checks before committing.

### Dependency Security

Run before committing (includes production and development dependencies):

```bash
pnpm audit
pnpm audit --audit-level=high    # Focus on high/critical findings
```

Checks are advisory for now; no hook blocks commits. Report high/critical findings.
An audit service or network failure is not a clean result: report it and retry.

Update policy:

1. **Direct dependencies**: patch and minor updates are fine, one package (or related group) at a time, with the full check suite. Majors get their own planned change.
2. **Transitive dependencies**: only move within the ranges their parents declare (update the parent or refresh the lockfile). No `overrides` by default.
3. **Overrides**: last resort, only for high/critical advisories in shipped runtime code when no compatible parent release exists. Comment the reason and removal condition.
4. **Prioritize** runtime dependencies over build/dev tooling.

```bash
pnpm outdated                    # Available updates for direct dependencies
pnpm why form-data               # Trace who pulls in a transitive dependency
pnpm update react-router-dom     # Update within the package.json range
pnpm update vite@^8              # Or set an explicit range within the current major
pnpm update --depth Infinity form-data # Refresh a transitive within its parents' ranges
pnpm update                      # Refresh all dependencies within declared ranges
git diff -- package.json pnpm-lock.yaml   # Check for unexpected jumps
pnpm audit
pnpm test:unit
pnpm tsc --noEmit
pnpm lint
pnpm format:check
op run --env-file=".env.local" -- pnpm build
pnpm test:e2e
```

Avoid `pnpm update --latest` and `pnpm audit --fix`: they cross majors or add overrides.

`pnpm-workspace.yaml` sets `minimumReleaseAge: 1440`, so pnpm won't install versions under one day old.
This limits exposure to compromised releases. To take an urgent fix earlier, add it to
`minimumReleaseAgeExclude` (e.g. `- vite@8.1.6`) and remove the entry afterward.

Report findings that need a major upgrade or an override for separate remediation.
Keep generated audit reports out of commits unless intentionally requested.

## Deploy

Production deploys use GitHub Actions Pages via manual dispatch (`workflow_dispatch`). The workflow runs type checking and linting before building. API keys are injected from GitHub Secrets.

Required repository secrets: `VITE_API_KEY`, `VITE_MAPBOX_API_ACCESS_TOKEN`, `VITE_OPENSTATES_API_KEY`.

## Tech Stack

- **React 19** with functional components and hooks
- **Vite 8** for builds and dev server
- **SCSS** for styling
- **react-router-dom 7** for client-side routing
- **framer-motion 12** for animations
- **date-fns** for date handling
- **Mapbox GL** for maps and directions

## APIs

| API | Purpose |
|-----|---------|
| [Google Civic Information](https://developers.google.com/civic-information) | Election data, polling locations, ballot info |
| [Open States](https://v3.openstates.org/docs) | State legislator data by geographic location |
| [Mapbox](https://www.mapbox.com/) | Address autocomplete, maps, and directions |

All API keys are injected at runtime via 1Password CLI. Since this is a client-side SPA, keys are visible in the browser bundle — restrict them by domain/referrer in their respective dashboards.

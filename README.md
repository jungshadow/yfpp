# YFPP — Your Fucking Polling Place

A static single-page app that helps voters find their fucking polling place. Enter your registered address to get polling locations, early voting sites, drop-off locations, ballot information, and elected representatives.

**Live site:** [yourfuckingpollingplace.com](https://yourfuckingpollingplace.com)

## Prerequisites

- **Node.js** ≥ 22
- **pnpm** ≥ 9
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

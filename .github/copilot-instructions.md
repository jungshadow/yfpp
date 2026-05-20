# YFPP Project Guidelines

## Project Overview

YFPP (Your Fucking Polling Place) is a static SPA hosted on GitHub Pages. It accepts a voter's registered address, queries the Google Civic Information API for upcoming election/polling data and the Open States API for representative data, and displays results with Mapbox directions. The site inserts the word "fucking" into polling place names via the `fucktify()` helper.

## Code Style

- **Language**: TypeScript (strict mode). All new files must be `.ts` or `.tsx`.
- **React**: Functional components only. Hooks for all state and side effects. No class components.
- **State management**: `useReducer` + React Context (existing pattern in `appReducer`). No external state libraries.
- **Imports**: Use path aliases rooted at `src/` (e.g., `import helpers from 'helpers'`).
- **Naming**: PascalCase for components and types, camelCase for functions/variables, UPPER_SNAKE_CASE for constants and action types.
- **CSS**: SCSS modules colocated with components. Do not refactor existing styles unless explicitly requested by the project lead in a documented task or issue.

## Architecture

- `src/types/` — shared TypeScript type definitions (API responses, app state, actions)
- `src/requests/` — API client functions (Google Civic, Open States, Mapbox)
- `src/actions/` — reducer action handlers
- `src/hooks/` — custom React hooks
- `src/components/` — UI components, each in its own directory with colocated styles and tests
- `src/helpers.ts` — utility functions (`fucktify`, `titlecase`, `concatStreetAddress`, etc.)

## Build and Test

- **Package manager**: pnpm (never npm or yarn)
- **Build tool**: Vite
- **Dev server**: `op run --env-file=".env.local" pnpm dev`
- **Build**: `pnpm build`
- **Unit/integration tests**: `pnpm test:unit` (Vitest + React Testing Library)
- **E2E tests**: `pnpm test:e2e` (Playwright)
- **Type check**: `pnpm tsc --noEmit`
- **Lint**: `pnpm lint` (ESLint 9, flat config). Fix auto-fixable issues with `pnpm lint:fix`.
- **Format**: `pnpm format:check` to verify, `pnpm format` to auto-format. Run lint and format checks before committing.

## Conventions

- **Environment variables**: Use `import.meta.env.VITE_*` (Vite convention). Never `process.env`.
- **API keys**: Never commit secrets. Development uses 1Password CLI (`op run --env-file=".env.local"`) to inject secrets at runtime from 1Password references (`op://` URIs). Production builds use GitHub Secrets injected via GitHub Actions. Keys are in the client bundle (static SPA) — they must be restricted by domain/referrer in their respective dashboards.
- **Error handling**: API failures must degrade gracefully. A failed representatives call must not block polling place results. If an API returns invalid data, log the error and display a user-friendly message indicating that some information may be missing. Dispatch granular errors per API call.
- **No legacy libraries in new code**: No jQuery, lodash, moment.js, or prop-types. Use native JS/TS equivalents and TypeScript interfaces.
- **Date handling**: Use `date-fns` instead of moment.js.
- **Testing**: New code must include tests. Place test files alongside source files (`Component.test.tsx`). Use MSW for API mocking.
- **Security**: Validate and sanitize all external data at system boundaries. Follow OWASP Top 10 guidelines. Use `encodeURIComponent` for URL parameters.

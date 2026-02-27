# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Overview

This is a **Turborepo** monorepo managed with **npm workspaces** (npm@11.6.2, Node >=18).

### Apps
- `apps/web` — Next.js 16 app (dev port 3000), uses CSS modules
- `apps/docs` — Next.js 16 app (dev port 3001), uses CSS modules
- `apps/webportal` — Next.js 16 app (dev port 3000 by default); Tailwind CSS v4 + React Aria Components + React Compiler enabled

### Packages
- `packages/uxcomponents` (`@repo/uxcomponents`) — Primary shared component library; built on React Aria Components, styled with Tailwind CSS v4 + tailwind-variants; has Storybook
- `packages/ui` (`@repo/ui`) — Stub/legacy React component library (minimal, no styles)
- `packages/eslint-config` (`@repo/eslint-config`) — Shared ESLint config
- `packages/typescript-config` (`@repo/typescript-config`) — Shared tsconfig bases

## Commands

Run all commands from the repo root unless noted otherwise.

```bash
# Development (all apps concurrently)
npm run dev

# Develop a single app
npx turbo dev --filter=web        # port 3000
npx turbo dev --filter=docs       # port 3001
npx turbo dev --filter=webportal

# Build
npm run build
npx turbo build --filter=web      # single app

# Lint
npm run lint

# Type checking
npm run check-types

# Format
npm run format

# Storybook (run from packages/uxcomponents)
cd packages/uxcomponents
npm run storybook                  # port 6006
npm run build-storybook

# Generate a new React component in uxcomponents
cd packages/uxcomponents
npm run generate:component         # uses turbo gen (plop-based)
```

## Architecture: `@repo/uxcomponents`

All apps import shared UI from `@repo/uxcomponents`. The package re-exports individual component files directly (e.g., `import { Button } from "@repo/uxcomponents/Button"`).

**Component conventions:**
- Each component wraps a corresponding **React Aria Component** (RAC) for accessibility
- Styling is done via **`tailwind-variants`** (`tv()`) for variant composition; `tailwind-merge` resolves class conflicts
- The `focusRing` base style in `src/utils.ts` is extended by most interactive components
- `composeRenderProps` from RAC is used to merge render-prop-based classNames with Tailwind classes
- Components use `'use client'` directives where needed (Next.js)

**Key dependencies in uxcomponents:**
- `react-aria-components` — accessibility primitives
- `tailwind-variants` — variant-based Tailwind class composition
- `lucide-react` — icons

## Turborepo Task Pipeline

Tasks are defined in `turbo.json`. Key behaviors:
- `build` and `check-types` respect dependency order (`^build`, `^check-types`)
- `dev` runs persistently with no caching
- `lint` runs after dependencies lint

## Package Resolution

All apps reference workspace packages with `"*"` version — changes to packages like `@repo/uxcomponents` are immediately reflected in apps without rebuilding (source files exported directly via `"exports": { "./*": "./src/*.tsx" }`).

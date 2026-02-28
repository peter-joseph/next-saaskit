# next-saaskit

A **Turborepo** monorepo for building SaaS applications with shared UI components, managed with **npm workspaces** (npm@11.6.2, Node >=18).

## What's inside?

### Apps

| App | Description | Dev Port |
|-----|-------------|----------|
| `apps/web` | Next.js 16 app with CSS modules | 3000 |
| `apps/docs` | Next.js 16 documentation app with CSS modules | 3001 |
| `apps/webportal` | Next.js 16 app with Tailwind CSS v4 + React Aria Components + React Compiler | 3000 |

### Packages

| Package | Name | Description |
|---------|------|-------------|
| `packages/uxcomponents` | `@repo/uxcomponents` | Primary shared component library built on React Aria Components, styled with Tailwind CSS v4 + tailwind-variants. Includes Storybook and Jest unit tests. |
| `packages/ui` | `@repo/ui` | Stub/legacy React component library (minimal, no styles) |
| `packages/eslint-config` | `@repo/eslint-config` | Shared ESLint configuration |
| `packages/typescript-config` | `@repo/typescript-config` | Shared `tsconfig.json` bases |

### Tooling

- [TypeScript](https://www.typescriptlang.org/) — static type checking
- [ESLint](https://eslint.org/) — code linting
- [Prettier](https://prettier.io) — code formatting
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) — unit testing
- [Storybook](https://storybook.js.org/) — component development and documentation

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 11.6.2

### Install dependencies

```bash
npm install
```

## Commands

Run all commands from the repo root unless noted otherwise.

```bash
# Development (all apps concurrently)
npm run dev

# Develop a single app
npx turbo dev --filter=web        # port 3000
npx turbo dev --filter=docs       # port 3001
npx turbo dev --filter=webportal

# Build all apps
npm run build

# Build a single app
npx turbo build --filter=web

# Lint
npm run lint

# Type checking
npm run check-types

# Format
npm run format
```

### Storybook (from `packages/uxcomponents`)

```bash
cd packages/uxcomponents
npm run storybook        # starts dev server at port 6006
npm run build-storybook  # builds static Storybook output
```

### Testing (from `packages/uxcomponents`)

```bash
cd packages/uxcomponents
npm run test             # run unit tests
npm run test:coverage    # run tests with coverage report
```

### Generate a new component

```bash
cd packages/uxcomponents
npm run generate:component  # interactive plop-based generator
```

## Architecture: `@repo/uxcomponents`

All apps import shared UI from `@repo/uxcomponents`. Components are exported individually (e.g., `import { Button } from "@repo/uxcomponents/Button"`).

**Component conventions:**
- Each component wraps a corresponding **React Aria Component** (RAC) for accessibility
- Styling uses **`tailwind-variants`** (`tv()`) for variant composition; `tailwind-merge` resolves class conflicts
- The `focusRing` base style in `src/utils.ts` is extended by most interactive components
- `composeRenderProps` from RAC merges render-prop-based classNames with Tailwind classes
- Components use `'use client'` directives where needed (Next.js)

**Key dependencies:**
- `react-aria-components` — accessibility primitives
- `tailwind-variants` — variant-based Tailwind class composition
- `lucide-react` — icons

**Available components:**

AlertDialog, Breadcrumbs, Button, Calendar, Checkbox, CheckboxGroup, ColorArea, ColorField, ColorPicker, ColorSlider, ColorSwatch, ColorSwatchPicker, ColorThumb, ColorWheel, ComboBox, CommandPalette, DateField, DatePicker, DateRangePicker, Dialog, Disclosure, DisclosureGroup, DropZone, Field, FieldButton, Form, GridList, Link, ListBox, Menu, Meter, NumberField, Popover, ProgressBar, RadioGroup, RangeCalendar, SearchField, Select, Separator, Slider, Switch, Table, Tabs, TagGroup, TextField, TimeField, Toast, ToggleButton, ToggleButtonGroup, Toolbar, Tooltip, Tree

## Turborepo Task Pipeline

Tasks are defined in `turbo.json`:
- `build` and `check-types` respect dependency order (`^build`, `^check-types`)
- `dev` runs persistently with no caching
- `lint` runs after dependencies lint

## Remote Caching

Turborepo supports [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share build artifacts across machines and CI/CD pipelines.

```bash
npx turbo login   # authenticate with Vercel
npx turbo link    # link to Remote Cache
```

## Useful Links

- [Turborepo Docs](https://turborepo.dev/docs)
- [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [tailwind-variants](https://www.tailwind-variants.org/)
- [Storybook](https://storybook.js.org/docs)

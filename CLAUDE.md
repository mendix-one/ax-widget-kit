# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AX Widget Kit is a monorepo of Mendix Pluggable Widgets for manufacturing/semiconductor operations. It uses npm workspaces with two main parts:

- **`packages/`** — Independent Mendix widget packages, each producing its own `.mpk`
- **`simulation/`** — A standalone React app (Vite) for developing and testing widgets outside Mendix

## Monorepo Structure

```
packages/
  ax-widget-kit/       — AXWidgetKit widget (sample/hello world)
  ax-auth-page/        — AXAuthPage widget (sign in, sign up, reset pass)
simulation/            — Vite React app that imports widgets for preview
```

Each widget package has its own `package.json` (with `widgetName`), `tsconfig.json`, and `src/package.xml`. The `pluggable-widgets-tools` build reads `widgetName` from the package's `package.json` to find the entry file.

## Commands

```bash
# Widget builds (each produces dist/*.mpk in its package dir)
npm run build:widget-kit     # Build AXWidgetKit
npm run build:auth-page      # Build AXAuthPage
npm run build:all            # Build all widgets

# Widget dev servers
npm run dev:widget-kit       # Dev server for AXWidgetKit (port 3000)
npm run dev:auth-page        # Dev server for AXAuthPage (port 3001)

# Simulation app (Vite)
npm run vite                 # Run Vite commands directly
npx vite                     # Start simulation dev server
npx vite build               # Build simulation app

# Code quality
npm run lint                 # ESLint all widget packages
npm run lint:fix             # Auto-fix lint issues
npm run format               # Prettier (all files)
```

No test framework is configured yet.

## Architecture

### Widget Packages (`packages/*/`)

Each widget follows standard Mendix pluggable widget structure:
- `src/WidgetName.xml` — Widget manifest (properties, capabilities)
- `src/WidgetName.tsx` — Container component (bridges Mendix runtime to display components)
- `src/WidgetName.editorConfig.ts` — Studio Pro property panel config
- `src/WidgetName.editorPreview.tsx` — Studio Pro design-mode preview
- `src/components/` — Display components (pure React, no Mendix imports)
- `src/ui/` — CSS styles
- `typings/` — Auto-generated prop types from XML manifest (do not edit manually)

The simulation app uses Vite aliases (`@ax/widget-kit`, `@ax/auth-page`) to import directly from widget packages. These aliases are configured in both `vite.config.ts` and `tsconfig.simulation.json`.

### Simulation App (`simulation/`)

Full React 19 application with MUI v7, built with Vite:

- **State**: MobX stores in `simulation/core/stores/` — `RootStore` composes `UiStore`, `AuthStore`, `NotificationStore`, `AgentStore`. Accessed via React context (`useStore()` hook).
- **Routing**: React Router v7 with lazy-loaded pages. Home page (`/`) renders the Sample Widget preview page.
- **i18n**: i18next with locale files in `simulation/core/i18n/locales/` (en, ja, ko, vi).
- **Theme**: MUI theme with dark/light mode toggle, managed by `UiStore`.
- **Widget Previews**: `Sample Widget` and `Auth Page` pages import widgets from `packages/` and render them with mock Mendix props.

## Code Style

- Prettier: no semicolons, single quotes, 120 char width, trailing commas, 2-space indent
- ESLint extends Mendix pluggable-widgets-tools base config
- TypeScript strict mode enabled for simulation app

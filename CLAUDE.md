# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AX Widget Kit is a monorepo of Mendix Pluggable Widgets for manufacturing/semiconductor operations. It uses npm workspaces with two main parts:

- **`packages/`** — Independent Mendix widget packages, each producing its own `.mpk`
- **`simulation/`** — A standalone React app (Vite) for developing and testing widgets outside Mendix

## Monorepo Structure

```
packages/
  ax-auth-layout/      — AXAuthLayout widget (auth page layout with gradient bg, left text, right content slot)
  ax-signin-form/      — AXSigninForm widget (sign in form: email, password, SSO)
  ax-signup-form/      — AXSignupForm widget (sign up form: name, email, password, SSO)
  ax-resetpsw-form/    — AXResetpswForm widget (reset password form: email, success state)
  ax-setpsw-form/      — AXSetpswForm widget (set new password form: password, confirm)
  ax-shared/           — Shared utilities (classname helpers, types, components)
simulation/            — Vite React app that imports widgets for preview
```

Each widget package has its own `package.json` (with `widgetName`), `tsconfig.json`, and `src/package.xml`. The `pluggable-widgets-tools` build reads `widgetName` from the package's `package.json` to find the entry file.

## Commands

```bash
# Widget builds (each produces dist/*.mpk in its package dir)
npm run build:auth-layout    # Build AXAuthLayout
npm run build:signin-form    # Build AXSigninForm
npm run build:signup-form    # Build AXSignupForm
npm run build:resetpsw-form  # Build AXResetpswForm
npm run build:setpsw-form    # Build AXSetpswForm
npm run build:all            # Build all widgets

# Widget dev servers
npm run dev:auth-layout      # Dev server for AXAuthLayout (port 3002)
npm run dev:signin-form      # Dev server for AXSigninForm (port 3003)
npm run dev:signup-form      # Dev server for AXSignupForm (port 3004)
npm run dev:resetpsw-form    # Dev server for AXResetpswForm (port 3005)
npm run dev:setpsw-form      # Dev server for AXSetpswForm (port 3006)

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
- `src/main/` — Display components (pure React, no Mendix imports)
- `src/styles/` — SCSS styles
- `src/preview/` — Studio Pro editor config and design-mode preview
- `typings/` — Auto-generated prop types from XML manifest (do not edit manually)

The auth form widgets (`ax-signin-form`, `ax-signup-form`, `ax-resetpsw-form`, `ax-setpsw-form`) are designed to be placed inside the `AXAuthLayout` widget's content slot, forming complete auth pages.

The simulation app uses Vite aliases (`@ax/auth-layout`, `@ax/signin-form`, etc.) to import directly from widget packages. These aliases are configured in both `vite.config.ts` and `tsconfig.simulation.json`.

### Simulation App (`simulation/`)

Full React 19 application with MUI v7, built with Vite:

- **State**: MobX stores in `simulation/core/stores/` — `RootStore` composes `UiStore`, `AuthStore`, `NotificationStore`, `AgentStore`. Accessed via React context (`useStore()` hook).
- **Routing**: React Router v7 with lazy-loaded pages. Home page (`/`) renders the Auth Layout preview page.
- **i18n**: i18next with locale files in `simulation/core/i18n/locales/` (en, ja, ko, vi).
- **Theme**: MUI theme with dark/light mode toggle, managed by `UiStore`.
- **Widget Previews**: Pages import widgets from `packages/` and render them with mock Mendix props.

## Code Style

- Prettier: no semicolons, single quotes, 120 char width, trailing commas, 2-space indent
- ESLint extends Mendix pluggable-widgets-tools base config
- TypeScript strict mode enabled for simulation app

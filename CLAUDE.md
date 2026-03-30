# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AXWidgetKit is a Mendix Pluggable Widget for manufacturing/semiconductor operations. The repo has two codebases:

- **`src/`** — The actual Mendix widget (pluggable widget API, shipped as `.mpk`)
- **`simulation/`** — A standalone React app used for development and demo outside Mendix

These share dependencies but have separate TypeScript configs (`tsconfig.json` for the widget, `tsconfig.simulation.json` for the simulation app).

## Commands

```bash
npm run dev          # Start Mendix widget dev server (pluggable-widgets-tools)
npm run build        # Build widget → dist/1.0.0/*.mpk
npm run lint         # ESLint via pluggable-widgets-tools
npm run lint:fix     # Auto-fix lint issues
npm run format       # Prettier (all JS/TS/JSON/CSS/SCSS/XML files)
npm run vite         # Run Vite directly (for simulation app)
npm start            # Start Mendix development server
```

No test framework is configured yet.

## Architecture

### Widget (`src/`)

Standard Mendix pluggable widget structure:
- `AXWidgetKit.xml` — Widget manifest (properties, capabilities). Declares `needsEntityContext="true"`, `offlineCapable="true"`, web-only.
- `AXWidgetKit.tsx` — Widget entry point, receives Mendix props
- `AXWidgetKit.editorConfig.ts` — Studio/Studio Pro editor preview
- `typings/AXWidgetKitProps.d.ts` — Auto-generated prop types from the XML manifest (do not edit manually)

### Simulation App (`simulation/`)

Full React 19 application with MUI v7, built with Vite:

- **State**: MobX stores in `simulation/core/stores/` — `RootStore` composes `UiStore`, `AuthStore`, `NotificationStore`, `AgentStore`. Accessed via React context (`useStore()` hook).
- **Routing**: React Router v7 with lazy-loaded pages. Auth routes behind `GuestGuard`, app routes behind `AuthGuard`.
- **i18n**: i18next with locale files in `simulation/core/i18n/locales/` (en, ja, ko, vi).
- **Theme**: MUI theme with dark/light mode toggle, managed by `UiStore`.
- **Pages**: Dashboard, Yield Analysis, Defects, Lots, Technology Roadmap, Roadmap, About.
- **Agent Panel**: AI chat interface (`simulation/agent/`) with conversation persistence via localStorage.

## Code Style

- Prettier: no semicolons, single quotes, 120 char width, trailing commas, 2-space indent
- ESLint extends Mendix pluggable-widgets-tools base config
- TypeScript strict mode enabled for simulation app

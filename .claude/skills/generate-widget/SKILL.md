---
name: generate-widget
description: Generate a complete Mendix pluggable widget package with MUI components, MobX store, event bus, preview, simulation page, icons, and usage docs. Follows the AX Widget Kit architecture.
argument-hint: <package-name> <description>
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent
---

# Generate AX Widget Package

Create a complete, production-ready Mendix pluggable widget package following the AX Widget Kit architecture.

## Input

`$ARGUMENTS` should contain: `<package-name> <short description>`

Example: `ax-data-table A data table widget with sorting and pagination`

Parse `$ARGUMENTS`:
- **Package name**: First token (kebab-case, must start with `ax-`)
- **Description**: Remaining tokens
- **Widget name**: Convert to PascalCase with AX prefix (e.g., `ax-data-table` → `AXDataTable`)

## Architecture Reference

Read `CLAUDE.md` at the project root for full architecture details. Each widget follows a **two-layer pattern**:

### Layer 1 — Container (`src/AXWidgetName.tsx`)
- Creates MobX store via `useState(() => new WidgetStore())`
- Syncs Mendix props to store via `useEffect` hooks
- Uses `executeAction()` from `@ax/shared` for safe action execution
- Wraps with: `<ErrorBoundary>` → `<div className/style>` → `<AxThemeProvider>` → `<WidgetProvider>` → `<DisplayComponent />`
- Subscribes to event bus via `useWidgetEvents({ widgetName: props.name, onEvent, isLayout? })`

### Layer 2 — Display (`src/main/Component.tsx`)
- `observer()` wrapped MobX-reactive component
- Reads all state from store via `useWidgetStore()` hook
- Uses MUI components (Box, Typography, TextField, Button, etc.)
- Shows `Skeleton` when `store.loading` is true
- Shows `store.validation` via MUI error states

## Files to Generate

For package name `{pkg}` and widget name `{Name}`:

### 1. `packages/{pkg}/package.json`
```json
{
  "name": "@ax/{pkg}",
  "widgetName": "{Name}",
  "version": "1.0.0",
  "description": "{description}",
  "copyright": "Mendix One",
  "author": "Danniel Ng",
  "license": "Apache-2.0",
  "packagePath": "one.mendix",
  "config": {
    "projectPath": "../../tests/testProject",
    "mendixHost": "http://localhost:8080",
    "developmentPort": {next available port starting from 3030}
  },
  "scripts": {
    "start": "pluggable-widgets-tools start:server",
    "dev": "pluggable-widgets-tools start:web",
    "build": "pluggable-widgets-tools build:web",
    "lint": "pluggable-widgets-tools lint",
    "lint:fix": "pluggable-widgets-tools lint:fix",
    "release": "pluggable-widgets-tools release:web"
  },
  "devDependencies": {
    "@mendix/pluggable-widgets-tools": "^11.8.1"
  },
  "dependencies": {
    "@ax/shared": "*",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/material": "^7.3.7",
    "@mui/icons-material": "^7.3.7"
  }
}
```

### 2. `packages/{pkg}/tsconfig.json`
```json
{
  "extends": "@mendix/pluggable-widgets-tools/configs/tsconfig.base",
  "compilerOptions": { "baseUrl": "./" },
  "include": ["./src", "./typings"]
}
```

### 3. `packages/{pkg}/src/{Name}.xml`
Mendix widget manifest with:
- `id="one.mendix.axwidgetkit.{Name}"`
- `pluginWidget="true" needsEntityContext="false" offlineCapable="true" supportedPlatform="Web"`
- Properties appropriate for the widget's purpose
- System properties: Name, TabIndex, Visibility (+ Editability for form widgets)
- Use proper property types: `attribute`, `textTemplate`, `enumeration`, `boolean`, `integer`, `action`, `widgets`, `object` (for lists)

### 4. `packages/{pkg}/typings/{Name}Props.d.ts`
Auto-generated types matching the XML:
- `{Name}ContainerProps` interface with Mendix types (EditableValue, DynamicValue, ActionValue, ReactNode)
- `{Name}PreviewProps` interface with string/boolean types for Studio Pro

### 5. `packages/{pkg}/src/main/store.ts`
MobX store class with `makeAutoObservable(this)`:
- Observable fields matching widget properties
- `validation: string | undefined` and `loading: boolean` for form widgets
- `sync*()` methods for Mendix prop sync (no callback trigger)
- `set*()` methods for user interaction (trigger callbacks)
- Computed values where appropriate
- Action callbacks typed as optional functions

### 6. `packages/{pkg}/src/main/context.ts`
```ts
import { createWidgetContext } from '@ax/shared'
import { type {Store}Store } from './store'
export const { Provider: {Store}Provider, useStore: use{Store}Store } = createWidgetContext<{Store}Store>('{Store}')
```

### 7. `packages/{pkg}/src/main/{Component}.tsx`
MUI display component:
- `observer()` wrapped
- Reads from store via `use{Store}Store()`
- Uses MUI components (import from `@mui/material/*`)
- Shows `Skeleton` when `store.loading` is true
- Shows validation via MUI `error` prop or Typography
- Proper ARIA attributes (`role`, `aria-*`)

### 8. `packages/{pkg}/src/{Name}.tsx`
Container component:
- Import `ErrorBoundary`, `executeAction`, `isLoading`, `AxThemeProvider`, `useWidgetEvents`, `type AxEvent` from `@ax/shared`
- Create store, sync all Mendix props via useEffect
- Sync validation: `store.setValidation(props.attr?.validation)`
- Sync loading: `store.setLoading(isLoading(props.attr))`
- Use `executeAction(props.action)` for callbacks
- Return structure: `<ErrorBoundary><div className={props.class} style={props.style}><AxThemeProvider><Provider><Component /></Provider></AxThemeProvider></div></ErrorBoundary>`

### 9. `packages/{pkg}/src/preview/{Component}Preview.tsx`
Pure HTML + CSS preview for Studio Pro (no MUI):
- Visual representation of the widget
- Use PreviewProps to configure appearance
- CSS class prefix: `.ax-preview-{short-name}`

### 10. `packages/{pkg}/src/styles/{Name}Preview.scss`
SCSS with CSS variables for Atlas UI theming:
- Use `var(--ax-color-primary, #3F51B5)` pattern
- Include design token comment header

### 11. `packages/{pkg}/src/{Name}.editorPreview.tsx`
```tsx
import { type ReactElement } from 'react'
import { type {Name}PreviewProps } from '../typings/{Name}Props'
import { {Component}Preview } from './preview/{Component}Preview'

export function preview(props: {Name}PreviewProps): ReactElement {
  return <{Component}Preview ...props />
}

export function getPreviewCss(): string {
  return require('./styles/{Name}Preview.scss')
}
```

### 12. `packages/{pkg}/src/{Name}.editorConfig.ts`
```ts
import { type {Name}PreviewProps } from '../typings/{Name}Props'
export type Properties = PropertyGroup[]
export type PropertyGroup = { caption: string; propertyGroups?: PropertyGroup[]; properties?: Property[] }
export type Property = { key: string; caption: string; description?: string }
export function getProperties(_values: {Name}PreviewProps, defaultProperties: Properties): Properties {
  return defaultProperties
}
```

## After File Generation

### 13. Update Monorepo Config
- **`package.json`** (root): Add `dev:{pkg}` and `build:{pkg}` scripts
- **`vite.config.ts`**: Add `'@ax/{pkg}': resolve(__dirname, 'packages/{pkg}')` alias
- **`tsconfig.simulation.json`**: Add `"@ax/{pkg}/*": ["./packages/{pkg}/*"]` path

### 14. Generate Icons
Run: `node scripts/generate-icons.mjs` after adding the widget to the icons array in that script.
Pick an appropriate Material Symbol icon name from https://fonts.google.com/icons

### 15. Create Simulation Page
Create `simulation/pages/{pkg}/{PageName}Page.tsx`:
- Import the widget from `@ax/{pkg}/src/{Name}`
- Create mock props with `mockDynamic()` and `mockAction`
- Render the widget with realistic sample data

Add route to `simulation/core/router/index.ts`:
```ts
{
  path: '{pkg}',
  lazy: async () => {
    const module = await import('../../pages/{pkg}/{PageName}Page')
    return { Component: module.default }
  },
},
```

### 16. Create Documentation
Create `docs/{pkg}.md` with:
- Widget name and description
- Properties table (General + Events)
- Variants/options documentation
- Usage in Mendix Studio Pro
- Event bus topics (broadcast + private)
- JavaScript action examples
- Theme tokens info (if layout widget)

### 17. Install Dependencies
Run: `npm install`

### 18. Verify Build
Run: `npx vite build` — must pass with no errors.

## Code Style

- No semicolons
- Single quotes
- Trailing commas
- 2-space indent
- 120 char line width
- Import order: react → @mui → mobx → @ax/shared → relative

## Best Practices Checklist

- [ ] System properties (Name, TabIndex, Visibility, Editability) in XML
- [ ] ErrorBoundary wrapping in container
- [ ] `props.class` and `props.style` forwarded to root element
- [ ] `executeAction()` for all Mendix actions (no raw canExecute)
- [ ] `isLoading()` check for loading skeleton
- [ ] `validation` display for form widgets
- [ ] ARIA attributes on interactive elements
- [ ] CSS variables (`--ax-*`) in preview SCSS
- [ ] Event bus subscription via `useWidgetEvents`
- [ ] Keyboard navigation support
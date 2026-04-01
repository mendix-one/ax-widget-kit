# AXAuth Layout

> Authentication layout with gradient background, left branding panel, and right content area

## Properties

### General

#### Content

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| content | Widgets (slot) | No | -- | Widgets to display in the right panel (e.g. sign-in form) |

#### Branding

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| tagline | Text template | No | -- | Heading text displayed on the left panel |
| brandDescription | Text template | No | -- | Description text below the tagline |

#### Theme

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| themeTokens | String | No | `""` | JSON string with MUI theme overrides (palette, typography, shape, etc.) |

#### Background

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| showBackground | Boolean | No | `true` | Display the animated SVG background |

## Usage in Mendix

Place the **AXAuth Layout** widget as the root widget on authentication pages (sign in, sign up, reset password, set password). It renders a two-panel layout: a left branding panel with tagline/description over an animated gradient background, and a right panel where you drop the appropriate auth form widget.

1. Drag `AXAuth Layout` onto your auth page.
2. Set **Tagline** and **Description** text for the branding panel.
3. Drop one of the auth form widgets (`AXSignin Form`, `AXSignup Form`, `AXResetpsw Form`, or `AXSetpsw Form`) into the **Form content** slot.
4. Optionally provide **Theme tokens (JSON)** to customize the visual appearance.

This is a **layout widget** -- it initializes the global AX event bus (`window.__AX_EVENT_BUS__`) that all child AX widgets use for inter-widget communication.

## Store

The internal `AuthLayoutStore` (MobX) manages the following state:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| tagline | string \| undefined | `undefined` | Heading text from Mendix prop |
| description | string \| undefined | `undefined` | Description text from Mendix prop |
| showBackground | boolean | `true` | Whether the animated background is displayed |

## Event Bus

### Listening (widget receives)

Events this widget handles on its private topic (`ax:{widgetName}`):

| Event Type | Payload | Description |
|------------|---------|-------------|
| `toggleBackground` | -- | Toggles the animated SVG background on/off |

The widget also listens on `ax:broadcast` for any broadcast events.

### Emitting

This widget does not emit events itself, but as a layout widget it **initializes** the global event bus that all child AX widgets connect to.

## Example

### Studio Pro Configuration

1. Create a page using the **AXAuth Layout** widget as the outermost container.
2. Set **Tagline** to something like `"Welcome to AX Platform"`.
3. Set **Description** to `"Manufacturing operations, simplified."`.
4. Drop an `AXSignin Form` widget into the **Form content** slot.
5. Optionally adjust **Show animated background** and **Theme tokens**.

### JavaScript Action

```js
// Toggle the animated background on/off
window.__AX_EVENT_BUS__.emit('ax:AXAuthLayout1', { type: 'toggleBackground' })
```

## Theme Tokens

Example JSON for the `themeTokens` property:

```json
{
  "palette": {
    "primary": { "main": "#3F51B5" },
    "secondary": { "main": "#FF4081" },
    "background": { "default": "#0D1B2A" }
  },
  "typography": {
    "fontFamily": "'Inter', sans-serif",
    "h4": { "fontWeight": 700 }
  },
  "shape": {
    "borderRadius": 12
  }
}
```

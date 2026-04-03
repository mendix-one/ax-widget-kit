# AXLogo

> Logo display widget with image source and alt text

## Properties

### General

#### Logo

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| logoUrl | Text template | No | -- | URL or path to the logo image |
| altText | Text template | No | -- | Alternative text for the logo image |
| height | Integer | No | `24` | Logo image height in pixels |

### Events

| Property | Type | Description |
|----------|------|-------------|
| onClick | Action | Action when logo is clicked |

## Usage in Mendix

The **AXLogo** widget renders a logo image, typically placed inside the **Logo** slot of the **AXWeb App** layout widget. It supports dynamic URLs via text templates, configurable height, and an optional click action (commonly used to navigate to the home page).

1. Drag `AXLogo` into the **Logo** slot of your `AXWeb App` layout widget.
2. Set **Logo URL** to the path or URL of your logo image (e.g. a static resource URL or a dynamic expression).
3. Set **Alt text** for accessibility (e.g. `"Company Logo"`).
4. Adjust **Height (px)** as needed (default is 24px).
5. Optionally configure **On click** to navigate to your home page.

This widget does not require an entity context (`needsEntityContext="false"`).

## Store

The internal `LogoStore` (MobX) manages the following state:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| src | string \| undefined | `undefined` | Logo image URL |
| alt | string \| undefined | `undefined` | Alt text for the image |
| height | number | `24` | Image height in pixels |
| onClick | function \| undefined | `undefined` | Click handler callback |

## Event Bus

### Listening (widget receives)

The widget subscribes to both `ax:broadcast` and its private topic (`ax:{widgetName}`, e.g. `ax:AXLogo1`). The current event handler is a placeholder ready for custom event handling.

| Event Action | Payload | Description |
|------------|---------|-------------|
| *(custom)* | *(custom)* | Extend the handler in the container to react to custom events |

### Emitting

This widget does not emit events to the bus. It communicates back to Mendix through the configured **onClick** action property.

## Example

### Studio Pro Configuration

1. Place the **AXLogo** widget inside the **Logo** slot of `AXWeb App`.
2. Set **Logo URL** to `'/img/company-logo.svg'` or a dynamic expression.
3. Set **Alt text** to `'My Company'`.
4. Set **Height (px)** to `32`.
5. Set **On click** to a "Show page" action for the home page.

### JavaScript Action

```js
// Send a custom event to a specific logo instance
window.__AX_EVENT_BUS__.emit('ax:AXLogo1', { action: 'refresh', payload: {} })

// Broadcast an event to all widgets (including this one)
window.__AX_EVENT_BUS__.emit('ax:broadcast', { action: 'theme-changed', payload: { mode: 'dark' } })
```

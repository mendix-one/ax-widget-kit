# AXText Field

> Text field with MUI styling and password visibility toggle

## Properties

### General

#### Data

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| Value | `attribute<String>` | -- | No | Attribute to bind the text field value |

#### Label & Placeholder

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| Label | `textTemplate` | -- | No | Field label text |
| Placeholder | `textTemplate` | -- | No | Placeholder text when empty |
| Helper text | `textTemplate` | -- | No | Helper text displayed below the field |

#### Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Variant | `enumeration` | `outlined` | Visual variant of the text field. Options: `outlined`, `filled`, `standard` |
| Size | `enumeration` | `small` | Size of the text field. Options: `small`, `medium` |
| Full width | `boolean` | `true` | Whether the field takes full container width |

#### Input

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Input type | `enumeration` | `text` | HTML input type. Options: `text`, `email`, `password`, `number`, `tel`, `url` |
| Multiline | `boolean` | `false` | Enable multiline text area mode |
| Rows | `integer` | `1` | Minimum number of rows for multiline |
| Max rows | `integer` | `4` | Maximum number of rows for multiline |
| Required | `boolean` | `false` | Whether the field is required |

### Events

| Property | Type | Description |
|----------|------|-------------|
| On change | `action` | Action to execute when the value changes. Triggered on blur (when the user leaves the field). |

## Variants / Options

**Variant styles:**
- **Outlined** (default) -- The field has a visible border around it. Best for forms where fields need clear visual separation.
- **Filled** -- The field has a light background fill with an underline. Gives a more subtle, modern appearance.
- **Standard** -- The field has only a bottom underline. Most minimal style, suitable for inline editing.

**Input types:**
- **Text** -- Standard single-line text input.
- **Email** -- Optimized for email entry with appropriate mobile keyboard.
- **Password** -- Obscures input with dots. Includes a visibility toggle icon button (eye icon) that lets users reveal/hide the password.
- **Number** -- Numeric input with up/down arrows on desktop.
- **Tel** -- Telephone number input with numeric keyboard on mobile.
- **URL** -- URL input with appropriate mobile keyboard.

**Multiline mode:**
When enabled, the field renders as a textarea that auto-grows from the configured `Rows` minimum up to `Max rows`, then scrolls.

**Read-only behavior:**
When the bound attribute is read-only in Mendix, the field renders as disabled (grayed out, not editable).

**Error display:**
The store supports an `error` property. When set, the helper text area displays the error message in red and the field border turns red.

## Usage in Mendix

1. Place the **AXText Field** widget inside a data view (the widget requires entity context).
2. Bind the **Value** property to a `String` attribute on the entity.
3. Optionally set **Label**, **Placeholder**, and **Helper text** using text templates (supports translatable strings).
4. Choose the desired **Variant** (`outlined`, `filled`, or `standard`) and **Size** (`small` or `medium`).
5. For password fields, set **Input type** to `password` -- the visibility toggle icon appears automatically.
6. For multiline text areas, enable **Multiline** and configure **Rows** / **Max rows**.
7. Attach an **On change** action (e.g., a nanoflow or microflow) to react when the user finishes editing the field (on blur).

## Event Bus

Each AXText Field instance subscribes to the AX event bus on two topics:

### Listening

| Topic | Event Action | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives all broadcast events from other widgets or nanoflows |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives events targeted at this specific widget instance |

The event handler is currently a placeholder (`_event: AxEvent`) -- extend it to handle custom event actions such as `reset`, `set-error`, or `focus`.

## Example

### Studio Pro Configuration

1. Drag **AXText Field** onto a page inside a data view.
2. In the Properties pane:
   - **Value**: Select the `Name` attribute (type String).
   - **Label**: Enter `Full Name`.
   - **Placeholder**: Enter `Enter your full name`.
   - **Variant**: `outlined`
   - **Size**: `small`
   - **Input type**: `text`
   - **Full width**: `true`
3. Under **Events**, set **On change** to a nanoflow `ACT_ValidateName`.

### JavaScript Action

Send an event to a specific text field instance via the global event bus:

```js
// Reset a text field from a JavaScript action
window.__AX_EVENT_BUS__.emit('ax:AXTextField1', {
  type: 'reset',
})

// Send an event to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', {
  type: 'theme-changed',
  payload: { mode: 'dark' },
})
```

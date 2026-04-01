# AXButton Group

> Button group with MUI styling for grouping related buttons

## Properties

### General

#### Content

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| Content | `widgets` | -- | No | Slot for button widgets. Place AXButton or other widgets inside this slot. |

#### Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Variant | `enumeration` | `outlined` | Visual variant of the button group. Options: `contained`, `outlined`, `text` |
| Color | `enumeration` | `primary` | Color theme of the button group. Options: `primary`, `secondary`, `success`, `warning`, `error`, `info` |
| Size | `enumeration` | `medium` | Size of the buttons in the group. Options: `small`, `medium`, `large` |
| Orientation | `enumeration` | `horizontal` | Layout orientation of the button group. Options: `horizontal`, `vertical` |
| Disabled | `boolean` | `false` | Whether the button group is disabled |
| Full width | `boolean` | `false` | Whether the button group takes full container width |

### Events

This widget has no events. Button click actions are handled by the individual button widgets placed inside the content slot.

## Variants / Options

**Variant styles:**
- **Contained** -- All buttons in the group have solid colored backgrounds. Adjacent buttons share borders.
- **Outlined** (default) -- Buttons have transparent backgrounds with a shared border outline. Adjacent borders are merged.
- **Text** -- Buttons have no background or visible border, appearing as a row of text links.

**Orientation:**
- **Horizontal** (default) -- Buttons are laid out side by side in a row.
- **Vertical** -- Buttons are stacked in a column.

**Color and size** are applied uniformly to all child buttons within the group by the MUI `ButtonGroup` component.

## Usage in Mendix

1. Place the **AXButton Group** widget inside a data view (the widget requires entity context).
2. Drop one or more **AXButton** widgets (or other button-type widgets) into the **Content** slot.
3. Choose the **Variant** to control how the grouped buttons are styled.
4. Select a shared **Color** and **Size** for the group.
5. Use **Orientation** to toggle between horizontal and vertical layouts.
6. Set **Disabled** to `true` to disable all buttons in the group at once.
7. Individual button actions are configured on each AXButton widget placed in the content slot.

**Note:** The `ButtonGroup` component applies its variant, color, and size to the child buttons. If child AXButton widgets have their own variant/color/size set, the group-level settings take visual precedence through MUI's `ButtonGroup` cascading behavior.

## Event Bus

Each AXButton Group instance subscribes to the AX event bus on two topics:

### Listening

| Topic | Event Type | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives all broadcast events from other widgets or nanoflows |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives events targeted at this specific widget instance |

The event handler is currently a placeholder -- extend it to handle custom event types such as `disable-all` or `highlight`.

## Example

### Studio Pro Configuration

1. Drag **AXButton Group** onto a page inside a data view.
2. In the Properties pane:
   - **Variant**: `outlined`
   - **Color**: `primary`
   - **Size**: `medium`
   - **Orientation**: `horizontal`
3. Inside the **Content** slot, add three **AXButton** widgets:
   - Button 1: Label = `Left`, On click = nanoflow `ACT_Left`
   - Button 2: Label = `Center`, On click = nanoflow `ACT_Center`
   - Button 3: Label = `Right`, On click = nanoflow `ACT_Right`

### JavaScript Action

Send an event to a specific button group instance via the global event bus:

```js
// Target a specific button group
window.__AX_EVENT_BUS__.emit('ax:AXButtonGroup1', {
  type: 'disable-all',
})

// Broadcast to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', {
  type: 'form-reset',
})
```

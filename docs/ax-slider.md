# AXSlider

> Slider input widget with MUI Slider

## Properties

### General

#### Data

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| Value | `attribute<Decimal>` | -- | No | Attribute to bind the slider value |
| Label | `textTemplate` | -- | No | Label displayed above the slider |

#### Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Min | `integer` | `0` | Minimum value |
| Max | `integer` | `100` | Maximum value |
| Step | `integer` | `1` | Step increment between allowed values |
| Disabled | `boolean` | `false` | Disable the slider |
| Show marks | `boolean` | `false` | Display step marks on the slider track |

#### Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Color | `enumeration` | `primary` | Slider color theme. Options: `primary`, `secondary` |
| Size | `enumeration` | `medium` | Slider size. Options: `small`, `medium` |
| Value label display | `enumeration` | `auto` | When to display the value label tooltip. Options: `auto`, `on`, `off` |

### Events

| Property | Type | Description |
|----------|------|-------------|
| On change | `action` | Action to execute when the slider value changes. Fires as the user drags the slider thumb. |

## Variants / Options

**Color options:**
- **Primary** (default) -- Uses the theme's primary color for the track and thumb.
- **Secondary** -- Uses the theme's secondary color.

**Size options:**
- **Small** -- Thinner track and smaller thumb, suitable for dense layouts.
- **Medium** (default) -- Standard slider dimensions.

**Value label display:**
- **Auto** (default) -- The value tooltip appears when the user hovers or drags the slider thumb.
- **On** -- The value tooltip is always visible above the thumb.
- **Off** -- The value tooltip is never shown.

**Marks:**
When **Show marks** is enabled, tick marks appear at each step position along the track. This is most useful when the step increment is large enough for the marks to be visually distinct (e.g., step = 10 with min = 0 and max = 100).

**Rendering details:**
- The slider is wrapped in a full-width `Box`.
- If a **Label** is provided, it renders as a `Typography` element (variant `body2`, color `text.secondary`) above the slider with bottom margin.
- The value is bound to a `Decimal` attribute in Mendix. The container converts between Mendix's `Big` decimal type and JavaScript `number`.

## Usage in Mendix

1. Place the **AXSlider** widget inside a data view (the widget requires entity context).
2. Bind the **Value** property to a `Decimal` attribute on the entity.
3. Set **Min**, **Max**, and **Step** to define the slider's range and granularity.
4. Optionally set a **Label** to describe what the slider controls (e.g., `Volume`, `Threshold`).
5. Choose **Color** and **Size** to match the design.
6. Configure **Value label display** to control the tooltip visibility.
7. Enable **Show marks** to display tick marks at each step.
8. Attach an **On change** action to react as the user adjusts the slider.

**Two-way binding:** As the user drags the slider, the bound Decimal attribute is updated continuously. The on-change action fires on each value change during the drag.

## Event Bus

Each AXSlider instance subscribes to the AX event bus on two topics:

### Listening

| Topic | Event Type | Payload | Description |
|-------|------------|---------|-------------|
| `ax:broadcast` | *(any)* | *(varies)* | Receives all broadcast events from other widgets or nanoflows |
| `ax:{widgetName}` | *(any)* | *(varies)* | Receives events targeted at this specific widget instance |

The event handler is currently a placeholder -- extend it to handle custom event types such as `reset` or `set-value`.

## Example

### Studio Pro Configuration

1. Drag **AXSlider** onto a page inside a data view.
2. In the Properties pane:
   - **Value**: Select the `Temperature` attribute (type Decimal).
   - **Label**: Enter `Temperature (C)`.
   - **Min**: `0`
   - **Max**: `200`
   - **Step**: `5`
   - **Show marks**: `true`
   - **Color**: `primary`
   - **Size**: `medium`
   - **Value label display**: `auto`
3. Under **Events**, set **On change** to a nanoflow `ACT_TemperatureChanged`.

### JavaScript Action

Send an event to a specific slider instance via the global event bus:

```js
// Target a specific slider widget
window.__AX_EVENT_BUS__.emit('ax:AXSlider1', {
  type: 'set-value',
  payload: { value: 50 },
})

// Broadcast to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', {
  type: 'form-reset',
})
```

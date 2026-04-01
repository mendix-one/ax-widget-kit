# AXSetpsw Form

> Set new password form with password and confirmation fields

## Properties

### General

#### Form data

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| passwordAttr | Attribute (String) | No | -- | Attribute to bind the new password field |

### Events

| Property | Type | Description |
|----------|------|-------------|
| onSubmit | Action | Action to execute when the form is submitted |
| onNavigateSignIn | Action | Action when user clicks Back to Sign In |

## Usage in Mendix

Place the **AXSetpsw Form** widget inside the content slot of an **AXAuth Layout** widget. It requires an entity context with a String attribute for the new password. This form is typically shown after the user clicks a reset-password link from their email.

1. Create an entity (e.g. `SetPasswordData`) with a `Password` string attribute.
2. Wrap your page content in a Data View using this entity.
3. Drop `AXSetpsw Form` into the **AXAuth Layout** content slot.
4. Bind **Password** to the entity attribute.
5. Configure **On submit** to call your set-password microflow/nanoflow.
6. Configure **On navigate to Sign In** to navigate back to the sign-in page.

The form includes both a "New Password" and a "Confirm Password" field. The confirmation field is validated client-side only and is not bound to a Mendix attribute.

After successful submission, the form transitions to a success state.

**Note:** This widget sets `needsEntityContext="true"`, so it must be placed inside a Data View.

## Store

The internal `SetPasswordFormStore` (MobX) manages the following state:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| password | string | `''` | Current new password input value |
| confirmPassword | string | `''` | Confirm password input value (client-side only, not bound to Mendix) |
| showPassword | boolean | `false` | Whether the password is visible (toggle) |
| error | string | `''` | Validation error message |
| loading | boolean | `false` | Whether the form is in a loading/submitting state |
| success | boolean | `false` | Whether the password was successfully set (triggers success view) |
| readOnly | boolean | `false` | Whether the form is in read-only mode |

Client-side validation:
- Both password and confirmPassword must be non-empty. If not, `error` is set to `"Both fields are required."`.
- Password and confirmPassword must match. If not, `error` is set to `"Passwords do not match."`.

After a successful submit, `success` is set to `true` and the form displays a success confirmation view.

## Event Bus

### Listening (widget receives)

The widget subscribes to both `ax:broadcast` and its private topic (`ax:{widgetName}`, e.g. `ax:AXSetpswForm1`). The current event handler is a placeholder ready for custom event handling.

| Event Type | Payload | Description |
|------------|---------|-------------|
| *(custom)* | *(custom)* | Extend the handler in the container to react to custom events |

### Emitting

This widget does not emit events to the bus. It communicates back to Mendix through the configured action properties (`onSubmit`, `onNavigateSignIn`).

## Example

### Studio Pro Configuration

1. Create a page with **AXAuth Layout** as the layout widget.
2. Inside the layout's **Form content** slot, add a Data View bound to a `SetPasswordData` entity.
3. Place the **AXSetpsw Form** inside the Data View.
4. Map `Password` -> **passwordAttr**.
5. Set **On submit** to a nanoflow that calls your set-password microflow.
6. Set **On navigate to Sign In** to a "Show page" action pointing to your sign-in page.

### JavaScript Action

```js
// Send a custom event to a specific set-password form instance
window.__AX_EVENT_BUS__.emit('ax:AXSetpswForm1', { type: 'reset', payload: {} })

// Broadcast an event to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', { type: 'theme-changed', payload: { mode: 'dark' } })
```

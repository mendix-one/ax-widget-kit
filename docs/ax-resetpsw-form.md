# AXResetpsw Form

> Reset password form with email input and success state

## Properties

### General

#### Form data

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| emailAttr | Attribute (String) | No | -- | Attribute to bind the email field |

### Events

| Property | Type | Description |
|----------|------|-------------|
| onSubmit | Action | Action to execute when the form is submitted |
| onNavigateSignIn | Action | Action when user clicks Back to Sign In |

## Usage in Mendix

Place the **AXResetpsw Form** widget inside the content slot of an **AXAuth Layout** widget. It requires an entity context with a String attribute for the email address.

1. Create an entity (e.g. `ResetPasswordData`) with an `Email` string attribute.
2. Wrap your page content in a Data View using this entity.
3. Drop `AXResetpsw Form` into the **AXAuth Layout** content slot.
4. Bind **Email** to the entity attribute.
5. Configure **On submit** to call your password-reset microflow/nanoflow (e.g. send a reset email).
6. Configure **On navigate to Sign In** to navigate back to the sign-in page.

After successful submission, the form transitions to a "sent" success state indicating the reset email has been dispatched.

**Note:** This widget sets `needsEntityContext="true"`, so it must be placed inside a Data View.

## Store

The internal `ResetPassFormStore` (MobX) manages the following state:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| email | string | `''` | Current email input value |
| error | string | `''` | Validation error message |
| loading | boolean | `false` | Whether the form is in a loading/submitting state |
| sent | boolean | `false` | Whether the reset email has been successfully sent (triggers success view) |
| readOnly | boolean | `false` | Whether the form is in read-only mode |

Client-side validation: the email field must be non-empty before `onSubmit` is invoked. If validation fails, `error` is set to `"Email is required."`.

After a successful submit, `sent` is set to `true` and the form displays a success confirmation view.

## Event Bus

### Listening (widget receives)

The widget subscribes to both `ax:broadcast` and its private topic (`ax:{widgetName}`, e.g. `ax:AXResetpswForm1`). The current event handler is a placeholder ready for custom event handling.

| Event Type | Payload | Description |
|------------|---------|-------------|
| *(custom)* | *(custom)* | Extend the handler in the container to react to custom events |

### Emitting

This widget does not emit events to the bus. It communicates back to Mendix through the configured action properties (`onSubmit`, `onNavigateSignIn`).

## Example

### Studio Pro Configuration

1. Create a page with **AXAuth Layout** as the layout widget.
2. Inside the layout's **Form content** slot, add a Data View bound to a `ResetPasswordData` entity.
3. Place the **AXResetpsw Form** inside the Data View.
4. Map `Email` -> **emailAttr**.
5. Set **On submit** to a nanoflow that sends a password-reset email.
6. Set **On navigate to Sign In** to a "Show page" action pointing to your sign-in page.

### JavaScript Action

```js
// Send a custom event to a specific reset password form instance
window.__AX_EVENT_BUS__.emit('ax:AXResetpswForm1', { type: 'reset', payload: {} })

// Broadcast an event to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', { type: 'theme-changed', payload: { mode: 'dark' } })
```

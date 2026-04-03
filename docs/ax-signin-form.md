# AXSignin Form

> Sign in form with email, password, and SSO options

## Properties

### General

#### Form data

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| emailAttr | Attribute (String) | No | -- | Attribute to bind the email field |
| passwordAttr | Attribute (String) | No | -- | Attribute to bind the password field |

#### SSO

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| showSSO | Boolean | No | `true` | Show Google and Microsoft SSO buttons |

### Events

| Property | Type | Description |
|----------|------|-------------|
| onSubmit | Action | Action to execute when the form is submitted |
| onNavigateSignUp | Action | Action when user clicks the Sign Up link |
| onNavigateResetPass | Action | Action when user clicks Forgot Password |
| onGoogleSSO | Action | Action when user clicks the Google SSO button |
| onMicrosoftSSO | Action | Action when user clicks the Microsoft SSO button |

## Usage in Mendix

Place the **AXSignin Form** widget inside the content slot of an **AXAuth Layout** widget. It requires an entity context with String attributes for email and password.

1. Create an entity (e.g. `AuthCredentials`) with `Email` and `Password` string attributes.
2. Wrap your page content in a Data View using this entity.
3. Drop `AXSignin Form` into the **AXAuth Layout** content slot.
4. Bind **Email** and **Password** to the respective entity attributes.
5. Configure **On submit** to call your authentication microflow/nanoflow.
6. Configure **On navigate to Sign Up** and **On navigate to Reset Password** to navigate to the appropriate pages.
7. Optionally configure **On Google SSO** and **On Microsoft SSO** for single sign-on flows.

**Note:** This widget sets `needsEntityContext="true"`, so it must be placed inside a Data View.

## Store

The internal `SignInFormStore` (MobX) manages the following state:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| email | string | `''` | Current email input value |
| password | string | `''` | Current password input value |
| showPassword | boolean | `false` | Whether the password is visible (toggle) |
| showSSO | boolean | `true` | Whether SSO buttons are displayed |
| readOnly | boolean | `false` | Whether the form is in read-only mode |
| error | string | `''` | Validation error message |
| loading | boolean | `false` | Whether the form is in a loading/submitting state |

Client-side validation: both email and password must be non-empty before `onSubmit` is invoked. If validation fails, `error` is set to `"Email and password are required."`.

## Event Bus

### Listening (widget receives)

The widget subscribes to both `ax:broadcast` and its private topic (`ax:{widgetName}`, e.g. `ax:AXSigninForm1`). The current event handler is a placeholder ready for custom event handling.

| Event Action | Payload | Description |
|------------|---------|-------------|
| *(custom)* | *(custom)* | Extend the handler in the container to react to custom events |

### Emitting

This widget does not emit events to the bus. It communicates back to Mendix through the configured action properties (`onSubmit`, `onNavigateSignUp`, etc.).

## Example

### Studio Pro Configuration

1. Create a page with **AXAuth Layout** as the layout widget.
2. Inside the layout's **Form content** slot, add a Data View bound to an `AuthCredentials` entity.
3. Place the **AXSignin Form** inside the Data View.
4. Map `Email` -> **emailAttr**, `Password` -> **passwordAttr**.
5. Set **On submit** to a nanoflow that calls your login microflow.
6. Set **On navigate to Sign Up** to a "Show page" action pointing to your sign-up page.

### JavaScript Action

```js
// Send a custom event to a specific sign-in form instance
window.__AX_EVENT_BUS__.emit('ax:AXSigninForm1', { action: 'reset', payload: {} })

// Broadcast an event to all widgets (including this form)
window.__AX_EVENT_BUS__.emit('ax:broadcast', { action: 'theme-changed', payload: { mode: 'dark' } })
```

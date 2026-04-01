# AXSignup Form

> Sign up form with full name, email, password, and SSO options

## Properties

### General

#### Form data

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| fullNameAttr | Attribute (String) | No | -- | Attribute to bind the full name field |
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
| onNavigateSignIn | Action | Action when user clicks the Sign In link |
| onGoogleSSO | Action | Action when user clicks the Google SSO button |
| onMicrosoftSSO | Action | Action when user clicks the Microsoft SSO button |

## Usage in Mendix

Place the **AXSignup Form** widget inside the content slot of an **AXAuth Layout** widget. It requires an entity context with String attributes for full name, email, and password.

1. Create an entity (e.g. `RegistrationData`) with `FullName`, `Email`, and `Password` string attributes.
2. Wrap your page content in a Data View using this entity.
3. Drop `AXSignup Form` into the **AXAuth Layout** content slot.
4. Bind **Full name**, **Email**, and **Password** to the respective entity attributes.
5. Configure **On submit** to call your registration microflow/nanoflow.
6. Configure **On navigate to Sign In** to navigate back to the sign-in page.
7. Optionally configure **On Google SSO** and **On Microsoft SSO** for single sign-on flows.

**Note:** This widget sets `needsEntityContext="true"`, so it must be placed inside a Data View.

## Store

The internal `SignUpFormStore` (MobX) manages the following state:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| fullName | string | `''` | Current full name input value |
| email | string | `''` | Current email input value |
| password | string | `''` | Current password input value |
| confirmPassword | string | `''` | Confirm password input value (client-side only, not bound to Mendix) |
| showPassword | boolean | `false` | Whether the password is visible (toggle) |
| showSSO | boolean | `true` | Whether SSO buttons are displayed |
| readOnly | boolean | `false` | Whether the form is in read-only mode |
| error | string | `''` | Validation error message |
| loading | boolean | `false` | Whether the form is in a loading/submitting state |

Client-side validation:
- All fields (fullName, email, password, confirmPassword) must be non-empty. If not, `error` is set to `"All fields are required."`.
- Password and confirmPassword must match. If not, `error` is set to `"Passwords do not match."`.

## Event Bus

### Listening (widget receives)

The widget subscribes to both `ax:broadcast` and its private topic (`ax:{widgetName}`, e.g. `ax:AXSignupForm1`). The current event handler is a placeholder ready for custom event handling.

| Event Type | Payload | Description |
|------------|---------|-------------|
| *(custom)* | *(custom)* | Extend the handler in the container to react to custom events |

### Emitting

This widget does not emit events to the bus. It communicates back to Mendix through the configured action properties (`onSubmit`, `onNavigateSignIn`, etc.).

## Example

### Studio Pro Configuration

1. Create a page with **AXAuth Layout** as the layout widget.
2. Inside the layout's **Form content** slot, add a Data View bound to a `RegistrationData` entity.
3. Place the **AXSignup Form** inside the Data View.
4. Map `FullName` -> **fullNameAttr**, `Email` -> **emailAttr**, `Password` -> **passwordAttr**.
5. Set **On submit** to a nanoflow that calls your registration microflow.
6. Set **On navigate to Sign In** to a "Show page" action pointing to your sign-in page.

### JavaScript Action

```js
// Send a custom event to a specific sign-up form instance
window.__AX_EVENT_BUS__.emit('ax:AXSignupForm1', { type: 'reset', payload: {} })

// Broadcast an event to all widgets
window.__AX_EVENT_BUS__.emit('ax:broadcast', { type: 'theme-changed', payload: { mode: 'dark' } })
```

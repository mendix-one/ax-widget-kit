/**
 * AX_IsEventBusReady
 *
 * Check if the AX event bus has been initialized by a layout widget.
 * Useful as a guard before emitting events.
 *
 * @returns {boolean} - true if the event bus exists on window
 *
 * Usage in Mendix:
 *   Call from a nanoflow to check readiness before emitting:
 *     if AX_IsEventBusReady() then AX_BroadcastEvent(...)
 */
// BEGIN USER CODE
// eslint-disable-next-line no-unused-vars
function AX_IsEventBusReady() {
  return !!window.__AX_EVENT_BUS__
}
// END USER CODE

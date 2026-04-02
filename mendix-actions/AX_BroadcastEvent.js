/**
 * AX_BroadcastEvent
 *
 * Emit an event to ALL AX widgets on the page via the shared event bus.
 * Widgets listen on the 'ax:broadcast' topic.
 *
 * @param {string} eventType - Event action name (e.g. 'theme-changed', 'refresh', 'reset')
 * @param {string} [payloadJson] - Optional JSON string payload (parsed by receiving widgets)
 * @returns {boolean} - true if the event was emitted, false if the event bus is not initialized
 *
 * Usage in Mendix:
 *   Call this JavaScript action from a nanoflow with:
 *     eventType: 'theme-changed'
 *     payloadJson: '{"mode":"dark"}'
 */
// BEGIN USER CODE
// eslint-disable-next-line no-unused-vars
function AX_BroadcastEvent(eventType, payloadJson) {
  if (!eventType) {
    console.warn('[AX] AX_BroadcastEvent: eventType is required')
    return false
  }

  var bus = window.__AX_EVENT_BUS__
  if (!bus) {
    console.warn('[AX] AX_BroadcastEvent: Event bus not initialized. Ensure an AX layout widget is on the page.')
    return false
  }

  var payload = undefined
  if (payloadJson) {
    try {
      payload = JSON.parse(payloadJson)
    } catch (e) {
      console.warn('[AX] AX_BroadcastEvent: Invalid JSON payload:', payloadJson)
      return false
    }
  }

  bus.emit('ax:broadcast', { action: eventType, payload: payload })
  return true
}
// END USER CODE

/**
 * AX_EmitToWidget
 *
 * Emit an event to a SPECIFIC AX widget instance via its private topic.
 * The widget listens on 'ax:{widgetName}' where widgetName is the Name
 * property set in Studio Pro (e.g. 'AXSigninForm1', 'AXAgentChat1').
 *
 * @param {string} widgetName - Target widget instance name (e.g. 'AXSigninForm1')
 * @param {string} eventType - Event action type (e.g. 'reset', 'open', 'navigate')
 * @param {string} [payloadJson] - Optional JSON string payload
 * @returns {boolean} - true if the event was emitted, false if bus not initialized or invalid params
 *
 * Usage in Mendix:
 *   Call this JavaScript action from a nanoflow with:
 *     widgetName: 'AXAgentChat1'
 *     eventType: 'open'
 *     payloadJson: ''
 */
// BEGIN USER CODE
// eslint-disable-next-line no-unused-vars
function AX_EmitToWidget(widgetName, eventType, payloadJson) {
  if (!widgetName || !eventType) {
    console.warn('[AX] AX_EmitToWidget: widgetName and eventType are required')
    return false
  }

  var bus = window.__AX_EVENT_BUS__
  if (!bus) {
    console.warn('[AX] AX_EmitToWidget: Event bus not initialized. Ensure an AX layout widget is on the page.')
    return false
  }

  var payload = undefined
  if (payloadJson) {
    try {
      payload = JSON.parse(payloadJson)
    } catch (e) {
      console.warn('[AX] AX_EmitToWidget: Invalid JSON payload:', payloadJson)
      return false
    }
  }

  bus.emit('ax:' + widgetName, { type: eventType, payload: payload })
  return true
}
// END USER CODE

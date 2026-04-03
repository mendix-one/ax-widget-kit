/**
 * AX_EmitAndWait
 *
 * Emit an event to a widget and wait for a response event.
 * Implements a request/response pattern over the event bus.
 *
 * Convention: the widget should respond on the same topic with eventType + ':response'
 * (e.g. emit 'getData' → widget responds with 'getData:response')
 *
 * @param {string} widgetName - Target widget name (e.g. 'AXAgentChat1')
 * @param {string} eventType - Request event type (e.g. 'getData', 'validate')
 * @param {string} [payloadJson] - Optional JSON request payload
 * @param {number} [timeoutMs] - Timeout in ms (default: 5000)
 * @returns {Promise<string>} - Response payload JSON string, or '' on timeout
 *
 * Usage in Mendix:
 *   result = AX_EmitAndWait('AXSigninForm1', 'validate', '', 3000)
 *   // result contains the validation response payload as JSON
 */
// BEGIN USER CODE
// eslint-disable-next-line no-unused-vars
function AX_EmitAndWait(widgetName, eventType, payloadJson, timeoutMs) {
  if (!widgetName || !eventType) {
    console.warn('[AX] AX_EmitAndWait: widgetName and eventType are required')
    return Promise.resolve('')
  }

  var bus = window.__AX_EVENT_BUS__
  if (!bus) {
    console.warn('[AX] AX_EmitAndWait: Event bus not initialized.')
    return Promise.resolve('')
  }

  var topic = 'ax:' + widgetName
  var responseType = eventType + ':response'
  var timeout = typeof timeoutMs === 'number' && timeoutMs > 0 ? timeoutMs : 5000

  var payload = undefined
  if (payloadJson) {
    try {
      payload = JSON.parse(payloadJson)
    } catch (e) {
      console.warn('[AX] AX_EmitAndWait: Invalid JSON payload:', payloadJson)
      return Promise.resolve('')
    }
  }

  return new Promise(function (resolve) {
    var timer = setTimeout(function () {
      bus.removeListener(topic, handler)
      resolve('')
    }, timeout)

    function handler(event) {
      if (event && event.action === responseType) {
        clearTimeout(timer)
        bus.removeListener(topic, handler)
        resolve(event.payload ? JSON.stringify(event.payload) : '{}')
      }
    }

    bus.on(topic, handler)
    bus.emit(topic, { action: eventType, payload: payload })
  })
}
// END USER CODE

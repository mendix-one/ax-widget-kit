/**
 * AX_ListenForEvent
 *
 * Register a one-time listener on the AX event bus.
 * Useful for waiting for a widget response or completion signal.
 *
 * @param {string} topic - Topic to listen on ('ax:broadcast' or 'ax:{widgetName}')
 * @param {string} eventType - Event type to wait for (e.g. 'submit-complete', 'ready')
 * @param {number} [timeoutMs] - Optional timeout in ms (default: 10000). Returns false on timeout.
 * @returns {Promise<string>} - Resolves with the payload JSON string, or '{}' if no payload
 *
 * Usage in Mendix:
 *   Call from a nanoflow (returns a promise — Mendix handles async automatically):
 *     topic: 'ax:AXSigninForm1'
 *     eventType: 'submit-complete'
 *     timeoutMs: 5000
 */
// BEGIN USER CODE
// eslint-disable-next-line no-unused-vars
function AX_ListenForEvent(topic, eventType, timeoutMs) {
  if (!topic || !eventType) {
    console.warn('[AX] AX_ListenForEvent: topic and eventType are required')
    return Promise.resolve('')
  }

  var bus = window.__AX_EVENT_BUS__
  if (!bus) {
    console.warn('[AX] AX_ListenForEvent: Event bus not initialized.')
    return Promise.resolve('')
  }

  var timeout = typeof timeoutMs === 'number' && timeoutMs > 0 ? timeoutMs : 10000

  return new Promise(function (resolve) {
    var timer = setTimeout(function () {
      bus.removeListener(topic, handler)
      resolve('')
    }, timeout)

    function handler(event) {
      if (event && event.action === eventType) {
        clearTimeout(timer)
        bus.removeListener(topic, handler)
        resolve(event.payload ? JSON.stringify(event.payload) : '{}')
      }
    }

    bus.on(topic, handler)
  })
}
// END USER CODE

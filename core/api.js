/* =============================================================
   DINET — LOYAL FRIENDS 2
   core/api.js
   Compatible con Google Apps Script
============================================================= */

const _apiQueue    = [];
let   _apiRetrying = false;


async function sendToBackend(payload, label = "payload") {

  if (API_CONFIG.MOCK_MODE) {
    console.log(`[API MOCK] ${label}:`, payload);
    return;
  }

  try {

    const response = await fetch(API_CONFIG.ENDPOINT, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Google Apps Script puede devolver texto o JSON
    let result;
    try {
      result = await response.json();
    } catch {
      result = await response.text();
    }

    console.log(`[API OK] ${label}:`, result);

  } catch (err) {

    console.warn(`[API ERROR] ${label} — guardando en cola:`, err.message);

    if (API_CONFIG.NON_BLOCKING) {
      _apiQueue.push({ payload, label, retries: 0 });
      _retryQueue();
    }
  }
}



async function _retryQueue() {

  if (_apiRetrying || _apiQueue.length === 0) return;
  _apiRetrying = true;

  while (_apiQueue.length > 0) {

    const item = _apiQueue[0];
    item.retries++;

    try {

      const response = await fetch(API_CONFIG.ENDPOINT, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(item.payload)
      });

      if (!response.ok) throw new Error("Retry failed");

      _apiQueue.shift();
      console.log(`[API RETRY OK] ${item.label}`);

    } catch {

      if (item.retries >= 3) {
        console.error(`[API RETRY FAILED] ${item.label} descartado`);
        _apiQueue.shift();
      }

      break;
    }

    await new Promise(r => setTimeout(r, 3000));
  }

  _apiRetrying = false;
}



function sendAnswerToBackend(answerEvent) {

  if (API_CONFIG.SEND_STRATEGY !== "per_answer") return;

  const payload = buildAnswerPayload(answerEvent);

  sendToBackend(payload, `answer:${answerEvent.questionId}`);
}



function sendRunToBackend(run) {

  if (API_CONFIG.SEND_STRATEGY !== "per_run") return;

  const payload = buildRunPayload(run);

  sendToBackend(payload, `run:${run.runId}`);
}



function sendSessionToBackend(session) {

  if (API_CONFIG.SEND_STRATEGY !== "per_session") return;

  sendToBackend(session, `session:${session.sessionId}`);
}

/* =============================================================
   DINET — LOYAL FRIENDS 2
   core/api.js

   Capa de comunicación con el backend.
   Completamente desacoplada del juego.
   El juego NUNCA espera al backend para continuar.

   Para activar el backend real:
     → Editar core/config.js únicamente.
============================================================= */


// ── Cola offline ────────────────────────────────────────────
// Si el backend falla, los payloads se guardan aquí
// y se reenvían automáticamente hasta 3 veces.

const _apiQueue    = [];
let   _apiRetrying = false;


// ── Función central de envío ────────────────────────────────

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

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = await response.json();
    console.log(`[API OK] ${label}:`, result);

  } catch (err) {
    console.warn(`[API ERROR] ${label} — guardando en cola:`, err.message);

    if (API_CONFIG.NON_BLOCKING) {
      _apiQueue.push({ payload, label, retries: 0 });
      _retryQueue();
    }
  }
}


// ── Cola de reintentos ──────────────────────────────────────
// Corre en background. Máximo 3 intentos por item.
// Espera 3 segundos entre intentos.

async function _retryQueue() {
  if (_apiRetrying || _apiQueue.length === 0) return;
  _apiRetrying = true;

  while (_apiQueue.length > 0) {
    const item = _apiQueue[0];
    item.retries++;

    try {
      await fetch(API_CONFIG.ENDPOINT, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(item.payload)
      });
      _apiQueue.shift();
      console.log(`[API RETRY OK] ${item.label} reenviado`);

    } catch {
      if (item.retries >= 3) {
        console.error(`[API RETRY FAILED] ${item.label} descartado tras 3 intentos`);
        _apiQueue.shift();
      }
      break;
    }

    await new Promise(r => setTimeout(r, 3000));
  }

  _apiRetrying = false;
}


// ── Funciones públicas por estrategia ──────────────────────

// Llamada después de cada respuesta (per_answer)
function sendAnswerToBackend(answerEvent) {
  if (API_CONFIG.SEND_STRATEGY !== "per_answer") return;
  const payload = buildAnswerPayload(answerEvent);
  sendToBackend(payload, `answer:${answerEvent.questionId}`);
}

// Llamada al finalizar una aventura (per_run)
function sendRunToBackend(run) {
  if (API_CONFIG.SEND_STRATEGY === "per_run") {
    const payload = buildRunPayload(run);
    sendToBackend(payload, `run:${run.runId}`);
  }
  console.log("[RUN COMPLETO]", run);
}

// Llamada al cerrar la sesión (per_session)
function sendSessionToBackend(session) {
  if (API_CONFIG.SEND_STRATEGY === "per_session") {
    sendToBackend(session, `session:${session.sessionId}`);
  }
}

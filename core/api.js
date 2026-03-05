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
//
// IMPORTANTE — por qué usamos text/plain:
// fetch() con Content-Type: application/json dispara un preflight OPTIONS
// que Google bloquea antes de llegar a Apps Script → el POST nunca llega.
// Con text/plain no hay preflight → el POST llega directo al doPost().
// Apps Script lee e.postData.contents de la misma manera en ambos casos.

async function sendToBackend(payload, label = "payload") {
  if (API_CONFIG.MOCK_MODE) {
    console.log(`[API MOCK] ${label}:`, payload);
    return;
  }

  try {
    const response = await fetch(API_CONFIG.ENDPOINT, {
      method:  "POST",
      headers: { "Content-Type": "text/plain" },   // ← evita preflight CORS
      body:    JSON.stringify(payload)               // ← el JSON va igual en el body
    });

    // Apps Script siempre devuelve 200 aunque haya error interno
    // Leer el body para detectar errores reales
    const result = await response.json();

    if (result.status === "error") {
      throw new Error(`Apps Script error: ${result.message}`);
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
        headers: { "Content-Type": "text/plain" },   // ← mismo fix que sendToBackend
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


// ── Funciones públicas ──────────────────────────────────────

// Answers: solo si la estrategia es "per_answer"
function sendAnswerToBackend(answerEvent) {
  if (API_CONFIG.SEND_STRATEGY !== "per_answer") return;
  const payload = buildAnswerPayload(answerEvent);
  sendToBackend(payload, `answer:${answerEvent.questionId}`);
}

// Run: SIEMPRE se envía al finalizar una aventura
function sendRunToBackend(run) {
  const payload = buildRunPayload(run);
  sendToBackend(payload, `run:${run.runId}`);
  console.log("[RUN COMPLETO]", run);
}

// Session: SIEMPRE se envía al cerrar la sesión
function sendSessionToBackend(session) {
  const payload = buildSessionPayload(session);
  sendToBackend(payload, `session:${session.sessionId}`);
}

/* =============================================================
   DINET — LOYAL FRIENDS 2
   core/config.js

   ÚNICO ARCHIVO QUE DEBES EDITAR para conectar al backend.
   El resto del sistema NO necesita cambios al integrar.
============================================================= */

const API_CONFIG = {

  // ── Activar / desactivar backend ──────────────────────────
  // false → envía datos reales a Google Sheets
  // true  → solo loguea en consola (modo desarrollo)
  MOCK_MODE: false,

  // ── URL del backend (Google Apps Script Web App) ──────────
  ENDPOINT: "https://script.google.com/macros/s/AKfycbx_CTHuAOGrXt4SQRfpBWMNWm7Swi8Sx0qYR9RP8VGj-LGi-Ki4gxQJdOs9VPTid91TvQ/exec",

  // ── Estrategia de envío ───────────────────────────────────
  // "per_answer"  → una fila por respuesta  (recomendado Google Sheets)
  // "per_run"     → al finalizar aventura
  // "per_session" → al cerrar sesión
  SEND_STRATEGY: "per_answer",

  // ── Modo no bloqueante ────────────────────────────────────
  // true → si el backend falla el juego sigue igual
  NON_BLOCKING: true
};

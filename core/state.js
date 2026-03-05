/* =============================================================
   DINET — LOYAL FRIENDS 2
   core/state.js

   Una sola fuente de verdad.
   Ninguna otra parte del código declara variables de sesión.
   Toda lectura/escritura pasa por appState.
============================================================= */

const appState = {
  currentSession:      null,   // objeto Session activo  (ver factory.js)
  currentRun:          null,   // objeto AdventureRun activo
  currentAdventureKey: null,   // "RACKS" | "SENSIBLE" | "MINIRACK" | "ECOMMERCE"
  currentSceneId:      1       // escena actualmente renderizada
};

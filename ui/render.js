/* =============================================================
   DINET — LOYAL FRIENDS 2
   ui/render.js

   Motor de renderizado y navegación.
   Solo UI. Sin lógica de negocio. Sin llamadas a API.
   Lee de window.ADVENTURE_DATA para construir SCENES y ADVENTURES.
============================================================= */


// ── Construir SCENES y ADVENTURES desde window.ADVENTURE_DATA ──
// Se ejecuta una vez al cargar, después de todos los adventure scripts.

function buildSceneIndex() {
  const SCENES     = {
    1: { id: 1, type: "INITIAL", bg: "./BASE/1.jpg" }
  };
  const ADVENTURES = {};

  Object.entries(window.ADVENTURE_DATA).forEach(([key, data]) => {
    ADVENTURES[key] = data.scenes.map(s => s.id);
    data.scenes.forEach(s => { SCENES[s.id] = s; });
  });

  return { SCENES, ADVENTURES };
}


// ── Helpers ─────────────────────────────────────────────────

function createButton(text, cssClass, action) {
  const btn       = document.createElement("button");
  btn.textContent = text;
  btn.className   = "btn " + cssClass;
  btn.onclick     = action;
  return btn;
}

function getCurrentQuestion() {
  const key = appState.currentAdventureKey;
  if (!key) return null;
  return window.ADVENTURE_DATA[key]?.questions[`${key}-${appState.currentSceneId}`] || null;
}


// ── Navegación ───────────────────────────────────────────────

function nextScene() {
  const key  = appState.currentAdventureKey;
  const list = key ? ADVENTURES[key] : null;
  if (!list) return;
  const idx = list.indexOf(appState.currentSceneId);
  if (idx === -1 || idx === list.length - 1) return;
  renderScene(list[idx + 1]);
}

function prevScene() {
  const key  = appState.currentAdventureKey;
  const list = key ? ADVENTURES[key] : null;
  if (!list) return;
  const idx = list.indexOf(appState.currentSceneId);
  if (idx <= 0) {
    renderScene(1.5);
    return;
  }
  renderScene(list[idx - 1]);
}


// ── Motor principal de escenas ───────────────────────────────

const stage = document.getElementById("stage");

function renderScene(id) {
  // Fade out → cambiar escena → fade in
  stage.classList.add("fade-out");
  setTimeout(() => {
    _renderSceneImmediate(id);
    stage.classList.remove("fade-out");
    stage.classList.add("fade-in");
    setTimeout(() => stage.classList.remove("fade-in"), 600);
  }, 400);
}

function _renderSceneImmediate(id) {
  if (id === 1.5) {
    renderMapScene();
    return;
  }

  const scene = SCENES[id];
  if (!scene) return;

  appState.currentSceneId = id;
  stage.classList.remove("map-mode");
  stage.innerHTML = "";

  stage.style.backgroundImage = `
    linear-gradient(
      to top,
      rgba(0,0,0,0.65) 0%,
      rgba(0,0,0,0.20) 50%,
      rgba(0,0,0,0.00) 100%
    ), url("${scene.bg}")
  `;

  if (scene.type === "INITIAL")   renderInitial();
  if (scene.type === "NARRATIVE") renderNarrative();
  if (scene.type === "QUESTION")  renderQuestion();
  if (scene.type === "FINAL")     renderFinal();
}


// ── Renders por tipo de escena ───────────────────────────────

function renderInitial() {
  stage.appendChild(createButton("REGISTRO",  "action", openRegisterModal));
  stage.appendChild(createButton("SIGUIENTE", "next",   () => renderScene(1.5)));
}

function renderNarrative() {
  stage.appendChild(createButton("ATRÁS",     "back", prevScene));
  stage.appendChild(createButton("SIGUIENTE", "next", nextScene));
}

function renderQuestion() {
  stage.appendChild(createButton("ATRÁS",     "back",   prevScene));
  stage.appendChild(createButton("RESPONDER", "action", openQuestionModal));
}

function renderFinal() {
  stage.appendChild(createButton("VER RESULTADO",      "action", showRanking));
  stage.appendChild(createButton("FINALIZAR AVENTURA", "final",  finishRun));
}


// ── Mapa de aventuras (viñeta 1.5) ──────────────────────────

function renderMapScene() {
  if (!appState.currentSession) {
    renderScene(1);
    return;
  }

  stage.style.backgroundImage = `url("./BASE/1.5.jpg")`;
  stage.classList.add("map-mode");
  stage.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.style.cssText = `
    display:flex; flex-direction:column; align-items:center;
    justify-content:flex-end; width:100%; height:100%;
    gap:16px; padding-bottom:40px;
  `;

  // Fila 1 — botones de aventura
  // Para activar una aventura: cambiar alert() → startAdventure("KEY")
  const rowAdventures = document.createElement("div");
  rowAdventures.style.cssText = "display:flex; flex-wrap:wrap; justify-content:center; gap:16px;";

  rowAdventures.appendChild(createButton("RACKS",     "primary", () => startAdventure("RACKS")));
  rowAdventures.appendChild(createButton("SENSIBLE",  "primary", () => alert("Próximamente disponible")));
  rowAdventures.appendChild(createButton("MINIRACK",  "primary", () => alert("Próximamente disponible")));
  rowAdventures.appendChild(createButton("ECOMMERCE", "primary", () => alert("Próximamente disponible")));

  // Fila 2 — acciones de sesión
  const rowSession = document.createElement("div");
  rowSession.style.cssText = "display:flex; justify-content:center; gap:16px;";

  rowSession.appendChild(createButton("VER PUNTUACIÓN", "final",  showRanking));
  rowSession.appendChild(createButton("CAMBIAR EQUIPOS","danger",  changeRoster));

  wrapper.appendChild(rowAdventures);
  wrapper.appendChild(rowSession);
  stage.appendChild(wrapper);
}

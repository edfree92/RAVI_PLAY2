/* =============================================================
   DINET — LOYAL FRIENDS 2
   ui/modals.js

   Lógica de todos los modales.
   Sin lógica de negocio. Sin llamadas directas a API.
   Llama funciones de factory.js y api.js por nombre.
============================================================= */


// ── Fisher-Yates shuffle ─────────────────────────────────────
// Devuelve nuevo array mezclado sin mutar el original.
function shuffleArray(arr) {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}


// ────────────────────────────────────────────────────────────
// MODAL: REGISTRO DE EQUIPOS
// ────────────────────────────────────────────────────────────

function openRegisterModal() {
  document.getElementById("registerModal").style.display = "flex";
}

function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none";
}

function saveTeams() {
  const teamANames = [];
  const teamBNames = [];

  document.querySelectorAll(".regA").forEach(input => {
    if (input.value.trim()) teamANames.push(input.value.trim());
  });
  document.querySelectorAll(".regB").forEach(input => {
    if (input.value.trim()) teamBNames.push(input.value.trim());
  });

  closeRegisterModal();

  appState.currentSession = createSession(teamANames, teamBNames);
  console.log("[SESSION CREADA]", appState.currentSession.sessionId);

  renderScene(1.5);
}


// ────────────────────────────────────────────────────────────
// MODAL: PREGUNTAS
// ────────────────────────────────────────────────────────────

function openQuestionModal() {
  const question = getCurrentQuestion();
  if (!question) return;

  document.getElementById("questionTitle").textContent = question.text;

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  // Mezclar opciones y reasignar letras visibles (A/B/C/D)
  // Los puntos se mantienen ocultos durante la selección.
  // opt.id original se preserva en value para el cómputo de puntaje.
  const LABELS = ["A", "B", "C", "D"];
  const shuffled = shuffleArray(question.options).map((opt, i) => ({
    ...opt,
    displayId: LABELS[i]
  }));

  shuffled.forEach(opt => {
    const row       = document.createElement("div");
    row.className   = "option-row";
    row.innerHTML   = `
      <div>
        <span><strong>${opt.displayId})</strong> ${opt.text}</span>
      </div>
      <div class="option-radios" style="margin-top:10px;">
        <label>
          <input type="radio" name="A" value="${opt.id}">
          Equipo A
        </label>
        <label>
          <input type="radio" name="B" value="${opt.id}">
          Equipo B
        </label>
      </div>
    `;
    container.appendChild(row);
  });

  document.getElementById("questionModal").style.display = "flex";
}

function closeQuestionModal() {
  document.getElementById("questionModal").style.display = "none";
}


// ── handleRegisterAnswer ─────────────────────────────────────
// Reemplaza el patrón frágil de sobreescritura dinámica.
// El botón REGISTRAR RESPUESTA llama directamente a esta función.

function handleRegisterAnswer() {
  const selectedA = document.querySelector('input[name="A"]:checked');
  const selectedB = document.querySelector('input[name="B"]:checked');

  if (!selectedA || !selectedB) {
    alert("Ambos equipos deben responder antes de continuar.");
    return;
  }

  // processAnswer = lógica pura en factory.js
  const answerEvent = processAnswer(selectedA.value, selectedB.value);
  if (!answerEvent) return;

  // Enviar al backend sin bloquear
  sendAnswerToBackend(answerEvent);

  closeQuestionModal();

  // Mostrar modal de resultado
  setTimeout(() => showResultModal(answerEvent), 200);
}

document.getElementById("registerAnswerBtn").addEventListener("click", handleRegisterAnswer);
document.getElementById("closeQuestionBtn").addEventListener("click", closeQuestionModal);


// ────────────────────────────────────────────────────────────
// MODAL: RESULTADO DE PREGUNTA
// ────────────────────────────────────────────────────────────

function showResultModal(answerEvent) {
  const question = getCurrentQuestion();

  // getCurrentQuestion ya no está disponible (modal cerrado, sceneId no cambió)
  // Recuperamos la pregunta desde ADVENTURE_DATA por questionId
  const key      = answerEvent.meta.adventureKey;
  const q        = window.ADVENTURE_DATA[key]?.questions[answerEvent.questionId];
  if (!q) return;

  const optionA = q.options.find(o => o.id === answerEvent.selected.A);
  const optionB = q.options.find(o => o.id === answerEvent.selected.B);

  const topText = answerEvent.topOptions
    .map(id => {
      const opt = q.options.find(o => o.id === id);
      return `${opt.id}) ${opt.text}`;
    })
    .join(" &nbsp;/&nbsp; ");

  const run = appState.currentRun;

  document.getElementById("resultDynamicContent").innerHTML = `
    <p><strong>Equipo A respondió:</strong> ${optionA.id}) ${optionA.text}
       <span style="color:#00d084; font-weight:bold;"> +${answerEvent.points.A} pts</span></p>
    <p><strong>Equipo B respondió:</strong> ${optionB.id}) ${optionB.text}
       <span style="color:#00d084; font-weight:bold;"> +${answerEvent.points.B} pts</span></p>
    <hr style="margin:20px 0; border-color:#444;">
    <p><strong>🏆 Mejor(es) respuesta(s) — ${answerEvent.topPoints} pts:</strong><br>
       <span style="color:#ffd700;">${topText}</span></p>
    <hr style="margin:20px 0; border-color:#444;">
    <p><strong>Marcador esta aventura:</strong>
       A: ${run.teamScore.A} pts &nbsp;|&nbsp; B: ${run.teamScore.B} pts</p>
    <p><strong>Marcador acumulado (sesión):</strong>
       A: ${appState.currentSession.totals.A} pts &nbsp;|&nbsp;
       B: ${appState.currentSession.totals.B} pts</p>
  `;

  document.getElementById("resultModal").style.display = "flex";
}

document.getElementById("continueAfterResultBtn").addEventListener("click", function () {
  document.getElementById("resultModal").style.display = "none";
  nextScene();
});


// ────────────────────────────────────────────────────────────
// MODAL: RANKING FINAL
// ────────────────────────────────────────────────────────────

function showRanking() {
  const session = appState.currentSession;
  if (!session) { alert("No hay sesión activa."); return; }

  const totA = session.totals.A;
  const totB = session.totals.B;

  let runsHTML = "";
  session.runs.forEach(run => {
    runsHTML += `
      <p style="margin:6px 0;">
        <strong>${run.adventureKey}:</strong>
        Equipo A ${run.teamScore.A} pts — Equipo B ${run.teamScore.B} pts
      </p>`;
  });

  const playersA = session.teams.A.map(p => `${p.name}: ${p.totalPoints} pts`).join(" | ") || "—";
  const playersB = session.teams.B.map(p => `${p.name}: ${p.totalPoints} pts`).join(" | ") || "—";

  let winner = "";
  if      (totA > totB) winner = `<h3 style="color:#00d084;">🥇 GANADOR: EQUIPO A</h3>`;
  else if (totB > totA) winner = `<h3 style="color:#00d084;">🥇 GANADOR: EQUIPO B</h3>`;
  else                  winner = `<h3>🤝 EMPATE</h3>`;

  document.getElementById("rankingContent").innerHTML = `
    <p><strong>Aventuras jugadas:</strong> ${session.runs.length}</p>
    ${runsHTML}
    <hr style="margin:16px 0; border-color:#444;">
    <p><strong>TOTAL Equipo A:</strong> ${totA} pts</p>
    <p style="font-size:13px; color:#aaa;">${playersA}</p>
    <p><strong>TOTAL Equipo B:</strong> ${totB} pts</p>
    <p style="font-size:13px; color:#aaa;">${playersB}</p>
    <hr style="margin:16px 0; border-color:#444;">
    ${winner}
  `;

  document.getElementById("rankingModal").style.display = "flex";
}

document.getElementById("closeRankingBtn").addEventListener("click", function () {
  if (appState.currentSession) {
    appState.currentSession.endAtSession = now();
    sendSessionToBackend(appState.currentSession);
  }
  appState.currentSession      = null;
  appState.currentRun          = null;
  appState.currentAdventureKey = null;

  document.getElementById("rankingModal").style.display = "none";
  renderScene(1);
});


// ────────────────────────────────────────────────────────────
// FLUJO DE SESIÓN (aquí por dependencia con modals + render)
// ────────────────────────────────────────────────────────────

function startAdventure(adventureKey) {
  // Barrera de seguridad: solo aventuras con datos reales
  if (!window.ADVENTURE_DATA[adventureKey]) {
    alert("Esta aventura aún no está disponible.");
    return;
  }

  if (!appState.currentSession) {
    renderScene(1);
    return;
  }

  appState.currentAdventureKey = adventureKey;
  appState.currentRun          = createRun(adventureKey);

  renderScene(ADVENTURES[adventureKey][0]);
}

function finishRun() {
  appState.currentRun.endAtRun = now();
  appState.currentRun.status   = "finished";

  sendRunToBackend(appState.currentRun);

  appState.currentSession.runs.push(appState.currentRun);
  appState.currentRun          = null;
  appState.currentAdventureKey = null;

  console.log("[SESSION] Runs totales:", appState.currentSession.runs.length);
  renderScene(1.5);
}

function changeRoster() {
  if (appState.currentSession) {
    appState.currentSession.endAtSession = now();
    sendSessionToBackend(appState.currentSession);
  }

  appState.currentSession      = null;
  appState.currentRun          = null;
  appState.currentAdventureKey = null;

  document.querySelectorAll(".regA, .regB").forEach(i => i.value = "");
  renderScene(1);
}

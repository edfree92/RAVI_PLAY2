/* =============================================================
   DINET — LOYAL FRIENDS 2
   ui/modals.js
============================================================= */


// ── Fisher-Yates shuffle ─────────────────────────────────────
function shuffleArray(arr) {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}


// ────────────────────────────────────────────────────────────
// AUDIO DE PREGUNTA
// ────────────────────────────────────────────────────────────

const ADVENTURE_MUSIC = {
  RACKS:    "./BASE/RACKS.AUDIO.mp3",
  MINIRACK: "./BASE/MINIRACK.AUDIO.mp3"
};

let _questionAudio    = null;
let _questionAudioKey = null;

function _startQuestionAudio() {
  const key = appState.currentAdventureKey;
  const src = ADVENTURE_MUSIC[key];
  if (!src) return;

  if (!_questionAudio || _questionAudioKey !== key) {
    if (_questionAudio) _questionAudio.pause();
    _questionAudio        = new Audio(src);
    _questionAudio.loop   = true;
    _questionAudio.volume = 0.5;
    _questionAudioKey     = key;
  }

  _questionAudio.currentTime = 0;
  _questionAudio.play().catch(() => {});
}

function _stopQuestionAudio() {
  if (!_questionAudio) return;
  _questionAudio.pause();
  _questionAudio.currentTime = 0;
}

function _volumeUp() {
  if (!_questionAudio) return;
  _questionAudio.volume = Math.min(1.0, _questionAudio.volume + 0.15);
  _updateVolumeDisplay();
}

function _volumeDown() {
  if (!_questionAudio) return;
  _questionAudio.volume = Math.max(0.0, _questionAudio.volume - 0.15);
  _updateVolumeDisplay();
}

function _updateVolumeDisplay() {
  const el = document.getElementById("volumeLevel");
  if (el && _questionAudio) el.textContent = Math.round(_questionAudio.volume * 100) + "%";
}


// ────────────────────────────────────────────────────────────
// RULETA DE SORTEO
// ────────────────────────────────────────────────────────────

// Colas de participantes por equipo — se reinician en cada run
const _rouletteQueues   = { A: [], B: [] };
let   _pendingPlayerA   = "";   // jugador pre-seleccionado para la pregunta actual
let   _pendingPlayerB   = "";

// Llama a esto en startAdventure() para inicializar las colas del run
function _initRouletteQueues() {
  const session = appState.currentSession;
  if (!session) return;
  _rouletteQueues.A = shuffleArray(session.teams.A.map(p => p.name).filter(n => n));
  _rouletteQueues.B = shuffleArray(session.teams.B.map(p => p.name).filter(n => n));
}

// Saca el siguiente jugador de la cola; reinicia si se agota
function _getNextPlayer(team) {
  if (_rouletteQueues[team].length === 0) {
    const session = appState.currentSession;
    _rouletteQueues[team] = shuffleArray(
      session.teams[team].map(p => p.name).filter(n => n)
    );
  }
  return _rouletteQueues[team].shift() || "—";
}

function openRouletteModal() {
  const nA = appState.teamNames.A;
  const nB = appState.teamNames.B;

  // Actualizar nombres de equipo en la ruleta
  document.getElementById("rouletteNameA").textContent = nA;
  document.getElementById("rouletteNameB").textContent = nB;

  // Resetear estado visual
  const wA = document.getElementById("slotWindowA");
  const wB = document.getElementById("slotWindowB");
  wA.className = "slot-window";
  wB.className = "slot-window";
  document.getElementById("slotNameA").textContent = "• • •";
  document.getElementById("slotNameB").textContent = "• • •";

  document.getElementById("roulettePlayBtn").style.display     = "inline-block";
  document.getElementById("rouletteContinueBtn").style.display = "none";

  // Pre-seleccionar jugadores UNA SOLA VEZ al abrir el modal
  // _spinRoulette solo anima — no consume la cola
  _pendingPlayerA = _getNextPlayer("A");
  _pendingPlayerB = _getNextPlayer("B");

  document.getElementById("rouletteModal").style.display = "flex";
}

// Animación slot machine simultánea
function _spinRoulette() {
  const playBtn     = document.getElementById("roulettePlayBtn");
  const continueBtn = document.getElementById("rouletteContinueBtn");
  playBtn.disabled  = true;

  const session  = appState.currentSession;
  const namesA   = session.teams.A.map(p => p.name).filter(n => n);
  const namesB   = session.teams.B.map(p => p.name).filter(n => n);

  const chosenA  = _pendingPlayerA;
  const chosenB  = _pendingPlayerB;

  const elA = document.getElementById("slotNameA");
  const elB = document.getElementById("slotNameB");
  const wA  = document.getElementById("slotWindowA");
  const wB  = document.getElementById("slotWindowB");

  wA.className = "slot-window spinning";
  wB.className = "slot-window spinning";

  const SPIN_MS    = 2400;   // duración total del giro
  const FAST_MS    = 60;     // intervalo rápido al inicio
  const SLOW_MS    = 160;    // intervalo lento al final
  const SLOW_START = 1600;   // cuándo empieza a desacelerar

  let elapsed  = 0;
  let interval = FAST_MS;
  let ticker   = null;

  function tick() {
    elapsed += interval;

    // Mostrar nombre al azar mientras gira
    elA.textContent = namesA[Math.floor(Math.random() * namesA.length)] || "—";
    elB.textContent = namesB[Math.floor(Math.random() * namesB.length)] || "—";

    // Desacelerar progresivamente
    if (elapsed >= SLOW_START) interval = SLOW_MS;

    if (elapsed >= SPIN_MS) {
      clearInterval(ticker);

      // Mostrar resultado final
      elA.textContent  = chosenA;
      elB.textContent  = chosenB;
      wA.className     = "slot-window landed";
      wB.className     = "slot-window landed";
      playBtn.style.display     = "none";
      continueBtn.style.display = "inline-block";
      return;
    }

    clearInterval(ticker);
    ticker = setInterval(tick, interval);
  }

  ticker = setInterval(tick, interval);
}

// onclick en vez de addEventListener — evita acumulación de listeners
// entre aperturas del modal (el DOM persiste entre llamadas)
document.getElementById("roulettePlayBtn").onclick     = _spinRoulette;
document.getElementById("rouletteContinueBtn").onclick = function () {
  document.getElementById("rouletteModal").style.display = "none";
  openQuestionModal();
};


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

  // Guardar nombres de equipo (solo frontend)
  const rawA = document.getElementById("teamNameA").value.trim();
  const rawB = document.getElementById("teamNameB").value.trim();
  appState.teamNames.A = rawA || "Equipo A";
  appState.teamNames.B = rawB || "Equipo B";

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

  const nA = appState.teamNames.A;
  const nB = appState.teamNames.B;

  document.getElementById("questionTitle").textContent = question.text;

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  const LABELS  = ["A", "B", "C", "D"];
  const shuffled = shuffleArray(question.options).map((opt, i) => ({
    ...opt, displayId: LABELS[i]
  }));

  shuffled.forEach(opt => {
    const row     = document.createElement("div");
    row.className = "option-row";
    row.innerHTML = `
      <div>
        <span><strong>${opt.displayId})</strong> ${opt.text}</span>
      </div>
      <div class="option-radios" style="margin-top:10px;">
        <label>
          <input type="radio" name="A" value="${opt.id}">
          ${nA}
        </label>
        <label>
          <input type="radio" name="B" value="${opt.id}">
          ${nB}
        </label>
      </div>
    `;
    container.appendChild(row);
  });

  // Controles de volumen
  if (ADVENTURE_MUSIC[appState.currentAdventureKey]) {
    const volBar = document.createElement("div");
    volBar.id    = "volumeControls";
    volBar.style.cssText = `
      display:flex; align-items:center; justify-content:center;
      gap:14px; margin-top:18px; padding:10px 16px;
      background:rgba(255,255,255,0.07); border-radius:8px;
    `;
    volBar.innerHTML = `
      <button id="volDownBtn" style="background:rgba(255,255,255,0.12);border:none;
        border-radius:6px;color:#fff;font-size:20px;width:40px;height:40px;
        cursor:pointer;line-height:1;">🔉</button>
      <span style="color:#ccc;font-size:13px;min-width:36px;text-align:center;">
        🎵 <span id="volumeLevel">50%</span>
      </span>
      <button id="volUpBtn" style="background:rgba(255,255,255,0.12);border:none;
        border-radius:6px;color:#fff;font-size:20px;width:40px;height:40px;
        cursor:pointer;line-height:1;">🔊</button>
    `;
    container.appendChild(volBar);
    document.getElementById("volDownBtn").addEventListener("click", _volumeDown);
    document.getElementById("volUpBtn").addEventListener("click",   _volumeUp);
  }

  document.getElementById("questionModal").style.display = "flex";
  _startQuestionAudio();
}

function closeQuestionModal() {
  _stopQuestionAudio();
  document.getElementById("questionModal").style.display = "none";
}


// ── handleRegisterAnswer ─────────────────────────────────────

function handleRegisterAnswer() {
  const selectedA = document.querySelector('input[name="A"]:checked');
  const selectedB = document.querySelector('input[name="B"]:checked');

  if (!selectedA || !selectedB) {
    alert("Ambos equipos deben responder antes de continuar.");
    return;
  }

  const answerEvent = processAnswer(selectedA.value, selectedB.value);
  if (!answerEvent) return;

  sendAnswerToBackend(answerEvent);
  _stopQuestionAudio();
  closeQuestionModal();

  setTimeout(() => showResultModal(answerEvent), 200);
}

document.getElementById("registerAnswerBtn").addEventListener("click", handleRegisterAnswer);
document.getElementById("closeQuestionBtn").addEventListener("click",  closeQuestionModal);


// ────────────────────────────────────────────────────────────
// MODAL: RESULTADO DE PREGUNTA
// ────────────────────────────────────────────────────────────

function showResultModal(answerEvent) {
  const nA = appState.teamNames.A;
  const nB = appState.teamNames.B;

  const key = answerEvent.meta.adventureKey;
  const q   = window.ADVENTURE_DATA[key]?.questions[answerEvent.questionId];
  if (!q) return;

  const optionA = q.options.find(o => o.id === answerEvent.selected.A);
  const optionB = q.options.find(o => o.id === answerEvent.selected.B);

  const topText = answerEvent.topOptions
    .map(id => { const o = q.options.find(x => x.id === id); return `${o.id}) ${o.text}`; })
    .join(" &nbsp;/&nbsp; ");

  const run = appState.currentRun;

  document.getElementById("resultDynamicContent").innerHTML = `
    <p><strong>${nA} respondió:</strong> ${optionA.id}) ${optionA.text}
       <span style="color:#00d084;font-weight:bold;"> +${answerEvent.points.A} pts</span></p>
    <p><strong>${nB} respondió:</strong> ${optionB.id}) ${optionB.text}
       <span style="color:#00d084;font-weight:bold;"> +${answerEvent.points.B} pts</span></p>
    <hr style="margin:16px 0;border-color:#444;">
    <p><strong>🏆 Mejor(es) respuesta(s) — ${answerEvent.topPoints} pts:</strong><br>
       <span style="color:#ffd700;">${topText}</span></p>
    <hr style="margin:16px 0;border-color:#444;">
    <p><strong>Marcador esta aventura:</strong>
       ${nA}: ${run.teamScore.A} pts &nbsp;|&nbsp; ${nB}: ${run.teamScore.B} pts</p>
    <p><strong>Marcador acumulado (sesión):</strong>
       ${nA}: ${appState.currentSession.totals.A} pts &nbsp;|&nbsp;
       ${nB}: ${appState.currentSession.totals.B} pts</p>
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

  const nA   = appState.teamNames.A;
  const nB   = appState.teamNames.B;
  const totA = session.totals.A;
  const totB = session.totals.B;

  let runsHTML = "";
  session.runs.forEach(run => {
    runsHTML += `
      <p style="margin:6px 0;">
        <strong>${run.adventureKey}:</strong>
        ${nA} ${run.teamScore.A} pts — ${nB} ${run.teamScore.B} pts
      </p>`;
  });

  const playersA = session.teams.A.map(p => `${p.name}: ${p.totalPoints} pts`).join(" | ") || "—";
  const playersB = session.teams.B.map(p => `${p.name}: ${p.totalPoints} pts`).join(" | ") || "—";

  let winner = "";
  if      (totA > totB) winner = `<h3 style="color:#00d084;">🥇 GANADOR: ${nA}</h3>`;
  else if (totB > totA) winner = `<h3 style="color:#00d084;">🥇 GANADOR: ${nB}</h3>`;
  else                  winner = `<h3>🤝 EMPATE</h3>`;

  document.getElementById("rankingContent").innerHTML = `
    <p><strong>Aventuras jugadas:</strong> ${session.runs.length}</p>
    ${runsHTML}
    <hr style="margin:16px 0;border-color:#444;">
    <p><strong>TOTAL ${nA}:</strong> ${totA} pts</p>
    <p style="font-size:13px;color:#aaa;">${playersA}</p>
    <p><strong>TOTAL ${nB}:</strong> ${totB} pts</p>
    <p style="font-size:13px;color:#aaa;">${playersB}</p>
    <hr style="margin:16px 0;border-color:#444;">
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
  renderScene(1.5);
});


// ────────────────────────────────────────────────────────────
// FLUJO DE SESIÓN
// ────────────────────────────────────────────────────────────

function startAdventure(adventureKey) {
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

  // Inicializar colas de ruleta para este run
  _initRouletteQueues();

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
  document.getElementById("teamNameA").value = "";
  document.getElementById("teamNameB").value = "";
  renderScene(1);
  setTimeout(openRegisterModal, 500);
}

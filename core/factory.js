/* =============================================================
   DINET — LOYAL FRIENDS 2
   core/factory.js

   Lógica de negocio pura.
   Sin DOM. Sin UI. Sin llamadas a API.
   La UI solo llama estas funciones y consume los resultados.
============================================================= */


// ── Utilidades de datos ─────────────────────────────────────

// UUID real via Web Crypto API — sin colisiones
function generateUUID() {
  return crypto.randomUUID();
}

// Timestamp ISO 8601 — único lugar donde se genera fechas
// Compatible con cualquier backend (Google Sheets, Supabase, etc.)
function now() {
  return new Date().toISOString();
}


// ── Fábrica de Session ──────────────────────────────────────

function createSession(teamANames, teamBNames) {
  return {
    sessionId:      generateUUID(),
    createdAt:      now(),
    startAtSession: now(),
    endAtSession:   null,

    teams: {
      A: teamANames.map(name => ({
        playerId:    generateUUID(),
        name,
        totalPoints: 0
      })),
      B: teamBNames.map(name => ({
        playerId:    generateUUID(),
        name,
        totalPoints: 0
      }))
    },

    runs:   [],
    totals: { A: 0, B: 0 }
  };
}


// ── Fábrica de AdventureRun ─────────────────────────────────

function createRun(adventureKey) {
  return {
    runId:        generateUUID(),
    sessionId:    appState.currentSession.sessionId,
    adventureKey,
    startAtRun:   now(),
    endAtRun:     null,
    status:       "in_progress",
    teamScore:    { A: 0, B: 0 },
    playerScore:  {},    // reservado para tracking individual
    answers:      []
  };
}


// ── Registro de respuesta ───────────────────────────────────
// Recibe los IDs de opciones elegidas por cada equipo.
// Calcula puntos, actualiza run y sesión, devuelve el AnswerEvent.
// No toca el DOM.

function processAnswer(optionIdA, optionIdB) {
  const question = getCurrentQuestion();
  if (!question) return null;

  const optionA   = question.options.find(o => o.id === optionIdA);
  const optionB   = question.options.find(o => o.id === optionIdB);
  const pointsA   = optionA ? optionA.points : 0;
  const pointsB   = optionB ? optionB.points : 0;

  // Mejor(es) opción(es) — calculado dinámicamente del array
  const topPoints  = Math.max(...question.options.map(o => o.points));
  const topOptions = question.options
    .filter(o => o.points === topPoints)
    .map(o => o.id);

  const answerEvent = {
    runId:      appState.currentRun.runId,
    timestamp:  now(),
    questionId: question.questionId,
    sceneId:    appState.currentSceneId,
    selected:   { A: optionIdA, B: optionIdB },
    points:     { A: pointsA,  B: pointsB  },
    topOptions,
    topPoints,
    meta: { adventureKey: appState.currentRun.adventureKey }
  };

  // Actualizar run activo
  appState.currentRun.answers.push(answerEvent);
  appState.currentRun.teamScore.A += pointsA;
  appState.currentRun.teamScore.B += pointsB;

  // Actualizar totales de sesión y puntos por jugador
  appState.currentSession.teams.A.forEach(p => { p.totalPoints += pointsA; });
  appState.currentSession.teams.B.forEach(p => { p.totalPoints += pointsB; });
  appState.currentSession.totals.A += pointsA;
  appState.currentSession.totals.B += pointsB;

  console.log("[ANSWER]", answerEvent);
  return answerEvent;
}


// ── Payloads para backend ───────────────────────────────────
// Formato plano — una fila en Google Sheets por llamada.

function buildAnswerPayload(answerEvent) {
  const session = appState.currentSession;
  const run     = appState.currentRun;

  const row = {
    questionId:        answerEvent.questionId,
    sceneId:           answerEvent.sceneId,
    timestamp:         answerEvent.timestamp,
    teamAOption:       answerEvent.selected.A,
    teamBOption:       answerEvent.selected.B,
    teamAPoints:       answerEvent.points.A,
    teamBPoints:       answerEvent.points.B,
    topOptions:        answerEvent.topOptions.join("|"),
    topPoints:         answerEvent.topPoints,
    teamARunTotal:     run.teamScore.A,
    teamBRunTotal:     run.teamScore.B,
    teamASessionTotal: session.totals.A,
    teamBSessionTotal: session.totals.B,
    adventureKey:      run.adventureKey,
    sessionId:         session.sessionId,
    playersA:          session.teams.A.map(p => p.name).join("|"),
    playersB:          session.teams.B.map(p => p.name).join("|")
  };

  return {
    type:    "answers",       // ← Apps Script enruta por este campo
    runId:   run.runId,
    answers: [row]            // ← Apps Script espera un array
  };
}

function buildRunPayload(run) {
  const session = appState.currentSession;
  return {
    type:         "run",      // ← Apps Script enruta por este campo
    runId:        run.runId,
    sessionId:    session.sessionId,
    adventureKey: run.adventureKey,
    startAtRun:   run.startAtRun,
    endAtRun:     run.endAtRun,
    status:       run.status,
    teamScore:    { A: run.teamScore.A, B: run.teamScore.B },
    totalAnswers: run.answers.length,
    playersA:     session.teams.A.map(p => p.name).join("|"),
    playersB:     session.teams.B.map(p => p.name).join("|")
  };
}

function buildSessionPayload(session) {
  return {
    type:           "session", // ← Apps Script enruta por este campo
    sessionId:      session.sessionId,
    createdAt:      session.createdAt,
    startAtSession: session.startAtSession,
    endAtSession:   session.endAtSession,
    teams: {
      A: session.teams.A.map(p => ({ name: p.name, totalPoints: p.totalPoints })),
      B: session.teams.B.map(p => ({ name: p.name, totalPoints: p.totalPoints }))
    },
    totals:    session.totals,
    totalRuns: session.runs.length
  };
}

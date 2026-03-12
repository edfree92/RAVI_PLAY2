/* =============================================================
   DINET — LOYAL FRIENDS 2
   adventures/sensible.js

   Aventura: SENSIBLE  |  Estado: ACTIVA
   Imágenes: BASE/3.1.jpg … BASE/3.10.jpg
   Audio:    BASE/SENSIBLE.AUDIO.mp3
   IDs de escena: 12–21
   ─────────────────────────────────────────────────────────────
   Estructura de viñetas:
     12 → NARRATIVE_START  (solo SIGUIENTE)
     13 → NARRATIVE        (ATRÁS + SIGUIENTE)
     14 → QUESTION         (ATRÁS + RESPONDER)  ← Pregunta 1
     15 → QUESTION         (ATRÁS + RESPONDER)  ← Pregunta 2
     16 → QUESTION         (ATRÁS + RESPONDER)  ← Pregunta 3
     17 → QUESTION         (ATRÁS + RESPONDER)  ← Pregunta 4
     18 → NARRATIVE        (ATRÁS + SIGUIENTE)
     19 → NARRATIVE        (ATRÁS + SIGUIENTE)
     20 → NARRATIVE        (ATRÁS + SIGUIENTE)
     21 → FINAL_MENU       (ATRÁS + VER PUNTUACIÓN + REGRESAR AL MENÚ)
============================================================= */

window.ADVENTURE_DATA = window.ADVENTURE_DATA || {};

window.ADVENTURE_DATA.SENSIBLE = {

  // ── Metadatos ─────────────────────────────────────────────
  label: "SENSIBLE",
  ready: true,

  // ── Escenas ───────────────────────────────────────────────
  scenes: [
    { id: 12, type: "NARRATIVE_START", bg: "./BASE/3.1.jpg"  },
    { id: 13, type: "NARRATIVE",       bg: "./BASE/3.2.jpg"  },
    { id: 14, type: "QUESTION",        bg: "./BASE/3.3.jpg"  },
    { id: 15, type: "QUESTION",        bg: "./BASE/3.4.jpg"  },
    { id: 16, type: "QUESTION",        bg: "./BASE/3.5.jpg"  },
    { id: 17, type: "QUESTION",        bg: "./BASE/3.6.jpg"  },
    { id: 18, type: "NARRATIVE",       bg: "./BASE/3.7.jpg"  },
    { id: 19, type: "NARRATIVE",       bg: "./BASE/3.8.jpg"  },
    { id: 20, type: "NARRATIVE",       bg: "./BASE/3.9.jpg"  },
    { id: 21, type: "FINAL_MENU",      bg: "./BASE/3.10.jpg" }
  ],

  // ── Preguntas ─────────────────────────────────────────────
  // Clave: "SENSIBLE-{sceneId}"
  questions: {

    "SENSIBLE-14": {
      questionId: "SENSIBLE-14",
      text: "¿Qué error operativo estamos observando en esta bandeja?",
      options: [
        { id: "A", text: "Error de conteo en picking",          points: 15 },
        { id: "B", text: "Cruce de SKU en bandeja",             points: 20 },
        { id: "C", text: "Bandeja mal etiquetada",              points: 10 },
        { id: "D", text: "Código infiltrado en bandeja",        points: 20 }
      ]
    },

    "SENSIBLE-15": {
      questionId: "SENSIBLE-15",
      text: "¿Qué error u omisión puede explicar que la bandeja esté demasiado llena?",
      options: [
        { id: "A", text: "Combinación incorrecta de LPNS con pocket",          points: 15 },
        { id: "B", text: "Orden incorrecto de los productos",                   points: 10 },
        { id: "C", text: "Bandeja sobrecargada por exceso de picking",          points: 20 },
        { id: "D", text: "Falta de bandejas para meter el picking",             points: 20 }
      ]
    },

    "SENSIBLE-16": {
      questionId: "SENSIBLE-16",
      text: "Cuando encontramos una bandeja demasiado llena, ¿qué corresponde hacer?",
      options: [
        { id: "A", text: "Mover productos a una caja y seguir trabajando",                                        points: 10 },
        { id: "B", text: "Hablar con el supervisor para poder corregir las bandejas muy llenas",                  points: 20 },
        { id: "C", text: "Enseñarle al picker hasta dónde es seguro llenar la bandeja",                          points: 15 },
        { id: "D", text: "Verificar con el pocket consultando LPN que esté la bandeja cuadrada",                 points: 20 }
      ]
    },

    "SENSIBLE-17": {
      questionId: "SENSIBLE-17",
      text: "¿Cuál es el principal riesgo cuando una bandeja está demasiado llena?",
      options: [
        { id: "A", text: "El WMS puede perder la trazabilidad",        points: 10 },
        { id: "B", text: "Daño en los empaques de los productos",      points: 20 },
        { id: "C", text: "El rack puede bloquearse",                   points: 15 },
        { id: "D", text: "Mayor demora al auditar la bandeja",         points: 20 }
      ]
    }

  }
};

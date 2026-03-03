/* =============================================================
   DINET — LOYAL FRIENDS 2
   adventures/sensible.js

   Aventura: SENSIBLE
   Estado: pendiente de contenido real
   ─────────────────────────────────────────────────────────────
   Reemplazar los textos de preguntas y opciones cuando
   el contenido de SENSIBLE esté listo.
   Las escenas usan assets de BASE/ como placeholder.
============================================================= */

window.ADVENTURE_DATA = window.ADVENTURE_DATA || {};

window.ADVENTURE_DATA.SENSIBLE = {

  // ── Escenas ───────────────────────────────────────────────
  // IDs globales únicos (SENSIBLE usa 12–21)
  scenes: [
    { id: 12, type: "NARRATIVE", bg: "./SENSIBLE/2.jpg"  },
    { id: 13, type: "NARRATIVE", bg: "./SENSIBLE/3.jpg"  },
    { id: 14, type: "NARRATIVE", bg: "./SENSIBLE/4.jpg"  },
    { id: 15, type: "QUESTION",  bg: "./SENSIBLE/5.jpg"  },
    { id: 16, type: "QUESTION",  bg: "./SENSIBLE/6.jpg"  },
    { id: 17, type: "QUESTION",  bg: "./SENSIBLE/7.jpg"  },
    { id: 18, type: "QUESTION",  bg: "./SENSIBLE/8.jpg"  },
    { id: 19, type: "NARRATIVE", bg: "./SENSIBLE/9.jpg"  },
    { id: 20, type: "NARRATIVE", bg: "./SENSIBLE/10.jpg" },
    { id: 21, type: "FINAL",     bg: "./SENSIBLE/11.jpg" }
  ],

  // ── Preguntas ─────────────────────────────────────────────
  // TODO: Reemplazar por preguntas reales de SENSIBLE
  questions: {

    "SENSIBLE-15": {
      questionId: "SENSIBLE-15",
      text: "[SENSIBLE] Pregunta 1 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    },

    "SENSIBLE-16": {
      questionId: "SENSIBLE-16",
      text: "[SENSIBLE] Pregunta 2 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    },

    "SENSIBLE-17": {
      questionId: "SENSIBLE-17",
      text: "[SENSIBLE] Pregunta 3 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    },

    "SENSIBLE-18": {
      questionId: "SENSIBLE-18",
      text: "[SENSIBLE] Pregunta 4 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    }

  }
};

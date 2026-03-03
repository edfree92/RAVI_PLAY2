/* =============================================================
   DINET — LOYAL FRIENDS 2
   adventures/minirack.js

   Aventura: MINIRACK
   Estado: pendiente de contenido real
============================================================= */

window.ADVENTURE_DATA = window.ADVENTURE_DATA || {};

window.ADVENTURE_DATA.MINIRACK = {

  // IDs globales únicos (MINIRACK usa 22–31)
  scenes: [
    { id: 22, type: "NARRATIVE", bg: "./MINIRACK/2.jpg"  },
    { id: 23, type: "NARRATIVE", bg: "./MINIRACK/3.jpg"  },
    { id: 24, type: "NARRATIVE", bg: "./MINIRACK/4.jpg"  },
    { id: 25, type: "QUESTION",  bg: "./MINIRACK/5.jpg"  },
    { id: 26, type: "QUESTION",  bg: "./MINIRACK/6.jpg"  },
    { id: 27, type: "QUESTION",  bg: "./MINIRACK/7.jpg"  },
    { id: 28, type: "QUESTION",  bg: "./MINIRACK/8.jpg"  },
    { id: 29, type: "NARRATIVE", bg: "./MINIRACK/9.jpg"  },
    { id: 30, type: "NARRATIVE", bg: "./MINIRACK/10.jpg" },
    { id: 31, type: "FINAL",     bg: "./MINIRACK/11.jpg" }
  ],

  questions: {
    "MINIRACK-25": {
      questionId: "MINIRACK-25",
      text: "[MINIRACK] Pregunta 1 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    },
    "MINIRACK-26": {
      questionId: "MINIRACK-26",
      text: "[MINIRACK] Pregunta 2 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    },
    "MINIRACK-27": {
      questionId: "MINIRACK-27",
      text: "[MINIRACK] Pregunta 3 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    },
    "MINIRACK-28": {
      questionId: "MINIRACK-28",
      text: "[MINIRACK] Pregunta 4 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    }
  }
};

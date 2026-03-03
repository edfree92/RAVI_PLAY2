/* =============================================================
   DINET — LOYAL FRIENDS 2
   adventures/ecommerce.js

   Aventura: ECOMMERCE
   Estado: pendiente de contenido real
============================================================= */

window.ADVENTURE_DATA = window.ADVENTURE_DATA || {};

window.ADVENTURE_DATA.ECOMMERCE = {

  // IDs globales únicos (ECOMMERCE usa 32–41)
  scenes: [
    { id: 32, type: "NARRATIVE", bg: "./ECOMMERCE/2.jpg"  },
    { id: 33, type: "NARRATIVE", bg: "./ECOMMERCE/3.jpg"  },
    { id: 34, type: "NARRATIVE", bg: "./ECOMMERCE/4.jpg"  },
    { id: 35, type: "QUESTION",  bg: "./ECOMMERCE/5.jpg"  },
    { id: 36, type: "QUESTION",  bg: "./ECOMMERCE/6.jpg"  },
    { id: 37, type: "QUESTION",  bg: "./ECOMMERCE/7.jpg"  },
    { id: 38, type: "QUESTION",  bg: "./ECOMMERCE/8.jpg"  },
    { id: 39, type: "NARRATIVE", bg: "./ECOMMERCE/9.jpg"  },
    { id: 40, type: "NARRATIVE", bg: "./ECOMMERCE/10.jpg" },
    { id: 41, type: "FINAL",     bg: "./ECOMMERCE/11.jpg" }
  ],

  questions: {
    "ECOMMERCE-35": {
      questionId: "ECOMMERCE-35",
      text: "[ECOMMERCE] Pregunta 1 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    },
    "ECOMMERCE-36": {
      questionId: "ECOMMERCE-36",
      text: "[ECOMMERCE] Pregunta 2 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    },
    "ECOMMERCE-37": {
      questionId: "ECOMMERCE-37",
      text: "[ECOMMERCE] Pregunta 3 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    },
    "ECOMMERCE-38": {
      questionId: "ECOMMERCE-38",
      text: "[ECOMMERCE] Pregunta 4 — pendiente de contenido",
      options: [
        { id: "A", text: "Opción A", points: 20 },
        { id: "B", text: "Opción B", points: 20 },
        { id: "C", text: "Opción C", points: 15 },
        { id: "D", text: "Opción D", points: 10 }
      ]
    }
  }
};

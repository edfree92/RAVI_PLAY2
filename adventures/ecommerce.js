/* =============================================================
   DINET — LOYAL FRIENDS 2
   adventures/ecommerce.js

   Aventura: ECOMMERCE  |  Estado: PENDIENTE
   ─────────────────────────────────────────────────────────────
   CUANDO EL CONTENIDO ESTÉ LISTO:
     1. Cambiar ready: false  →  ready: true
     2. Reemplazar los IDs de scenes con la numeración real
     3. Reemplazar los bg con los nombres de imagen reales en BASE/
     4. Reemplazar TODO el bloque questions con las preguntas reales
     → Al subir el archivo a GitHub se activa el botón en el mapa.
   NO tocar ningún otro archivo.
============================================================= */

window.ADVENTURE_DATA = window.ADVENTURE_DATA || {};

window.ADVENTURE_DATA.ECOMMERCE = {

  // ── Metadatos ─────────────────────────────────────────────
  label: "ECOMMERCE",
  ready: false,            // ← cambiar a true cuando el contenido esté listo

  // ── Escenas ───────────────────────────────────────────────
  // ECOMMERCE reserva IDs 32–41
  // TODO: reemplazar bg con los nombres reales de imagen en BASE/
  scenes: [
    { id: 32, type: "NARRATIVE", bg: "./BASE/E2.jpg"  },  // TODO: nombre real
    { id: 33, type: "NARRATIVE", bg: "./BASE/E3.jpg"  },  // TODO: nombre real
    { id: 34, type: "NARRATIVE", bg: "./BASE/E4.jpg"  },  // TODO: nombre real
    { id: 35, type: "QUESTION",  bg: "./BASE/E5.jpg"  },  // TODO: nombre real
    { id: 36, type: "QUESTION",  bg: "./BASE/E6.jpg"  },  // TODO: nombre real
    { id: 37, type: "QUESTION",  bg: "./BASE/E7.jpg"  },  // TODO: nombre real
    { id: 38, type: "QUESTION",  bg: "./BASE/E8.jpg"  },  // TODO: nombre real
    { id: 39, type: "NARRATIVE", bg: "./BASE/E9.jpg"  },  // TODO: nombre real
    { id: 40, type: "NARRATIVE", bg: "./BASE/E10.jpg" },  // TODO: nombre real
    { id: 41, type: "FINAL",     bg: "./BASE/E11.jpg" }   // TODO: nombre real
  ],

  // ── Preguntas ─────────────────────────────────────────────
  // TODO: reemplazar TODO este bloque con las preguntas reales
  // Clave: "ECOMMERCE-{sceneId}"
  questions: {

    "ECOMMERCE-35": {
      questionId: "ECOMMERCE-35",
      text: "TODO: pregunta 1 de ECOMMERCE",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    },

    "ECOMMERCE-36": {
      questionId: "ECOMMERCE-36",
      text: "TODO: pregunta 2 de ECOMMERCE",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    },

    "ECOMMERCE-37": {
      questionId: "ECOMMERCE-37",
      text: "TODO: pregunta 3 de ECOMMERCE",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    },

    "ECOMMERCE-38": {
      questionId: "ECOMMERCE-38",
      text: "TODO: pregunta 4 de ECOMMERCE",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    }

  }
};

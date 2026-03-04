/* =============================================================
   DINET — LOYAL FRIENDS 2
   adventures/minirack.js

   Aventura: MINIRACK  |  Estado: PENDIENTE
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

window.ADVENTURE_DATA.MINIRACK = {

  // ── Metadatos ─────────────────────────────────────────────
  label: "MINIRACK",
  ready: false,            // ← cambiar a true cuando el contenido esté listo

  // ── Escenas ───────────────────────────────────────────────
  // MINIRACK reserva IDs 22–31
  // TODO: reemplazar bg con los nombres reales de imagen en BASE/
  scenes: [
    { id: 22, type: "NARRATIVE", bg: "./BASE/M2.jpg"  },  // TODO: nombre real
    { id: 23, type: "NARRATIVE", bg: "./BASE/M3.jpg"  },  // TODO: nombre real
    { id: 24, type: "NARRATIVE", bg: "./BASE/M4.jpg"  },  // TODO: nombre real
    { id: 25, type: "QUESTION",  bg: "./BASE/M5.jpg"  },  // TODO: nombre real
    { id: 26, type: "QUESTION",  bg: "./BASE/M6.jpg"  },  // TODO: nombre real
    { id: 27, type: "QUESTION",  bg: "./BASE/M7.jpg"  },  // TODO: nombre real
    { id: 28, type: "QUESTION",  bg: "./BASE/M8.jpg"  },  // TODO: nombre real
    { id: 29, type: "NARRATIVE", bg: "./BASE/M9.jpg"  },  // TODO: nombre real
    { id: 30, type: "NARRATIVE", bg: "./BASE/M10.jpg" },  // TODO: nombre real
    { id: 31, type: "FINAL",     bg: "./BASE/M11.jpg" }   // TODO: nombre real
  ],

  // ── Preguntas ─────────────────────────────────────────────
  // TODO: reemplazar TODO este bloque con las preguntas reales
  // Clave: "MINIRACK-{sceneId}"
  questions: {

    "MINIRACK-25": {
      questionId: "MINIRACK-25",
      text: "TODO: pregunta 1 de MINIRACK",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    },

    "MINIRACK-26": {
      questionId: "MINIRACK-26",
      text: "TODO: pregunta 2 de MINIRACK",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    },

    "MINIRACK-27": {
      questionId: "MINIRACK-27",
      text: "TODO: pregunta 3 de MINIRACK",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    },

    "MINIRACK-28": {
      questionId: "MINIRACK-28",
      text: "TODO: pregunta 4 de MINIRACK",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    }

  }
};

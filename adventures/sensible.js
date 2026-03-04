/* =============================================================
   DINET — LOYAL FRIENDS 2
   adventures/sensible.js

   Aventura: SENSIBLE  |  Estado: PENDIENTE
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

window.ADVENTURE_DATA.SENSIBLE = {

  // ── Metadatos ─────────────────────────────────────────────
  label: "SENSIBLE",
  ready: false,            // ← cambiar a true cuando el contenido esté listo

  // ── Escenas ───────────────────────────────────────────────
  // SENSIBLE reserva IDs 12–21
  // TODO: reemplazar bg con los nombres reales de imagen en BASE/
  scenes: [
    { id: 12, type: "NARRATIVE", bg: "./BASE/S2.jpg"  },  // TODO: nombre real
    { id: 13, type: "NARRATIVE", bg: "./BASE/S3.jpg"  },  // TODO: nombre real
    { id: 14, type: "NARRATIVE", bg: "./BASE/S4.jpg"  },  // TODO: nombre real
    { id: 15, type: "QUESTION",  bg: "./BASE/S5.jpg"  },  // TODO: nombre real
    { id: 16, type: "QUESTION",  bg: "./BASE/S6.jpg"  },  // TODO: nombre real
    { id: 17, type: "QUESTION",  bg: "./BASE/S7.jpg"  },  // TODO: nombre real
    { id: 18, type: "QUESTION",  bg: "./BASE/S8.jpg"  },  // TODO: nombre real
    { id: 19, type: "NARRATIVE", bg: "./BASE/S9.jpg"  },  // TODO: nombre real
    { id: 20, type: "NARRATIVE", bg: "./BASE/S10.jpg" },  // TODO: nombre real
    { id: 21, type: "FINAL",     bg: "./BASE/S11.jpg" }   // TODO: nombre real
  ],

  // ── Preguntas ─────────────────────────────────────────────
  // TODO: reemplazar TODO este bloque con las preguntas reales
  // Clave: "SENSIBLE-{sceneId}" — debe coincidir con el id de la escena QUESTION
  questions: {

    "SENSIBLE-15": {
      questionId: "SENSIBLE-15",
      text: "TODO: pregunta 1 de SENSIBLE",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    },

    "SENSIBLE-16": {
      questionId: "SENSIBLE-16",
      text: "TODO: pregunta 2 de SENSIBLE",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    },

    "SENSIBLE-17": {
      questionId: "SENSIBLE-17",
      text: "TODO: pregunta 3 de SENSIBLE",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    },

    "SENSIBLE-18": {
      questionId: "SENSIBLE-18",
      text: "TODO: pregunta 4 de SENSIBLE",
      options: [
        { id: "A", text: "TODO: opción A", points: 20 },
        { id: "B", text: "TODO: opción B", points: 20 },
        { id: "C", text: "TODO: opción C", points: 15 },
        { id: "D", text: "TODO: opción D", points: 10 }
      ]
    }

  }
};

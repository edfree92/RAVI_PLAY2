/* =============================================================
   DINET — LOYAL FRIENDS 2
   adventures/ecommerce.js

   Aventura: ECOMMERCE  |  Estado: ACTIVA
   Imágenes: BASE/4.1.jpg … BASE/4.11.jpg
   Audio:    BASE/ECOMMERCE.AUDIO.mp3
   IDs de escena: 32–42
   ─────────────────────────────────────────────────────────────
   Estructura de viñetas:
     32 → NARRATIVE_START  (solo SIGUIENTE)
     33 → NARRATIVE        (ATRÁS + SIGUIENTE)
     34 → NARRATIVE        (ATRÁS + SIGUIENTE)
     35 → QUESTION         (ATRÁS + RESPONDER)  ← Pregunta 1  (4.4)
     36 → NARRATIVE        (ATRÁS + SIGUIENTE)
     37 → QUESTION         (ATRÁS + RESPONDER)  ← Pregunta 2  (4.6)
     38 → NARRATIVE        (ATRÁS + SIGUIENTE)
     39 → QUESTION         (ATRÁS + RESPONDER)  ← Pregunta 3  (4.8)
     40 → QUESTION         (ATRÁS + RESPONDER)  ← Pregunta 4  (4.9)
     41 → NARRATIVE        (ATRÁS + SIGUIENTE)
     42 → FINAL_MENU       (ATRÁS + VER PUNTUACIÓN + REGRESAR AL MENÚ)
============================================================= */

window.ADVENTURE_DATA = window.ADVENTURE_DATA || {};

window.ADVENTURE_DATA.ECOMMERCE = {

  // ── Metadatos ─────────────────────────────────────────────
  label: "ECOMMERCE",
  ready: true,

  // ── Escenas ───────────────────────────────────────────────
  scenes: [
    { id: 32, type: "NARRATIVE_START", bg: "./BASE/4.1.jpg"  },
    { id: 33, type: "NARRATIVE",       bg: "./BASE/4.2.jpg"  },
    { id: 34, type: "NARRATIVE",       bg: "./BASE/4.3.jpg"  },
    { id: 35, type: "QUESTION",        bg: "./BASE/4.4.jpg"  },
    { id: 36, type: "NARRATIVE",       bg: "./BASE/4.5.jpg"  },
    { id: 37, type: "QUESTION",        bg: "./BASE/4.6.jpg"  },
    { id: 38, type: "NARRATIVE",       bg: "./BASE/4.7.jpg"  },
    { id: 39, type: "QUESTION",        bg: "./BASE/4.8.jpg"  },
    { id: 40, type: "QUESTION",        bg: "./BASE/4.9.jpg"  },
    { id: 41, type: "NARRATIVE",       bg: "./BASE/4.10.jpg" },
    { id: 42, type: "FINAL_MENU",      bg: "./BASE/4.11.jpg" }
  ],

  // ── Preguntas ─────────────────────────────────────────────
  questions: {

    "ECOMMERCE-35": {
      questionId: "ECOMMERCE-35",
      text: "¿Para qué sirve romper el prepack en ecommerce?",
      options: [
        { id: "A", text: "Poder guardar cada prenda en su ubicación de estantería",  points: 20 },
        { id: "B", text: "Separar prendas dañadas",                                  points: 10 },
        { id: "C", text: "Tener cada prenda embolsada de forma individual",          points: 20 },
        { id: "D", text: "Preparar la mercadería para despacho inmediato",           points: 15 }
      ]
    },

    "ECOMMERCE-37": {
      questionId: "ECOMMERCE-37",
      text: "¿Qué ocurre si una caja se almacena en una ubicación equivocada?",
      options: [
        { id: "A", text: "El sistema cree que la caja está en otro lugar", points: 20 },
        { id: "B", text: "El operario debe apagar su pocket",               points: 10 },
        { id: "C", text: "La caja se puede dañar",                         points: 15 },
        { id: "D", text: "El inventario del área se desordena",             points: 20 }
      ]
    },

    "ECOMMERCE-39": {
      questionId: "ECOMMERCE-39",
      text: "¿Para qué se usa el cartón dentro del proceso ecommerce?",
      options: [
        { id: "A", text: "Para saber de qué ubicación se debe picar el producto", points: 20 },
        { id: "B", text: "Para indicar la ruta de recepción",                     points: 10 },
        { id: "C", text: "Para indicar el peso del pedido",                       points: 15 },
        { id: "D", text: "Para identificar la nota de venta del pedido",          points: 20 }
      ]
    },

    "ECOMMERCE-40": {
      questionId: "ECOMMERCE-40",
      text: "¿Cuál es el objetivo del proceso de sorting en la zona VAS?",
      options: [
        { id: "A", text: "Registrar la salida de mercadería",                      points: 10 },
        { id: "B", text: "Separar pedidos simples de pedidos con varios productos", points: 20 },
        { id: "C", text: "Reunir los productos de un mismo pedido",                points: 20 },
        { id: "D", text: "Revisar si los productos están dañados",                 points: 15 }
      ]
    }

  }
};

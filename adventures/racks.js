/* =============================================================
   DINET — LOYAL FRIENDS 2
   adventures/racks.js

   Aventura: RACKS  |  Estado: ACTIVA
   Imágenes: BASE/2.jpg … BASE/11.jpg
   ─────────────────────────────────────────────────────────────
   INSTRUCCIONES PARA AGREGAR NUEVA AVENTURA:
     1. Copiar este archivo → adventures/nombre.js
     2. Cambiar la clave "RACKS" por "NOMBRE" (mayúsculas)
     3. Cambiar ready: true
     4. Reemplazar scenes con los IDs y rutas correctos
     5. Reemplazar questions con el contenido real
     6. Agregar <script src="./adventures/nombre.js"> en index.html
     → El botón del mapa se activa automáticamente. Nada más.
============================================================= */

window.ADVENTURE_DATA = window.ADVENTURE_DATA || {};

window.ADVENTURE_DATA.RACKS = {

  // ── Metadatos ─────────────────────────────────────────────
  label: "RACKS",          // texto que aparece en el botón del mapa
  ready: true,             // true = activa | false = "Próximamente"

  // ── Escenas ───────────────────────────────────────────────
  // IDs globales únicos — RACKS reserva 2–11
  // Tipos: NARRATIVE | QUESTION | FINAL
  scenes: [
    { id: 2,  type: "NARRATIVE", bg: "./BASE/2.jpg"  },
    { id: 3,  type: "NARRATIVE", bg: "./BASE/3.jpg"  },
    { id: 4,  type: "NARRATIVE", bg: "./BASE/4.jpg"  },
    { id: 5,  type: "QUESTION",  bg: "./BASE/5.jpg"  },
    { id: 6,  type: "QUESTION",  bg: "./BASE/6.jpg"  },
    { id: 7,  type: "QUESTION",  bg: "./BASE/7.jpg"  },
    { id: 8,  type: "QUESTION",  bg: "./BASE/8.jpg"  },
    { id: 9,  type: "NARRATIVE", bg: "./BASE/9.jpg"  },
    { id: 10, type: "NARRATIVE", bg: "./BASE/10.jpg" },
    { id: 11, type: "FINAL",     bg: "./BASE/11.jpg" }
  ],

  // ── Preguntas ─────────────────────────────────────────────
  // Clave: "RACKS-{sceneId}"
  // Puntaje: 2 opciones = 20 pts | 1 = 15 pts | 1 = 10 pts
  // Todas las opciones suman. No existe opción inválida.
  questions: {

    "RACKS-5": {
      questionId: "RACKS-5",
      text: "Detectas un pallet mal ubicado en rack alto. ¿Qué haces?",
      options: [
        { id: "A", text: "Reportar y señalizar inmediatamente",       points: 20 },
        { id: "B", text: "Coordinar con supervisor antes de moverlo", points: 20 },
        { id: "C", text: "Moverlo con ayuda sin registrar",           points: 15 },
        { id: "D", text: "Ignorarlo y continuar",                     points: 10 }
      ]
    },

    "RACKS-6": {
      questionId: "RACKS-6",
      text: "Encuentras diferencia en conteo físico vs sistema.",
      options: [
        { id: "A", text: "Recontar y validar ubicación",              points: 20 },
        { id: "B", text: "Revisar histórico en WMS antes de ajustar", points: 20 },
        { id: "C", text: "Ajustar manualmente sin validación",        points: 15 },
        { id: "D", text: "Postergarlo para otro turno",               points: 10 }
      ]
    },

    "RACKS-7": {
      questionId: "RACKS-7",
      text: "Se detecta daño en mercadería almacenada.",
      options: [
        { id: "A", text: "Segregar y registrar incidente",            points: 20 },
        { id: "B", text: "Coordinar con calidad y aislar lote",       points: 20 },
        { id: "C", text: "Reubicarlo sin informar",                   points: 15 },
        { id: "D", text: "Mantenerlo en posición",                    points: 10 }
      ]
    },

    "RACKS-8": {
      questionId: "RACKS-8",
      text: "Hay congestión en pasillo de picking.",
      options: [
        { id: "A", text: "Redistribuir flujo temporalmente",          points: 20 },
        { id: "B", text: "Aplicar protocolo de seguridad y orden",    points: 20 },
        { id: "C", text: "Esperar que se despeje solo",               points: 15 },
        { id: "D", text: "Ignorar y continuar trabajando",            points: 10 }
      ]
    }

  }
};

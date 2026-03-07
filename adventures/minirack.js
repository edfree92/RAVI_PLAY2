/* =============================================================
   DINET — LOYAL FRIENDS 2
   adventures/minirack.js

   Aventura: MINIRACK  |  Estado: ACTIVA
   Imágenes: BASE/2.1.jpg … BASE/2.9.jpg
   IDs de escena: 22–30
   ─────────────────────────────────────────────────────────────
   Estructura de viñetas:
     22 → NARRATIVE_START  (solo SIGUIENTE)
     23 → NARRATIVE        (ATRÁS + SIGUIENTE)
     24 → QUESTION         (ATRÁS + RESPONDER)
     25 → QUESTION         (ATRÁS + RESPONDER)
     26 → QUESTION         (ATRÁS + RESPONDER)
     27 → QUESTION         (ATRÁS + RESPONDER)
     28 → NARRATIVE        (ATRÁS + SIGUIENTE)
     29 → NARRATIVE        (ATRÁS + SIGUIENTE)
     30 → FINAL_MENU       (ATRÁS + VER PUNTUACIÓN + REGRESAR AL MENÚ)
============================================================= */

window.ADVENTURE_DATA = window.ADVENTURE_DATA || {};

window.ADVENTURE_DATA.MINIRACK = {

  // ── Metadatos ─────────────────────────────────────────────
  label: "MINIRACK",
  ready: true,

  // ── Escenas ───────────────────────────────────────────────
  scenes: [
    { id: 22, type: "NARRATIVE_START", bg: "./BASE/2.1.jpg" },
    { id: 23, type: "NARRATIVE",       bg: "./BASE/2.2.jpg" },
    { id: 24, type: "QUESTION",        bg: "./BASE/2.3.jpg" },
    { id: 25, type: "QUESTION",        bg: "./BASE/2.4.jpg" },
    { id: 26, type: "QUESTION",        bg: "./BASE/2.5.jpg" },
    { id: 27, type: "QUESTION",        bg: "./BASE/2.6.jpg" },
    { id: 28, type: "NARRATIVE",       bg: "./BASE/2.7.jpg" },
    { id: 29, type: "NARRATIVE",       bg: "./BASE/2.8.jpg" },
    { id: 30, type: "FINAL_MENU",      bg: "./BASE/2.9.jpg" }
  ],

  // ── Preguntas ─────────────────────────────────────────────
  // Clave: "MINIRACK-{sceneId}"
  questions: {

    "MINIRACK-24": {
      questionId: "MINIRACK-24",
      text: "Si las stockas empiezan a quedar en cualquier lugar del pasillo, ¿qué sería lo más adecuado hacer como equipo?",
      options: [
        { id: "A", text: "Recordar rápidamente a los compañeros dónde está el punto asignado y volver a ordenar las stockas.", points: 15 },
        { id: "B", text: "Proponer marcar claramente el punto de estacionamiento de stockas para que cualquier operario nuevo lo identifique fácilmente.", points: 20 },
        { id: "C", text: "Conversar entre el equipo del turno para acordar que las stockas siempre regresen al mismo lugar después de cada uso.", points: 20 },
        { id: "D", text: "Mover las stockas solo cuando estorben en el pasillo.", points: 10 }
      ]
    },

    "MINIRACK-25": {
      questionId: "MINIRACK-25",
      text: "Si los operarios no conocen cómo funciona la iluminación del área, ¿qué podría ayudar a evitar este problema?",
      options: [
        { id: "A", text: "Mostrar rápidamente dónde están los interruptores a los compañeros que recién llegan al área.", points: 15 },
        { id: "B", text: "Colocar señalización simple indicando dónde se activan las luces del pasillo.", points: 20 },
        { id: "C", text: "Durante el inicio del turno explicar brevemente cómo funciona la iluminación de cada zona del área.", points: 20 },
        { id: "D", text: "Trabajar con la iluminación de otros pasillos si alcanza.", points: 10 }
      ]
    },

    "MINIRACK-26": {
      questionId: "MINIRACK-26",
      text: "Si un operario nuevo no conoce cómo se organizan las divisiones del rack, ¿qué sería lo más útil para evitar errores de slotting?",
      options: [
        { id: "A", text: "Explicarle rápidamente cómo se distribuyen las divisiones antes de que continúe ubicando cajas.", points: 15 },
        { id: "B", text: "Mostrarle ejemplos de ubicaciones correctas para que identifique el patrón del área.", points: 20 },
        { id: "C", text: "Revisar juntos las etiquetas de las cajas y compararlas con las zonas del rack para que aprenda a identificarlas.", points: 20 },
        { id: "D", text: "Reordenar las cajas después cuando haya tiempo.", points: 10 }
      ]
    },

    "MINIRACK-27": {
      questionId: "MINIRACK-27",
      text: "Si un operario nuevo no identifica correctamente las dropzones, ¿qué podría ayudar a evitar estos errores?",
      options: [
        { id: "A", text: "Mostrarle cómo el Pocket indica la dropzone correcta antes de continuar el proceso.", points: 15 },
        { id: "B", text: "Explicarle cómo se diferencian las dropzones y qué destino tiene cada una.", points: 20 },
        { id: "C", text: "Revisar juntos las marcas del piso y la señalización para reconocer cada zona.", points: 20 },
        { id: "D", text: "Mover el pallet después cuando alguien lo note.", points: 10 }
      ]
    }

  }
};

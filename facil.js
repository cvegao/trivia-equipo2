$(document).ready(function () {
  $.getJSON("./facil.json", function (data) {
    escogerPreguntaAleatoria(data);
  }).fail(function () {
    console.log("An error has occurred.");
  });
});

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

var preguntas;
var pregunta;
var posibles_respuestas;
function escogerPregunta(n) {
  pregunta = preguntas[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;
  let pc = preguntas_correctas;
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
  } else {
    select_id("puntaje").innerHTML = "";
  }

  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);

  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "300px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
}
var npreguntas = [];

var preguntas_hechas = 0;
var preguntas_correctas = 0;

function escogerPreguntaAleatoria(arrPreguntas) {
  preguntas = arrPreguntas;
  let n = Math.floor(Math.random() * preguntas.length);
  // n = 0

  while (npreguntas.includes(n)) {
    n++;
    if (n >= preguntas.length) {
      n = 0;
    }
    if (npreguntas.length == preguntas.length) {
      npreguntas = [];
    }
  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

var btn_correspondiente = [
  select_id("btn1"), select_id("btn2"),
  select_id("btn3"), select_id("btn4")
];

function reiniciar() {
  for (let btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria(preguntas);
}

var suspender_botones = false;
function oprimir_btn(i) {
  if (suspender_botones) {
    return
  }
  suspender_botones = true
  if (posibles_respuestas[i] == pregunta.respuesta) {
    preguntas_correctas++;
    btn_correspondiente[i].style.background = "greenyellow";
  } else {
    btn_correspondiente[i].style.background = "tomato";
  }
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "greenyellow";
      break
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 3000);
};
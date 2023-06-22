// constantes de escenario
const COLUMNAS = 60
const FILAS = 40
const LADO = 20
const ANCHO_CANVAS = COLUMNAS * LADO
const ALTO_CANVAS = FILAS * LADO

// variables de escenario
let serpiente
let comida
let contadorComida
let textoInicio = true

// variables de control
let arriba
let derecha
let izquierda
let abajo

//variable sonido
let serpienteSound; //juegoNuevo
let mordidaSound; //alcanza la manzana
let juegoTerminadoSound; //juegoTerminado
let fondo;

function preload() {
  mordidaSound = loadSound("asser/manzana.mp3");
  serpienteSound = loadSound("asser/serpiente.mp3");
  juegoTerminadoSound = loadSound("asser/juegoTerminado.mp3");
  fondo = loadImage('asser/fondo2.png');
  myFont = loadFont('asser/DeValencia.ttf');
}

function setup() {
  frameRate(10)
  createCanvas(ANCHO_CANVAS, ALTO_CANVAS);
  serpiente = new Serpiente()
  posicionarComida()
  arriba = createVector(0, -1)
  abajo = createVector(0, 1)
  derecha = createVector(1, 0)
  izquierda = createVector(-1, 0)
  contadorComida = 0;
}

function draw() {
  textFont(myFont);
  background(fondo);
  textSize(20);
  fill(129, 9, 171);
  stroke(255);
  textAlign(RIGHT);
  text("Contador: " + contadorComida, width - 20, height - 20);
  noStroke();
  serpiente.dibujar()
  fill('red');
  rect(comida.x * LADO, comida.y * LADO, LADO, LADO)
  if (textoInicio) {
    textAlign(CENTER, CENTER);
    fill(12, 152, 255);
    textSize(90);
    stroke(255);
    strokeWeight(5);
    text("NUEVA PARTIDA", width / 2, (height / 2) - 40);
    noStroke();
    fill(255, 255, 255);
    textSize(35);
    textStyle(BOLD);
    text("\nMueve las flechas \narriba - abajo - izquierda - derecha \npara moverte", width / 2, (height / 2) + 70);
  }
  if (serpiente.posicion.dist(comida) == 0) {
    serpiente.tamaño++
    mordidaSound.play();
    contadorComida++
    posicionarComida()
  }
}

function keyPressed() {
  if (textoInicio) {
    textoInicio = !textoInicio;
    serpienteSound.play();

  }
  if (!isLooping()) {
    contadorComida=0;
    juegoNuevo()
  }
  switch (keyCode) {
    case UP_ARROW:
      if (serpiente.cola.length && serpiente.aceleracion == abajo) {
        break
      }
      serpiente.aceleracion = arriba
      break;
    case RIGHT_ARROW:
      if (serpiente.cola.length && serpiente.aceleracion == izquierda) {
        break
      }
      serpiente.aceleracion = derecha
      break;
    case DOWN_ARROW:
      if (serpiente.cola.length && serpiente.aceleracion == arriba) {
        break
      }
      serpiente.aceleracion = abajo
      break;
    case LEFT_ARROW:
      if (serpiente.cola.length && serpiente.aceleracion == derecha) {
        break
      }
      serpiente.aceleracion = izquierda
      break;
    default:
      break;
  }
}

function posicionarComida() {
  comida = createVector(
    int(random(COLUMNAS)),
    int(random(FILAS))
  )
}

function juegoNuevo() {
  serpiente = new Serpiente()
  serpienteSound.play();
  loop()
}

function juegoTerminado() {
  if (serpiente.sistemaDeChoques()) {
    textFont(myFont);
    textAlign(CENTER, CENTER);
    fill(12, 152, 255);
    textSize(90);
    stroke(255);
    strokeWeight(5);
    text("JUEGO TERMINADO", width / 2, height / 2)
    noStroke();
    fill(255, 255, 255);
    textSize(50);
    textStyle(BOLD);
    text("Puntuacion: " + contadorComida, width / 2, (height / 2) + 90)
    juegoTerminadoSound.play();
    noLoop()
  }
}

function Serpiente() {
  this.posicion = createVector(//serpiente aparece en el centro
    COLUMNAS / 2,
    FILAS / 2
  )
  this.aceleracion = createVector()
  this.cola = []
  this.tamaño = 0
  this.sistemaDeChoques = function () {
    if (this.posicion.x < 0 || this.posicion.y < 0) {
      return true
    }
    if (this.posicion.x >= COLUMNAS || this.posicion.y >= FILAS) {
      return true
    }
    for (const c of this.cola) {
      if (this.posicion.equals(c)) {
        return true
      }
    }
    return false
  }
  this.dibujar = function () {
    fill(129, 9, 171)
    rect(
      constrain(this.posicion.x, 0, COLUMNAS - 1) * LADO,
      constrain(this.posicion.y, 0, FILAS - 1) * LADO,
      LADO,
      LADO
    )
    for (const c of this.cola) {
      rect(
        constrain(c.x, 0, COLUMNAS - 1) * LADO,
        constrain(c.y, 0, FILAS - 1) * LADO,
        LADO,
        LADO
      )
    }

    juegoTerminado()
    this.cola.push(this.posicion.copy())
    if (this.cola.length > this.tamaño) {
      this.cola.splice(0, 1)
    }
    this.posicion.add(this.aceleracion)
  }
}
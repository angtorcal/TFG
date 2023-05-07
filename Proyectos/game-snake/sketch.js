// constantes de escenario
const COLUMNAS = 40
const FILAS = 30
const LADO = 20
const ANCHO_CANVAS = COLUMNAS * LADO
const ALTO_CANVAS = FILAS * LADO

// variables de escenario
let serpiente
let comida
let contadorComida
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
  mordidaSound = loadSound("libraries/manzana.mp3");
  serpienteSound = loadSound("libraries/serpiente.mp3");
  juegoTerminadoSound = loadSound("libraries/juegoTerminado.mp3");
  fondo = loadImage('libraries/fondo2.png');
}

function setup() {
  frameRate(10)
  canvas = createCanvas(ANCHO_CANVAS, ALTO_CANVAS)
  serpiente = new Serpiente()
  posicionarComida()
  arriba = createVector(0, -1)
  abajo = createVector(0, 1)
  derecha = createVector(1, 0)
  izquierda = createVector(-1, 0)
  serpienteSound.play();
  contadorComida =0;
}

function draw() {
  background(fondo);
  textSize(15);
  fill(0, 31, 255);
  textAlign(RIGHT);
  text("Contador: " + contadorComida,width-10, height-10);
  serpiente.dibujar()
  fill('red');
  rect(comida.x * LADO, comida.y * LADO, LADO, LADO)
  if (serpiente.posicion.dist(comida) == 0) {
    serpiente.tamaño++
    mordidaSound.play();
    contadorComida++
    posicionarComida()
  } 
}

function keyPressed() {
  if (!isLooping()) {
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
  loop()
}

function juegoTerminado() {
  if (serpiente.sistemaDeChoques()) {
    textAlign(CENTER, CENTER)
    textSize(70)
    fill(12, 152, 255);
    text("JUEGO TERMINADO", width / 2, height / 2)
    textSize(35)
    text("Puntuacion: "+ contadorComida, width / 2, (height / 2)+50)
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
    fill(185, 253, 191)
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

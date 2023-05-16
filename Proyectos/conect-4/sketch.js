const columnas = 7;
const filas = 6;
const anchoCelda = 100;
const anchoCirculo = 80;
const tablero = Array(6).fill().map(() => Array(7).fill(0));

let jugador = 1;
let posicionJugador;
let victoria = 0;

let textoInicio = true;
let spacePressed = false;
let stopped= false;
let seconds;
let startTime;
let elapsedTime;

function setup() {
  createCanvas(columnas * anchoCelda, filas * anchoCelda + anchoCelda);
}

function haGanado() {
  // Prueba horizontal
  for (let j = 0; j < filas; j++) {
    for (let i = 0; i <= columnas - 4; i++) {
      const prueba = tablero[j][i];
      if (prueba != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (tablero[j][i + k] !== prueba) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  // Prueba vertical
  for (let j = 0; j <= filas - 4; j++) {
    for (let i = 0; i < columnas; i++) {
      const prueba = tablero[j][i];
      if (prueba != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (tablero[j + k][i] !== prueba) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  // Prueba diagonal
  for (let j = 0; j <= filas - 4; j++) {
    for (let i = 0; i <= columnas - 4; i++) {
      const prueba = tablero[j][i];
      if (prueba != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (tablero[j + k][i + k] !== prueba) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  // Prueba antidiagonal
  for (let j = 0; j <= filas - 4; j++) {
    for (let i = 4; i < columnas; i++) {
      const prueba = tablero[j][i];
      if (prueba != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (tablero[j + k][i - k] !== prueba) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }

  return false;
}

function draw() {
  background(0, 58, 255);
  posicionJugador = floor(mouseX / anchoCelda)

  stroke(0);
  fill(255);
  rect(-1, -1, width + 2, anchoCelda);
  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < columnas; i++) {
      fill(255);
      if (tablero[j][i] == 1) {
        fill(255, 0, 62);
      } else if (tablero[j][i] == 2) {
        fill(255, 197, 0);
      }
      ellipse(i * anchoCelda + anchoCelda / 2, j * anchoCelda + 3 * anchoCelda / 2, anchoCirculo);
    }
  }

  stroke(102, 102, 0);
  for (let x = anchoCelda; x < width; x += anchoCelda) {
    line(x, anchoCelda, x, height);
  }

  stroke(0);
  if (jugador == 1) {
    fill(255, 0, 62);
  } else if (jugador == 2) {
    fill(255, 197, 0);
  }
  ellipse((posicionJugador + 0.5) * anchoCelda, anchoCelda / 2, anchoCirculo);
  noStroke();

  if (textoInicio) {
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    stroke(88, 0, 138);
    strokeWeight(4);

    fill(12, 152, 255);
    textSize(50);
    text("NUEVA PARTIDA", width / 2, (height / 2) - 40);

    fill(255, 0, 120);
    textSize(30);
    text("\nPULSA ESPACIO PARA EMPEZAR", width / 2, (height / 2) + 70);

    strokeWeight(0);
    noStroke();
  }
  if (!stopped) {
  // calcular el tiempo transcurrido desde el inicio
  elapsedTime = millis() - startTime;
  // convertir el tiempo transcurrido a segundos
  seconds = Math.floor(elapsedTime / 1000);
  fill(12, 152, 255);
  textSize(20);
  textStyle(BOLD);
  text(`${isNaN(seconds) ? 'TIEMPO: 0' : 'TIEMPO:' + seconds}`, 100, 30);
}
  if (victoria != 0) {
    stopped=true;
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    stroke(255);
    strokeWeight(5);
    fill(12, 152, 255);
    textSize(30);
    if (victoria == 3) {
      text("PARTIDO EMPATADO!", width / 2, anchoCelda / 2);
    } else if (victoria == 4) {
      text("PARTIDO TERMINADO!", width / 2, anchoCelda / 2);
    } else {
      text(`${victoria > 1 ? 'JUGADOR AMARILLO' : 'JUGADOR ROJO'} GANADOR!`, width / 2, anchoCelda / 2)
      fill(255, 0, 120);
      textSize(20);
      text("TIEMPO TOTAL: " + seconds, width / 2, (anchoCelda / 2) + 35);

    }
    noStroke();
    strokeWeight(0);
        noLoop();
  }

}

function keyPressed() {

  if (key === ' ') {
    if (textoInicio) {
      textoInicio = !textoInicio;
      // iniciar el cronómetro al presionar la tecla de espacio
      startTime = millis();
      spacePressed = true;
    }
  } 
}

function mousePressed() {
  if (spacePressed) {
    if (tablero[0][posicionJugador] != 0) {
      victoria = 4;
    }

    tablero[0][posicionJugador] = jugador;
    let i = 0;
    while (true) {
      if (i >= filas - 1) {
        break;
      }
      if (tablero[i + 1][posicionJugador] != 0) {
        break;
      }
      [tablero[i + 1][posicionJugador], tablero[i][posicionJugador]] = [tablero[i][posicionJugador], tablero[i + 1][posicionJugador]];
      i++;
    }

    if (haGanado()) {
      victoria = jugador;
    }

    let empate = true;
    for (let j = 0; j < filas; j++) outer: {
      for (let i = 0; i < columnas; i++) {
        if (tablero[j][i] == 0) {
          empate = false;
        }
      }
    }

    if (empate) {
      victoria = 3;
    }

    jugador = 3 - jugador;
  }
}
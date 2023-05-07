const columnas = 7;
const filas = 6;
const anchoCelda = 100;
const anchoCirculo = 80;
const tablero = Array(6).fill().map(() => Array(7).fill(0));

let jugador = 1;
let posicionJugador;
let victoria = 0;

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
  background(190, 229, 238);
  
  posicionJugador = floor(mouseX / anchoCelda)
  
  stroke(0);
  fill(255);
  rect(-1, -1, width + 2, anchoCelda);
  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < columnas; i++) {
      fill(255);
      if (tablero[j][i] == 1) {
        fill(150, 145, 237);
      } else if (tablero[j][i] == 2) {
        fill(242, 172, 235);
      }
      ellipse(i*anchoCelda + anchoCelda/2, j*anchoCelda + 3*anchoCelda/2, anchoCirculo);
    }
  }
  
  stroke(102, 102, 0);
  for (let x = anchoCelda; x < width; x += anchoCelda) {
    line(x, anchoCelda, x, height);
  }
  
  stroke(0);
  if (jugador == 1) {
    fill(150, 145, 237);
  } else if (jugador  == 2) {
    fill(242, 172, 235);
  }
  ellipse((posicionJugador + 0.5) * anchoCelda, anchoCelda/2, anchoCirculo);
  
  if (victoria != 0) {
    noStroke();
    fill(0);
    if (victoria == 1) {
      fill(150, 145, 237);
    } else if (victoria  == 2) {
      fill(242, 172, 235);
    }
    textAlign(CENTER, CENTER);
    textSize(64);
    if (victoria == 4) {
      text("¡Game Over!", width/2, anchoCelda/2);
    } else if (victoria == 3) {
      text("PARTIDO EMPATADO.", width/2, anchoCelda/2);
    } else {
      text(`${victoria > 1 ? 'ROSA' : 'LILA'} WON!`, width/2, anchoCelda/2);
    }
    noLoop();
  }
}

function mousePressed() {
  if (tablero[0][posicionJugador] != 0) {
    victoria = 4;
  }
  
  tablero[0][posicionJugador] = jugador;
  let i = 0;
  while (true) {
    if (i >= filas-1) {
      break;
    }
    if (tablero[i+1][posicionJugador] != 0) {
      break;
    }
    [tablero[i+1][posicionJugador], tablero[i][posicionJugador]] = [tablero[i][posicionJugador], tablero[i+1][posicionJugador]];
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
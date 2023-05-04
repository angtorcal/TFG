const cols = 7;
const rows = 6;
const w = 100;
const dw = 80;
const board = Array(6).fill().map(() => Array(7).fill(0));

let player = 1;
let playerPos;
let win = 0;

function setup() {
  createCanvas(cols*w, rows*w + w);
  
}

function hasWon() {
  // Test Horizontal
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i <= cols-4; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j][i+k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }
  
  // Test Vertical
  for (let j = 0; j <= rows-4; j++) {
    for (let i = 0; i < cols; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j+k][i] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }
  
  // Test Diagonal
  for (let j = 0; j <= rows-4; j++) {
    for (let i = 0; i <= cols-4; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j+k][i+k] !== test) {
            temp = false;
          }
        }
        if (temp == true) {
          return true;
        }
      }
    }
  }
  
  // Test Antidiagonal
  for (let j = 0; j <= rows-4; j++) {
    for (let i = 4; i < cols; i++) {
      const test = board[j][i];
      if (test != 0) {
        let temp = true;
        for (let k = 0; k < 4; k++) {
          if (board[j+k][i-k] !== test) {
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
  
  playerPos = floor(mouseX/w)
  
  stroke(0);
  fill(255);
  rect(-1, -1, width+2, w);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      fill(255);
      if (board[j][i] == 1) {
        fill(150, 145, 237);
      } else if (board[j][i] == 2) {
        fill(242, 172, 235);
      }
      ellipse(i*w + w/2, j*w + 3*w/2, dw);
    }
  }
  
  stroke(102, 102, 0);
  for (let x = w; x < width; x += w) {
    line(x, w, x, height);
  }
  
  stroke(0);
  if (player == 1) {
    fill(150, 145, 237);
  } else if (player  == 2) {
    fill(242, 172, 235);
  }
  ellipse((playerPos + 0.5) * w, w/2, dw);
  
  if (win != 0) {
    noStroke();
    fill(0);
    if (win == 1) {
      fill(150, 145, 237);
    } else if (win  == 2) {
      fill(242, 172, 235);
    }
    textAlign(CENTER, CENTER);
    textSize(64);
    if (win == 4) {
      text("Game Over!", width/2, w/2);
    } else if (win == 3) {
      text("It is a tie.", width/2, w/2);
    } else {
      text(`${win > 1 ? 'Pink' : 'Violet'} won!`, width/2, w/2);
    }
    noLoop();
  }
}

function mousePressed() {
  if (board[0][playerPos] != 0) {
    win = 4;
  }
  
  board[0][playerPos] = player;
  let i = 0;
  while (true) {
    if (i >= rows-1) {
      break;
    }
    if (board[i+1][playerPos] != 0) {
      break;
    }
    [board[i+1][playerPos], board[i][playerPos]] = [board[i][playerPos], board[i+1][playerPos]];
    i++;
  }
  
  if (hasWon()) {
    //console.log(`${player > 1 ? 'Red' : 'Blue'} won!`);
    win = player;
  }
  
  let tie = true;
  for (let j = 0; j < rows; j++) outer: {
    for (let i = 0; i < cols; i++) {
      if (board[j][i] == 0) {
        tie = false;
      }
    }
  }
  
  if (tie) {
    win = 3;
  }
  
  player = 3 - player;
}
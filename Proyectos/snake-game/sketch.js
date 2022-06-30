let x_snake = 350;
let y_snake = 300;
let dir = { dir_x_snake: 1, dir_y_snake: 0 };
let speedSnake = 3;
let actualSnakeFood = null;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  if (!actualSnakeFood) {
    actualSnakeFood = ramdomSnakeFood();

  }
  drawBorder();
  drawAxis();
  drawSnakeFood(actualSnakeFood);
  updatePlayer();
  drawPlayer(x_snake, y_snake)

}

function updatePlayer() { //movimiento constante de la serpiente
  if (x_snake > 0 && x_snake <= width) {// bucle horizontal
    x_snake = x_snake + dir.dir_x_snake * speedSnake;
  } else if (x_snake > width) {//salto de anchura a 0
    x_snake = 1;
  } else { //salto de 0 a anchura
    x_snake = width - 1;
  }
  y_snake = y_snake + dir.dir_y_snake * speedSnake;

  y_snake = constrain(y_snake, 50, height - 75)


  /* metodo mas largo
    if (dir_snake == 1) { //si tecla flecha derecha
    x_snake = x_snake + 1;
  } else if (dir_snake == -1) { //si tecla flecha izquierda
    x_snake = x_snake - 1;
  } else if (dir_snake == 0) { //si tecla flecha izquierda
    y_snake = y_snake - 1;
  } else if (dir_snake == 2) { //si tecla flecha izquierda
    y_snake = y_snake + 1;
  }
  */

}

function keyPressed() {
  //Almacena en una variable llamada keyCode la tecla que presionaste
  switch (keyCode) {

    case RIGHT_ARROW: //Mueve el personaje hacia a la derecha")
      x_snake += 1;
      dir = { dir_x_snake: 1, dir_y_snake: 0 }
      break;

    case LEFT_ARROW: //Mueve el personaje hacia a la izquierda")
      x_snake -= 1;
      dir = { dir_x_snake: -1, dir_y_snake: 0 }
      break;

    case UP_ARROW: //Mueve el personaje hacia arriba")
      y_snake -= 1;
      dir = { dir_x_snake: 0, dir_y_snake: -1 }
      break;

    case DOWN_ARROW: //Mueve el personaje hacia abajo")
      y_snake += 1;
      dir = { dir_x_snake: 0, dir_y_snake: 1 }
      break;

    default:
      break;
  }

}

function drawPlayer(x_snake, y_snake) {
  rect(x_snake, y_snake, 50, 50)
}

function drawBorder() { //dibuja los limites
  for (let i = 0; i < width; i += 50) {
    drawSnake(i, 0)
    drawSnake(i, height - 50)
  }
}

function drawSnake(x, y) {
  rect(x, y, 50, 50);
}

function ramdomSnakeFood() {
  return { x: random(0,width), y: random(0,height) }
}

function drawSnakeFood(food) {
  let rojo = color(255, 0, 0);
  fill(rojo);
  circle(food.x, food.y, 25);
  fill(255, 255, 255);

} function random(min, max) {
  return Math.random() * (max + 1 - min) + min;
}


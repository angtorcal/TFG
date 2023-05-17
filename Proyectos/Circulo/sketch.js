let x, y; // posición del círculo
let speedX, speedY; // velocidad del círculo
let myColour; // color del círculo

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  speedX = 5;
  speedY = 3;
  myColour = color(random(255),0, 255 );
}

function draw() {
  
  background(0, 139, 255);
  
  // mueve el círculo
  x += speedX*2;
  y += speedY*2;
  
  // cambia de dirección si llega al borde y cambia el color
  if (x > width || x < 0) {
    speedX *= -1;
      myColour = color(255, 0,random(255));
  }
  if (y > height || y < 0) {
    speedY *= -1;
      myColour = color(random(255), 255,0);
  }
  
  // calcula la distancia entre el mouse y el círculo
  let d = dist(x, y, mouseX, mouseY);
  
  // evita el puntero del mouse si está cerca del círculo
  if (d < 50) {
    let angle = atan2(y - mouseY, x - mouseX);
    speedX = cos(angle) * 5;
    speedY = sin(angle) * 5;
  }
  
  // dibuja el círculo con el nuevo color
  fill(myColour);
  ellipse(x, y, 90, 90);
}
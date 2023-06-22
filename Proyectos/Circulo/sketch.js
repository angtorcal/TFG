let x, y; // posición del círculo
let speedX, speedY; // velocidad del círculo
let myColour; // color del círculo
var colors = []; // Lista de colores
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  speedX = 5;
  speedY = 3;
  colors.push(color(255, 0, 0));        // Rojo
  colors.push(color(0, 255, 0));        // Verde
  colors.push(color(0, 0, 255));        // Azul
  colors.push(color(255, 255, 0));      // Amarillo
  colors.push(color(255, 0, 255));      // Magenta
  colors.push(color(0, 255, 255));      // Cian
  colors.push(color(255, 128, 0));      // Naranja
  colors.push(color(128, 0, 255));      // Violeta
  colors.push(color(255, 255, 255));    // Blanco
  colors.push(color(0, 0, 0));          // Negro
  colors.push(color(128, 128, 128));    // Gris
  colors.push(color(128, 0, 0));        // Marrón
  colors.push(color(0, 128, 0));        // Verde oscuro
  colors.push(color(0, 0, 128));        // Azul oscuro
  colors.push(color(128, 128, 0));      // Oliva
  colors.push(color(128, 0, 128));      // Púrpura
  colors.push(color(0, 128, 128));      // Turquesa
  myColour=random(colors);
}

function draw() {
  
  background(0, 139, 255);
  
  // mueve el círculo
  x += speedX*2;
  y += speedY*2;
  
  // cambia de dirección si llega al borde y cambia el color
  if (x > width || x < 0) {
    speedX *= -1;
    myColour=random(colors);
  }
  if (y > height || y < 0) {
    speedY *= -1;
    myColour=random(colors);
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
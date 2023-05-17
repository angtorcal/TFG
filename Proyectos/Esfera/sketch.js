let angle = 0;
let colorAngle = 0;
let sphereSize = 50;
let increaseSize=true;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(10);
  rotateY(angle);
  fill(getColor());
  sphere(sphereSize);
  angle += 0.01;
  if (increaseSize) {
    sphereSize += 0.1;
  }
}

function getColor() {
  colorMode(HSB, 360, 100, 100);
  let c = color(colorAngle % 360, 100, 100);
  colorAngle += 1;
  return c;
}

function mousePressed() {
  increaseSize=!increaseSize;
}
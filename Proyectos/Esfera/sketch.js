let angle = 0;
let colorAngle = 0;
let sphereSize = 50;

function setup() {
  createCanvas(1000, 1000, WEBGL);
}

function draw() {
  background(200);
  rotateY(angle);
  fill(getColor());
  sphere(sphereSize);
  angle += 0.01;
  sphereSize += 0.1;
}

function getColor() {
  colorMode(HSB, 360, 100, 100);
  let c = color(colorAngle % 360, 100, 100);
  colorAngle += 1;
  return c;
}
let angle = 0;

function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(200);
  rotateY(angle);
  sphere(50);
  angle += 0.01;
}

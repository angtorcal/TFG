let angle = 0;
let colorAngle = 0;
let sphereSize = 50;

function setup() {
  createCanvas(800, 800, WEBGL);

  // Crear un slider
  sliderGiro = createSlider(0, 1, 0.5, 0.1);
  sliderGiro.position(10, 10);

  sliderTam = createSlider(0, 1, 0.5, 0.1);
  sliderTam.position(10, 20);

  // Crear un botón
  button = createButton('Reiniciar');
  button.position(10, 70);
  button.mousePressed(resetSketch);
}

function draw() {
  background(200);
  rotateY(angle);
  fill(getColor());
  sphere(sphereSize);
  sphereSize += 0.1;
  // Cambiar el giro según el valor del slider
  var dim = slider.value();
  angle += dim;
  textAlign(LEFT);
  fill(0)
  text(dim, 10, 120)
  text(angle, 10, 160)

}

function getColor() {
  colorMode(HSB, 360, 100, 100);
  let c = color(colorAngle % 360, 100, 100);
  colorAngle += 1;
  return c;
}
function resetSketch() {
  // Restablecer los valores de los elementos de la GUI
  slider.value(50);
}
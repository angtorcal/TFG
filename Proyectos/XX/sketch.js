var slider;
var checkbox;
var button;

function setup() {
  createCanvas(400, 400);

  // Crear un slider
  slider = createSlider(0, 100, 50);
  slider.position(10, 10);

  // Crear un checkbox
  checkbox = createCheckbox('Fondo negro', false);
  checkbox.position(10, 40);

  // Crear un botón
  button = createButton('Reiniciar');
  button.position(10, 70);
  button.mousePressed(resetSketch);
}

function draw() {
  // Cambiar el color de fondo según el estado del checkbox
  if (checkbox.checked()) {
    background(0);
  } else {
    background(255);
  }

  // Cambiar el tamaño de la elipse según el valor del slider
  var diam = slider.value();
  ellipse(width/2, height/2, diam, diam);
}

function resetSketch() {
  // Restablecer los valores de los elementos de la GUI
  slider.value(50);
  checkbox.checked(false);
}

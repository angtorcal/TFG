var ratio = 2;
var sizeSlider;
var sizeDescription;

function setup() {
	createCanvas(windowWidth, windowHeight);

	// Crea la barra reguladora para la variable "size"
	sizeSlider = createSlider(10, 100, 30); // Valores mínimo, máximo y valor inicial
	sizeSlider.position(10, 20); // Posición de la barra reguladora
	sizeSlider.style('width', '200px'); // Ancho de la barra reguladora

	// Personaliza el diseño de la barra reguladora con CSS
	sizeSlider.style('background-color', '#FFFFFF');
	sizeSlider.style('height', '15px');
	sizeSlider.style('border-radius', '10px');
	sizeSlider.style('cursor', 'pointer');
	sizeSlider.style('appearance', 'none');

	// Crea un elemento de texto para la descripción de la variable "size"
	sizeDescription = createP('Size: ' + sizeSlider.value());
	sizeDescription.position(10, 10);
	sizeDescription.style('color', '#FFFFFF');
	sizeDescription.style('font-size', '30px');

	
	// Crea la barra reguladora para el color
	colorSlider = createSlider(0, 255, 128); // Valores mínimo, máximo y valor inicial
	colorSlider.position(10, 90); // Posición de la barra reguladora
	colorSlider.style('width', '200px'); // Ancho de la barra reguladora

	// Personaliza el diseño de la barra reguladora con CSS
	colorSlider.style('background-color', '#FFFFFF');
	colorSlider.style('height', '15px');
	colorSlider.style('border-radius', '10px');
	colorSlider.style('cursor', 'pointer');
	colorSlider.style('appearance', 'none');

	// Crea un elemento de texto para la descripción del color
	colorDescription = createP('Colour:');
	colorDescription.position(10, 80);
	colorDescription.style('color', '#FFFFFF');
	colorDescription.style('font-size', '30px');
}

function draw() {
	background(31, 0, 47);

	var colorValue = colorSlider.value(); // Obtiene el valor actual de la barra reguladora de color
	var size = sizeSlider.value(); // Obtiene el valor actual de la barra reguladora
	var offset = size * ratio;

	for (var x = 0; x <= width + size; x += size * 2) {
		for (var y = 0; y <= height + offset; y += offset) {
			var x0 = 0;
			if (y % (offset * 2) == 0) {
				fill(colorValue, 189, 172); // Usa el valor de la barra reguladora de color para el componente rojo
				x0 = size;
			} else {
				fill(colorValue, 74, 26); // Usa el valor de la barra reguladora de color para el componente rojo
				x0 = 0;
			}

			makeCircle(x + x0, y, size);
		}
	}

	// Actualiza la descripción de la variable "size"
	sizeDescription.html('Size: ' + size);
}

function makeCircle(a, b, size) {
	var diff =
		sin(radians(dist(a, b, width / 2, height / 2) - frameCount)) * (size * 2.5) / ratio;
	circle(a, b, size / ratio - diff);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

/* las notas midi de una escala

Do (C): 60
Re (D): 62
Mi (E): 64
Fa (F): 65
Sol (G): 67
La (A): 69
Si (B): 71*/
let notes = [60, 62, 64, 65, 67, 69];
let teclas = [65, 83, 68, 70, 71, 72];  // CORRESPONDE TAMBIEN AL VALOR DE LAS TECLAS a,s,d,f,g,h

// para tocar la canción de forma automática
let index = 0;

let melody = [
  { note: 0, duration: 500 },
  { note: 2, duration: 250 },
  { note: 4, duration: 250 },
  { note: 0, duration: 500 },
  { note: 4, duration: 250 },
  { note: 5, duration: 250 },
  { note: 4, duration: 500 }
];


let trigger = 0;
let autoplay = false;
let osc;
function preload() {
  myFont = loadFont('assets/BELL.TTF');//CHRISTMASDAY ITCEDSCR BRADHITC
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let button = createButton("Tocar la melodía automáticamente");
  button.position((width / 2) + 35, height-85);
  
  // Cambiar el tamaño del botón
   button.size(300, 50);
  
   // Cambiar el color del botón
   button.style("background-color", " #5b8373"); // Cambia el color de fondo a rojo
   button.style("color", "#ffffff"); // Cambia el color del texto a blanco
   button.style("font-size", "15px"); // Cambia el tamaño de la fuente del texto
   button.style("font-family", myFont); 
   button.style("border-radius","10px");
   button.style("cursor","pointer");

   
  //reproducción automática
  button.mousePressed(function () {
    if (!autoplay) {
      index = 0;
      autoplay = true;
    }
  });

  // un oscilador de onda triangular
  osc = new p5.TriOsc();
  // empezar en silencio
  osc.start();
  osc.amp(0);
}

// una función para tocar una nota
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // aparición gradual
  osc.fade(0.5, 0.2);

  // si definimos una duración, apagar gradualmente
  if (duration) {
    setTimeout(function () {
      osc.fade(0, 0.2);
    }, duration - 50);
  }
}

function draw() {
  background(174, 90, 50);
  // Si estamos tocando automáticamente y es tiempo de tocar la siguiente nota
  
  if (autoplay && millis() > trigger) {
    playNote(notes[melody[index].note], melody[index].duration);
    trigger = millis() + melody[index].duration;
    // ir a la siguiente nota
    index++;
    // cuando llegamos al final, dejar de tocar en automático
    if (index >= melody.length) {
      autoplay = false;
    }
  }
  textFont(myFont);
  fill(255);
  // Ajustar el tamaño de la fuente en función del ancho de la ventana
  let fontSize = width / 20;
  textSize(fontSize);
  stroke(255);
  text("P I A N O", (width / 2) + 80, height / 3);
  noStroke();
  fontSize = 20;
  textSize(fontSize);
  text("Presiona las teclas [ a, s, d, f, g, h ] \npara tocar las notas \n[ DO, RE, MI, FA, SOL, LA ].\n\n Pulsar el boton para reproducir \nla melodia automaticamente.", (width / 2) + 50, height / 2);
  // dibujar un teclado

  // el ancho de cada tecla
  let w = (width / 2) / notes.length;
  for (let i = 0; i < notes.length; i++) {
    let x = i * w;

    // si estamos tocando esta tecla, resaltamos
    if (keyIsDown(teclas[i])) {
      fill(186, 137, 109);
    } else {
      fill(254, 226, 191);
    }

    // si estamos tocando la canción, resaltemos
    if (autoplay && i === melody[index - 1].note) {
      fill(186, 137, 109);
    }

    // dibujar la tecla
    rect(x, 0, w - 1, height - 1);

  }
}

function keyPressed() {
  for (let i = 0; i < teclas.length; i++) {
    if (keyCode == teclas[i]) {
      playNote(notes[i]);
    }
  }
}

function keyReleased() {
  osc.fade(0, 0.5);

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
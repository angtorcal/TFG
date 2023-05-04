// las notas midi de una escala
let notes = [65, 83, 68, 70, 71, 72];  // CORRESPONDE TAMBIEN AL VALOR DE LAS TECLAS a,s,d,f,g,h

// para tocar la canción de forma automática
let index = 0;

let song = [
  { note: 4, duration: 400 },
  { note: 0, duration: 200 },
  { note: 1, duration: 200 },
  { note: 2, duration: 200 },
  { note: 3, duration: 200 },
  { note: 4, duration: 400 },
  { note: 0, duration: 400 },
  { note: 0, duration: 400 }
];


let trigger = 0;
let autoplay = false;
let osc;

function setup() {
  createCanvas(720, 400);
  let div = createDiv("Presiona las teclas del teclado para tocar las notas");
  div.id("instructions");
  let button = createButton("toca la canción automáticamente.");
  button.parent("instructions");
  // gatillar la reproducción automática
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
  // Si estamos tocando automáticamente y es tiempo de tocar la siguiente nota
  if (autoplay && millis() > trigger) {
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // ir a la siguiente nota
    index++;
    // cuando llegamos al final, dejar de tocar en automático
    if (index >= song.length) {
      autoplay = false;
    }
  }

  // dibujar un teclado
  // el ancho de cada tecla
  let w = width / notes.length;
  for (let i = 0; i < notes.length; i++) {
    let x = i * w;

    // si estamos tocando esta tecla, resaltamos
    if (keyIsDown(notes[i])) {
      fill(100, 255, 200);
    } else {
      fill(200);
    }
    // dibujar la tecla
    rect(x, 0, w - 1, height - 1);

    // si estamos tocando la canción, resaltemos
    if (autoplay && i === song[index - 1].note) {
      fill(100, 255, 200);
    }

    // dibujar la tecla
    rect(x, 0, w - 1, height - 1);

  }
  
}

function keyPressed() {
  if (keyCode == 65) {
    playNote(notes[0]);
  } else if (keyCode == 68) {
    playNote(notes[1]);
  } else if (keyCode == 70) {
    playNote(notes[2]);
  } else if (keyCode == 71) {
    playNote(notes[3]);
  } else if (keyCode == 72) {
    playNote(notes[4]);
  } else if (keyCode == 83) {
    playNote(notes[5]);
  }
}

function keyReleased() {
  osc.fade(0, 0.5);

}

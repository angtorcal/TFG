function setup() { 
   createCanvas(windowWidth, windowHeight);
   angleMode(DEGREES);
} 

function draw() { 
   init();
   drawHoursOrb();
   drawMinutesOrb();
   drawSecondsOrb();
   drawDigitalClock();
}

function preload() {
   myFont = loadFont('assets/GOUDYSTO.TTF'); // Ruta de la fuente de texto
}

function init() {
   background(17);
   translate(width / 2, height / 2); // Centra el reloj en el lienzo
   rotate(-90);
   noFill();
}

function drawSecondsOrb() {
   let endSecond = map(second(), 0, 60, 0, 360);
   strokeWeight(18);
   stroke(173, 255, 26); // Cambia el color de los segundos a verde (R: 150, G: 200, B: 50)
   arc(0, 0, 400, 400, 0, endSecond);
}

function drawMinutesOrb() {
   let endMinute = map(minute(), 0, 60, 0, 360);
   strokeWeight(22);
   stroke(233, 27, 188); // Cambia el color de los minutos a magenta (R: 200, G: 100, B: 200)
   arc(0, 0, 450, 450, 0, endMinute);
}

function drawHoursOrb() {
   let endHour = map(hour() % 12, 0, 12, 0, 360);
   strokeWeight(30);
   stroke(0, 139, 255); // Cambia el color de las horas a azul (R: 100, G: 150, B: 200)
   arc(0, 0, 570, 570, 0, endHour);
}

function drawDigitalClock() {
   noStroke();
   rotate(90);
   fill(255);
   textAlign(LEFT);
   textFont(myFont);
   textSize(30);
   let currentDate = day() + ' - ' + month() + ' - ' + year();
   text(currentDate, -75, 10);
   textAlign(CENTER);
   text("\n"+formatTime(hour()) + ':' + formatTime(minute()) + ':' + formatTime(second()), -75, 40);
}

function formatTime(time) {
   return (time < 10 ? '0' : '') + time;
}

function setup() { 
   createCanvas(400, 400);
   angleMode(DEGREES);
} 

function draw() { 
   init();
   drawHoursOrb();
   drawMinutesOrb();
   drawSecondsOrb();
   
   drawDigitalClock();
}

function init() {
   background(17);
   translate(200, 200);
   rotate(-90);
   noFill();
}

function drawSecondsOrb() {
   let endSecond = map(second(), 0, 60, 0, 360);
   strokeWeight(9);
   stroke(252, 68, 130);
   arc(0, 0, 220, 220, 0, endSecond);
}

function drawMinutesOrb() {
   let endMinute = map(minute(), 0, 60, 0, 360);
   strokeWeight(11);
   stroke(252, 214, 72);
   arc(0, 0, 250, 250, 0, endMinute);
}

function drawHoursOrb() {
   let endHour = map(hour() % 12, 0, 12, 0, 360);
   strokeWeight(15);
   stroke(0, 180, 170);
   arc(0, 0, 285, 285, 0, endHour);
}

function drawDigitalClock()
{
   noStroke();
   rotate(90);
   fill(120,120,120);
   textSize(15);
   text(formatTime(hour()) + ':' + formatTime(minute()) + ':' + formatTime(second()), -30, 5);
}

function formatTime(time) {
   return (time < 10 ? '0' : '') + time;
}
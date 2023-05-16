var scketch = function(p){

  var particleNum = 100;
  var particle;
  var particles = [];
  var pixels = [];
  var img;


  /*

  particleクラス
  --------------------------------------------------------*/
  var Particle = function(pos,v,d,c){
    this.p = pos;
    this.temp_p = this.p.copy();
    this.defaultPos = this.p.copy();
    this.v = v;
    this.a = p.createVector(0,0);
    this.d = d;
    this.r = d/2;
    this.color = c;
    this.mass = this.r;
    this.noise_x = p.random(1000);
    this.noise_y = p.random(1000);
  }
  Particle.prototype.addForce = function(f){
    this.a.add(f);
    //this.a.div(this.mass);
  }
  Particle.prototype.update = function(){
    this.v.add(this.a);
    this.p.add(this.v);
    this.a.mult(0);
  }
  Particle.prototype.walk = function(){
    this.noise_x += 0.01;
    this.noise_y += 0.01;
    var force = p.createVector(0,0);
    var to = p.createVector(p.noise(this.noise_x)*this.d*2-this.d,p.noise(this.noise_y)*this.d*2-this.d);
    this.temp_p = p5.Vector.add(this.p,to);
    var toTempPos = p5.Vector.sub(this.temp_p,this.p);
    force = p5.Vector.mult(toTempPos,0.12);
    this.addForce(force);
  }
  Particle.prototype.distract = function(){
    var radius = 140;
    var mouse = p.createVector(p.mouseX,p.mouseY);
    var dist = p5.Vector.dist(mouse,this.p);
    if(dist > 0 && dist < radius){
      var force = p.createVector(0,0);
      var toPos = p5.Vector.sub(this.p,mouse);
      var m = toPos.mag();
      toPos.normalize();
      toPos.mult(radius/Math.pow(m, 2) * 40);
      //toPos.mult(radius/m);
      toPos.limit(5);
      force = toPos;
      this.addForce(force);
    }
  }
  Particle.prototype.returnPos = function(){
    var maxspeed = 7;
    var maxforce = 3;
    var range = 60;
    var toDefault = p5.Vector.sub(this.defaultPos,this.p);
    var d = toDefault.mag();
    toDefault.normalize();
    if(d<range){
      var m = p.map(d,0,range,0,maxspeed);
      toDefault.mult(m);
    }else{
      toDefault.mult(maxspeed)
    }
    var steer = p5.Vector.sub(toDefault,this.v);
    steer.limit(maxforce);
    this.addForce(steer);
  }
  Particle.prototype.draw = function(){
    p.noStroke();
    //gradation
    // var grad  = p.drawingContext.createRadialGradient(this.p.x,this.p.y,0,this.p.x,this.p.y,this.r);
    // grad.addColorStop(1,'rgba(0, 0, 0, 0)');
    // grad.addColorStop(0,'rgba(' + this.color.levels[0] + ',' + this.color.levels[1] + ',' + this.color.levels[2] + ','+ this.color.levels[3] +')');
    // p.drawingContext.fillStyle = grad;
    p.fill(this.color);
    p.ellipse(this.p.x,this.p.y,this.d,this.d);
  }






  /*

  p5　フレームワーク
  --------------------------------------------------------*/
  p.setup = function(){
    p.createCanvas(p.windowWidth, p.windowHeight);
    //p.blendMode(p.ADD);
    p.background(255,255,234);

    init();

    //console.log(particles.length);

  }

  p.draw = function(){
    //p.clear();
    p.background(255,255,234);

    for(var i=0; i<particles.length; i++){
      particles[i].walk();
      particles[i].distract();
      particles[i].returnPos();
      particles[i].v.mult(0.8);
      particles[i].update();
      particles[i].draw();
    }

    //frame rate
    // p.fill(255);
    // p.textSize(18);
    // p.text('fps: '+ p.floor(p.frameRate(),10), 10, 30);

  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    particles = [];
    init();
  }



  function init(){

    var radius;
    if(p.windowWidth > p.windowHeight ){
      radius = p.windowHeight * 0.3;
    }else{
      radius = p.windowWidth * 0.3;
    }

    for(var i=0; i<particleNum; i++){
      var t = p.map(i,0,particleNum,0,p.TWO_PI);
      var x = p.cos(t) * (radius) + p.windowWidth/2;
      var y = p.sin(t) * (radius) + p.windowHeight/2;
      var pos = p.createVector(x,y);
      var randompos = p.createVector(p.random(-10,10),p.random(-10,10));
      pos.add(randompos);
      var v = p.createVector(0,0);
      var c = p.color(p.random(0,10),p.random(190,210),p.random(180,205),255);
      var size = p.random(4,20);
      var particle = new Particle(pos,v,size,c);
      particles.push(particle);
    }

  }



}




new p5(scketch);

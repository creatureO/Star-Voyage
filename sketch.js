let notes=['A','B','C','D','E','F','G'] //music elements
let octaves=['1','2','3','4','5','6','7']//music elements
let cols, rows;
let scale = 20;
let zoff = 0;
let particles = [];
let flowfield;

function preload(){
  bkg = loadImage('Home Page Space.jpg');
    img = loadImage('coin button.png');
  img2 = loadImage('module.png');
    img3 = loadImage('button 2.png');
   

}

function setup() {
  createCanvas(1920, 1600);
  //links
    // Create an anchor tag that links to p5js.org.
  // Open the link in a new tab.
  let a = createA('https://editor.p5js.org/creatureO/full/W6Ub6osi0', 'Celestial Angel');
  a.position(960, 860);
 ///// a.size(100)
  
  
     // Create an anchor tag that links to p5js.org.
  // Open the link in a new tab.
  let b = createA('https://editor.p5js.org/creatureO/full/AW4fx73fj', 'Terra Barnus');
  b.position(960, 960);
  
  
    // Create an anchor tag that links to p5js.org.
  // Open the link in a new tab.
  let c = createA('https://editor.p5js.org/creatureO/full/L-plZuQX0', 'Alien Fleet');
  c.position(960, 1060);
  
    // Create an anchor tag that links to p5js.org.
  // Open the link in a new tab.
  let d = createA('https://editor.p5js.org/creatureO/full/urlzTUYnf', 'WORM HOLE ANOMALY. EXLORE AT YOUR OWN RISK');
  d.position(960, 1160,600,300);
  
      // Create an anchor tag that links to p5js.org.
  // Open the link in a new tab.
  let e = createA('https://editor.p5js.org/creatureO/full/UkMG7wMhk', 'Astroid Belt');
  e.position(960, 1260);
  
  
   // Create an anchor tag that links to p5js.org.
  // Open the link in a new tab.
  let f = createA('https://editor.p5js.org/creatureO/full/T5VU3fgSw', 'Planet Marados');
  f.position(960, 1360);
  
  
  // Create an anchor tag that links to p5js.org.
  // Open the link in a new tab.
  let g = createA('https://editor.p5js.org/creatureO/full/v-4YXE7a9', 'Activate Hyper Drive!');
  g.position(780, 860);
  
  //links above
  
   cols = floor(width / scale);
  rows = floor(height / scale);
  flowfield = new Array(cols * rows);

  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
  
  background(bkg);  
   // Use CORNER mode.
  imageMode(CORNER);

  // Display the image.
  image(img, windowWidth/2.4, 240, 400, 400);
  //buttons
    rectMode(CENTER)
  image(img2, 890, 795, 250,150)
  image(img2, 890, 895, 250,150)
  image(img2, 890, 995, 250,150)
  image(img2, 750,1095, 800,150)
  image(img2, 890, 1195, 250,150)
  image(img2, 890, 1295, 250,150)
  image(img2, 700, 795, 290,150)

  
     // music elements
  synth = new Tone.PolySynth().toDestination();
  Tone.Transport.start();

  // Initialize the player and load the MP3 file
  player = new Tone.Player("super space sound.m4a").toDestination();
  player.loop = true; // Set the player to loop
  player.volume.value=-4
  player.autostart = true; // Start the player automatically
}







function draw() {
  ///vector stuff
   let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 10;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  zoff += 0.01;

  for (let particle of particles) {
    particle.follow(flowfield);
    particle.update();
    particle.show();
    particle.edges();
  }

  ///text
    fill(255,255,255);
    noStroke();
    textAlign(CENTER,CENTER);
   textSize(150);
 textFont('Alphacorsa');
    text("STAR VOYAGE ", width/2, 200);
  
  
    fill(255,255,255);
    noStroke();
    textAlign(CENTER,CENTER);
   textSize(70);
 textFont('Courier New');
    text("A Journey through the cosmos ", width/2, 650);
  
  
  fill(255,255,255);
    noStroke();
    textAlign(CENTER,CENTER);
   textSize(50);
 textFont('Courier New');
    text("Where would you like to visit first? ", width/2, 750);

}



class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 2;
    this.h = 0;
  }

  follow(vectors) {
    let x = floor(this.pos.x / scale);
    let y = floor(this.pos.y / scale);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    this.h = (this.h + 1) % 360;
    stroke(this.h, 255, 255, 55);
    strokeWeight(1);
    point(this.pos.x, this.pos.y);
  }
}


// music elements
function mousePressed() {
    // Create burst circles when the mouse is clicked
  let randomNote = notes[Math.floor(Math.random() * notes.length)];
  let randomOctave = octaves[Math.floor(Math.random() * octaves.length)];
  let note = randomNote+randomOctave
  synth.triggerAttackRelease(note, "8n", Tone.now());
}


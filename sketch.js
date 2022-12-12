let ghost = [];
let sounds = [];

function preload() {
  sounds.push(loadSound("A.mp3")); // [0]
  sounds.push(loadSound("C.mp3")); // [1]
  sounds.push(loadSound("G.mp3")); // [2]
  sounds.push(loadSound("I.mp3"));
  sounds.push(loadSound("M.mp3"));
}

function setup() {
  let canvas = createCanvas(500, 600);
  canvas.parent("canvasContainer");
  // generate an object by 3% chance per frame
  for (let i = 0; i < 5; i++) {
    let x = 70 + i * 90;
    let y = 200;
    ghost.push(new Ghost(x, y, sounds[i]));
  }
}

function keyPressed() {
  if (key == " ") {
    sounds[2].play();
  }
}
function draw() {
  background(0);

  // update and display the objects
  for (let i = 0; i < ghost.length; i++) {
    let b = ghost[i];
    b.checkMouse(); // ***
    b.display();
    textSize(35);
    fill(0, 102, 153, 60);
    text('A', 60, 300);
    text('C', 150, 300);
    text('G', 240, 300);
    text('I', 330, 300)
    text('M', 420, 300)
    text()
  }
}

class Ghost {
  constructor(x, y, snd) {
    this.sound = snd;
    this.x = x;
    this.y = y;
    this.w = 80;
    this.h = 120;
    //
    this.r = 255;
    this.g = 255;
    this.b = 255;
  }
  //***
  checkMouse() {
    if (
      mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2
    ) {
      // mouse is in the area
      this.r = 100;
      this.g = 149;
      this.b = 237;
      // update this.angle
      if (mouseIsPressed) {
        this.r = 147;
        this.g = 112;
        this.b = 219;
        // let's play sound here!
        if (this.sound.isPlaying() == false) {
          this.sound.play();
        }
      }
    } else {
      // mouse is out of the area
      this.r = 135;
      this.g = 206;
      this.b = 250;
    }
  }
  display() {
    push(); // for styling
    translate(this.x, this.y);
    //rotate(this.angle);
    // scale(1.0);

    fill(255, 195, 195);
    noStroke();
    rect(-10, -60, 30, 10);
    rect(-20, -50, 50, 10);
    rect(-30, -40, 70, 60);
    rect(-30, 20, 10, 10);
    rect(-10, 20, 10, 10);
    rect(10, 20, 10, 10);
    rect(30, 20, 10, 10);

    //Eyes
    fill(255);
    noStroke();
    rect(-25, -25, 20, 20);
    rect(15, -25, 20, 20);

    //Pupils
    fill(0);
    rect(-15, -15, 10, 10);
    rect(25, -15, 10, 10);

    fill(255, 0, 0, 100);

    //
    rectMode(CENTER);
    fill(this.r, this.g, this.b, 70);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

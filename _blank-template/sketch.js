let particles = [];
const gravity = .25;
const colors = ['red', 'orange', 'yellow', 'lime', 'cyan', 'magenta', 'white'];
let endColor;
function setup() {
  pixelDensity(1);
  endColor = color(64, 0);
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");

}
function mousePressed() {
  particles.push(new Firework(mouseX, height));
}

function draw() {
  background(0);
  rectMode(CENTER);

  //Ghost
  fill(255, 195, 195);
  noStroke();
  rect(mouseX - 0, mouseY - 60, 30, 10);
  rect(mouseX - 0, mouseY - 50, 50, 10);
  rect(mouseX - 0, mouseY - 15, 70, 60);
  rect(mouseX - 30, mouseY + 20, 10, 10);
  rect(mouseX - 10, mouseY + 20, 10, 10);
  rect(mouseX + 10, mouseY + 20, 10, 10);
  rect(mouseX + 30, mouseY + 20, 10, 10);

  //Eyes
  fill(255);
  noStroke();
  rect(mouseX - 20, mouseY - 20, 20, 20);
  rect(mouseX + 20, mouseY - 20, 20, 20);

  //Pupils
  fill(0);
  rect(mouseX - 15, mouseY - 15, 10, 10);
  rect(mouseX + 25, mouseY - 15, 10, 10);


  particles.forEach((p) => {
    p.step();
    p.draw();
  });
  particles = particles.filter((p) => p.isAlive);


}

class Particle {
  constructor(x, y, xSpeed, ySpeed, pColor, size) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = pColor;
    this.size = size;
    this.isAlive = true;
    this.trail = [];
    this.trailIndex = 0;
  }

  step() {
    this.trail[this.trailIndex] = createVector(this.x, this.y);
    this.trailIndex++;
    if (this.trailIndex > 10) {
      this.trailIndex = 0;
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.ySpeed += gravity;

    if (this.y > height) {
      this.isAlive = false;
    }
  }

  draw() {
    this.drawTrail();
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.size, this.size);

  }

  drawTrail() {
    let index = 0;

    for (let i = this.trailIndex - 1; i >= 0; i--) {
      const tColor = lerpColor(color(this.color), endColor,
        index / this.trail.length);
      fill(tColor);
      noStroke();
      rect(this.trail[i].x, this.trail[i].y, this.size, this.size);
      index++;
    }

    for (let i = this.trail.length - 1; i >= this.trailIndex; i--) {
      const tColor = lerpColor(color(this.color), endColor,
        index / this.trail.length);
      fill(tColor);
      noStroke();
      rect(this.trail[i].x, this.trail[i].y, this.size, this.size);
      index++;
    }
  }
}

class Firework extends Particle {
  constructor(x, y) {
    super(x, y, random(-2, 2), random(-10, -15),
      random(colors), 10);
    this.countdown = random(30, 60);
  }

  step() {
    super.step();

    this.countdown--;
    if (this.countdown <= 0) {
      const explosionSize = random(20, 50);
      for (let i = 0; i < explosionSize; i++) {

        const speed = random(5, 10);
        const angle = random(TWO_PI);
        const xSpeed = cos(angle) * speed;
        const ySpeed = sin(angle) * speed;

        particles.push(new Particle(this.x, this.y,
          xSpeed, ySpeed,
          this.color, 5
        ));
      }
      this.isAlive = false;
    }
  }
}
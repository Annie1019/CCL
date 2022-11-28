function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("canvasContainer");
    background(220);
}

function draw() {

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
}

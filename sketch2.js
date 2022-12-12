let whiteWid, blackWid;
let whites = [];
let blacks = [];
let r = 10;
let soundswhite = [];
let soundsblack = [];

function preload() {
    soundswhite.push(loadSound("sound/C1.mp3")); // [0]
    soundsblack.push(loadSound("sound/C1sharp.mp3")); // [1]
    soundswhite.push(loadSound("sound/D1.mp3")); // [2]
    soundsblack.push(loadSound("sound/D1sharp.mp3"));
    soundswhite.push(loadSound("sound/E1.mp3"));
    soundswhite.push(loadSound("sound/F1.mp3"));
    soundsblack.push(loadSound("sound/F1sharp.mp3"));
    soundswhite.push(loadSound("sound/G1.mp3"));
    soundsblack.push(loadSound("sound/G1sharp.mp3"));
    soundswhite.push(loadSound("sound/A1.mp3"));
    soundsblack.push(loadSound("sound/A1sharp.mp3"));
    soundswhite.push(loadSound("sound/B1.mp3"));
    soundswhite.push(loadSound("sound/C2.mp3"));
    soundsblack.push(loadSound("sound/C2sharp.mp3"));
    soundswhite.push(loadSound("sound/D2.mp3"));
    soundsblack.push(loadSound("sound/D2sharp.mp3"));
    soundswhite.push(loadSound("sound/E2.mp3"));
}

function setup() {
    let canvas = createCanvas(windowHeight * 2, windowHeight);
    canvas.parent("canvasContainer");
    whiteWid = width / 10;
    whiteLen = height;
    blackWid = whiteWid * 0.59;
    blackLen = whiteLen * 0.6;
    for (let i = 0; i < keyw.length; i++) whites.push(new WhiteKey(i));
    for (let i = 0; i < keyb.length; i++) blacks.push(new BlackKey(i));
}

function draw() {
    background(200);
    for (let i = 0; i < whites.length; i++) whites[i].show();
    for (let i = 0; i < blacks.length; i++) blacks[i].show();
}

function keyPressed() {
    for (let i in whites) {
        if (key == whites[i].key) {
            whites[i].pressed = true;
            soundswhite[i].play();
        }
    }
    for (let i in blacks) {
        if (key == blacks[i].key) {
            blacks[i].pressed = true;
            soundsblack[i].play();
        }
    }
}

function keyReleased() {
    for (let i in whites) {
        if (key == whites[i].key) whites[i].pressed = false;
    }
    for (let i in blacks) {
        if (key == blacks[i].key) blacks[i].pressed = true;
    }
}

let keyw = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
class WhiteKey {
    constructor(index, sndwhite) {
        this.x = whiteWid * index;
        this.y = 0;
        this.w = whiteWid;
        this.h = whiteLen;
        this.key = keyw[index];
        this.pressed = false;
        this.soundswhite = sndwhite;
    }
    show() {
        if (this.pressed) fill(200);
        else fill(255);
        stroke(0);
        strokeWeight(2);
        rect(this.x, this.y, this.w, this.h, 0, 0, r, r);
    }
}
let blackPattern = [1, 3, 6, 8, 10, 13, 15];
let keyb = ["s", "d", "g", "h", "j", "l", ";"];
class BlackKey {
    constructor(index, sndblack) {
        this.x = blackWid * blackPattern[index];
        this.y = 0;
        this.w = blackWid;
        this.h = blackLen;
        this.key = keyb[index];
        this.pressed = false;
        this.soundsblack = sndblack;
    }
    show() {
        if (this.pressed) fill(0);
        else fill(70);
        stroke(0);
        strokeWeight(2);
        rect(this.x, this.y, this.w, this.h, 0, 0, r, r);
    }
}

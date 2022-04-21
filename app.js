import { Background } from "./background.js";
import { Character } from "./character.js";
import { Floor } from "./floor.js";

// 화살표 키 입력 받기
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let spacePressed = false;

function keyDownHandler(e) {
  if (e.key == 37 || e.key == "ArrowRight" || e.key == "d") {
    rightPressed = true;
  } else if (e.key == 39 || e.key == "ArrowLeft" || e.key == "a") {
    leftPressed = true;
  } else if (e.key == 38 || e.key == "ArrowUp" || e.key == "w") {
    upPressed = true;
  } else if (e.key == 40 || e.key == "ArrowDown" || e.key == "s") {
    downPressed = true;
  } else if (e.key == " " || e.key == "SpaceBar") {
    spacePressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == 37 || e.key == "ArrowRight" || e.key == "d") {
    rightPressed = false;
  } else if (e.key == 39 || e.key == "ArrowLeft" || e.key == "a") {
    leftPressed = false;
  } else if (e.key == 38 || e.key == "ArrowUp" || e.key == "w") {
    upPressed = false;
  } else if (e.key == 40 || e.key == "ArrowDown" || e.key == "s") {
    downPressed = false;
  } else if (e.key == " " || e.key == "SpaceBar") {
    spacePressed = false;
  }
}

let backgroundImage;
let characterImage;
let characterImageFlipped;
let char_idle;
let char_idle_flipped;

function copyImageToCanvas() {
  backgroundImage = new Image();
  backgroundImage.src = "./img/test_map.jpg";

  char_idle_flipped = new Array();
  for (let i = 0; i < 4; i++) {
    char_idle_flipped[i] = new Image();
    char_idle_flipped[i].src =
      "./img/idle/char_idle_flipped" + (i + 1) + ".png";
  }

  char_idle = new Array();
  for (let i = 0; i < 4; i++) {
    char_idle[i] = new Image();
    char_idle[i].src = "./img/idle/char_idle" + (i + 1) + ".png";
  }

  console.log(char_idle);
}

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.character = new Character(
      this.stageWidth,
      this.stageHeight,
      60,
      100,
      3
    );

    this.floor = new Floor(this.stageWidth, this.stageHeight, 1000, 100);
    this.background = new Background(
      this.stageWidth,
      this.stageHeight,
      1200,
      3000
    );

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(
      -this.stageWidth,
      -this.stageHeight,
      this.stageWidth * 3,
      this.stageHeight * 3
    );

    this.background.draw(
      this.ctx,
      rightPressed,
      leftPressed,
      upPressed,
      downPressed,
      spacePressed,
      backgroundImage
    );

    // this.floor.draw(
    //   this.ctx,
    //   rightPressed,
    //   leftPressed,
    //   upPressed,
    //   downPressed,
    //   spacePressed
    // );

    this.character.draw(
      this.ctx,
      rightPressed,
      leftPressed,
      upPressed,
      downPressed,
      spacePressed,
      characterImage,
      characterImageFlipped,
      char_idle,
      char_idle_flipped,
      t
    );

    //testConsole
    // console.log(`${rightPressed}${leftPressed}${upPressed}${downPressed}`);
  }
}

window.onload = () => {
  copyImageToCanvas();
  new App();
};

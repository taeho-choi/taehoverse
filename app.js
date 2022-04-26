import { Background } from "./background.js";
import { Character } from "./character.js";
import { DefaultMap } from "./default_map.js";

// 화살표 키 입력 받기
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;

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
let char_idle;
let char_idle_flipped;
let char_walk;
let char_walk_flipped;
let char_jump;
let char_jump_flipped;
let test_tile;

function copyImageToCanvas() {
  backgroundImage = new Image();
  backgroundImage.src = "./img/test_map.jpg";

  char_idle = new Array();
  for (let i = 0; i < 4; i++) {
    char_idle[i] = new Image();
    char_idle[i].src = "./img/idle/char_idle" + (i + 1) + ".png";
  }
  char_idle_flipped = new Array();
  for (let i = 0; i < 4; i++) {
    char_idle_flipped[i] = new Image();
    char_idle_flipped[i].src =
      "./img/idle/char_idle_flipped" + (i + 1) + ".png";
  }

  char_walk = new Array();
  for (let i = 0; i < 4; i++) {
    char_walk[i] = new Image();
    char_walk[i].src = "./img/walk/char_walk" + (i + 1) + ".png";
  }
  char_walk_flipped = new Array();
  for (let i = 0; i < 4; i++) {
    char_walk_flipped[i] = new Image();
    char_walk_flipped[i].src =
      "./img/walk/char_walk_flipped" + (i + 1) + ".png";
  }

  char_jump = new Image();
  char_jump.src = "./img/jump/char_jump.png";
  char_jump_flipped = new Image();
  char_jump_flipped.src = "./img/jump/char_jump_flipped.png";

  test_tile = new Image();
  test_tile.src = "./img/test_tile1.png";
}

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.character = new Character(2560, 1080, 60, 100, 2.4);
    this.background = new Background(2560, 1080, 1200, 3000);
    this.default_map = new DefaultMap(2560, 1080);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = 2560;
    this.stageHeight = 1080;

    this.canvas.width = 2560;
    this.canvas.height = 1080;
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
    this.ctx.beginPath();

    this.background.draw(this.ctx, backgroundImage);

    this.default_map.draw(this.ctx, test_tile);

    this.character.draw(
      this.ctx,
      this.default_map.mapData,
      rightPressed,
      leftPressed,
      spacePressed,
      char_idle,
      char_idle_flipped,
      char_walk,
      char_walk_flipped,
      char_jump,
      char_jump_flipped,
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

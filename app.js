import { Ball } from "./ball.js";
import { Character } from "./character.js";

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

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 5);
    this.character = new Character(
      this.stageWidth,
      this.stageHeight,
      60,
      100,
      3
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

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    // this.ball.draw(this.ctx, this.stageWidth, this.stageHeight);
    this.character.draw(
      this.ctx,
      rightPressed,
      leftPressed,
      upPressed,
      downPressed,
      spacePressed
    );

    //testConsole
    // console.log(`${rightPressed}${leftPressed}${upPressed}${downPressed}`);
  }
}

window.onload = () => {
  new App();
};

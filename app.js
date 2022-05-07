import { Background } from "./background.js";
import { Character } from "./character.js";
import { Chat } from "./chat.js";
import { DefaultMap } from "./default_map.js";
import { Footer } from "./footer.js";
import { InfoModal } from "./info_modal.js";

// 화살표 키 입력 받기
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;

let spacePressed = false;
let enterPressed = false;

let players = {};
let playerId;

let chat;
let chatBoxTimer = 0;

let footer;

let dataLoaded = false;

function keyDownHandler(e) {
  if (e.key == 37 || e.key == "ArrowRight" || e.key == "d") {
    if (!chat.chatInputToggle) rightPressed = true;
  } else if (e.key == 39 || e.key == "ArrowLeft" || e.key == "a") {
    if (!chat.chatInputToggle) leftPressed = true;
  } else if (e.key == " " || e.key == "SpaceBar") {
    if (!chat.chatInputToggle) spacePressed = true;
  } else if (e.key == 13 || e.key == "Enter") {
    enterPressed = true;
    rightPressed = false;
    leftPressed = false;
    spacePressed = false;
  }
}

function keyUpHandler(e) {
  if (e.key == 37 || e.key == "ArrowRight" || e.key == "d") {
    if (!chat.chatInputToggle) rightPressed = false;
  } else if (e.key == 39 || e.key == "ArrowLeft" || e.key == "a") {
    if (!chat.chatInputToggle) leftPressed = false;
  } else if (e.key == " " || e.key == "SpaceBar") {
    if (!chat.chatInputToggle) spacePressed = false;
  }
}

let backgroundImage;
let char_idle;
let char_idle_flipped;
let char_walk;
let char_walk_flipped;
let char_jump;
let char_jump_flipped;
let test_bgm;
let test_jump;
let f_key;

let tiles;

function copyImageToCanvas() {
  backgroundImage = new Image();
  backgroundImage.src = "./img/test_map.jpg";

  char_idle = new Array();
  for (let i = 0; i < 2; i++) {
    char_idle[i] = new Image();
    char_idle[i].src = "./img/idle/char_idle" + (i + 1) + ".png";
    char_idle[i].width = "40";
    char_idle[i].height = "40";
  }
  char_idle_flipped = new Array();
  for (let i = 0; i < 2; i++) {
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

  f_key = new Image();
  f_key.src = "./img/f_key.png";

  test_bgm = new Audio();
  test_bgm.src = "./audio/test_bgm.mp3";
  test_bgm.volume = 0.2;

  test_jump = new Audio();
  test_jump.src = "./audio/test_jump.wav";
  test_jump.volume = 0.08;

  tiles = new Array();
  for (let i = 0; i < 4; i++) {
    tiles[i] = new Image();
    tiles[i].src = "./img/tiles/tile" + (i + 1) + ".png";
  }
}

class App {
  constructor() {
    Login();
    LoadPlayers();

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    chat = new Chat();
    footer = new Footer();
    this.infoModal = new InfoModal();
    this.character = new Character(2560, 1080, 60, 100, 2.8);
    this.background = new Background(2560, 1080, 1200, 3000);
    this.default_map = new DefaultMap(2560, 1080);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = 2560;
    this.stageHeight = 1080;

    this.canvas.width = 2560;
    this.canvas.height = 1080;
    this.ctx.scale(1, 1);
  }

  animate(t) {
    // 80 fps 제한
    let thisTarget = this;
    setTimeout(function () {
      window.requestAnimationFrame(thisTarget.animate.bind(thisTarget));
    }, 1000 / 80);

    if (!playerId) return;
    if (playerId && !dataLoaded) {
      dataLoaded = true;
      document.body.classList.add("on");
    }

    if (enterPressed) {
      chat.setChatInputToggle();
      enterPressed = false;
      chatBoxTimer = t;
    }
    if (chat.currentChat !== "" && t - chatBoxTimer > 5000) {
      chat.clearChatBox();
    }

    this.ctx.clearRect(
      -this.stageWidth,
      -this.stageHeight,
      this.stageWidth * 3,
      this.stageHeight * 3
    );
    this.ctx.beginPath();

    this.background.draw(this.ctx, backgroundImage, this.character);

    this.default_map.draw(this.ctx, tiles);

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
      f_key,
      t,
      playerId,
      players,
      this.default_map
    );

    //testConsole
    // console.log(`${rightPressed}${leftPressed}${upPressed}${downPressed}`);
  }
}

window.onload = () => {
  copyImageToCanvas();
  new App();
};

function Login() {
  firebase
    .auth()
    .signInAnonymously()
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

  firebase.auth().onAuthStateChanged((user) => {
    let playerRef;

    if (user) {
      // 로그인 됨
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);
      playerRef.set({
        id: playerId,
        name: user.uid.substr(0, 5),
        x: 658,
        y: -174,
        ani: "idle",
        flipY: false,
        chat: "",
      });

      chat.setPlayerId(user.uid);
      footer.changeNickname(user.uid, "임시닉네임");

      playerRef.onDisconnect().remove();
    } else {
      // 로그아웃 됨
    }
  });
}

function LoadPlayers() {
  const allPlayersRef = firebase.database().ref(`players`);

  // 데이터베이스 내의 값이 변경될 때마다 실행
  allPlayersRef.on("value", (snapshot) => {
    let snap = snapshot.val();
    Object.keys(players).forEach((key) => {
      players[key] = snap[key];
    });
  });

  // 플레이어 노드가 추가될 때마다 실행
  allPlayersRef.on("child_added", (snapshot) => {
    const addedPlayer = snapshot.val();
    players[addedPlayer.id] = addedPlayer;
  });

  allPlayersRef.on("child_removed", (snapShot) => {
    const removedPlayerId = snapShot.val().id;
    delete players[removedPlayerId];
  });
}

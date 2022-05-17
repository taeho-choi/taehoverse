import { Background } from "./background.js";
import { Character } from "./character.js";
import { Chat } from "./chat.js";
import { DefaultMap } from "./default_map.js";
import { Footer } from "./footer.js";
import { InfoModal } from "./info_modal.js";
import { Npc } from "./npc.js";

// 키보드 입력 받기
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
let f_key;
let taeho;
let notice;
let npc_idle;
let npc_idle_flipped;
let npc_walk;
let npc_walk_flipped;
let tiles;

////////////////////////////////////////////
///////         Image Load           ///////
////////////////////////////////////////////
function copyImageToCanvas() {
  backgroundImage = new Image();
  backgroundImage.src = "./img/test_map.png";

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

  tiles = new Array();
  for (let i = 0; i < 7; i++) {
    tiles[i] = new Image();
    tiles[i].src = "./img/tiles/tile" + (i + 1) + ".png";
  }

  taeho = new Array();
  for (let i = 0; i < 2; i++) {
    taeho[i] = new Image();
    taeho[i].src = "./img/taeho/taeho" + (i + 1) + ".png";
  }

  notice = new Array();
  for (let i = 0; i < 6; i++) {
    notice[i] = new Image();
    notice[i].src = "./img/notice/notice" + (i + 1) + ".png";
  }

  npc_idle = new Array();
  npc_idle_flipped = new Array();
  npc_walk = new Array();
  npc_walk_flipped = new Array();
  for (let i = 0; i < 3; i++) {
    npc_idle[i] = new Array();
    for (let j = 0; j < 2; j++) {
      npc_idle[i][j] = new Image();
      npc_idle[i][j].src =
        "./img/npc/npc" + (i + 1) + "_idle" + (j + 1) + ".png";
    }

    npc_idle_flipped[i] = new Array();
    for (let j = 0; j < 2; j++) {
      npc_idle_flipped[i][j] = new Image();
      npc_idle_flipped[i][j].src =
        "./img/npc/npc" + (i + 1) + "_idle_flipped" + (j + 1) + ".png";
    }

    npc_walk[i] = new Array();
    for (let j = 0; j < 4; j++) {
      npc_walk[i][j] = new Image();
      npc_walk[i][j].src =
        "./img/npc/npc" + (i + 1) + "_walk" + (j + 1) + ".png";
    }

    npc_walk_flipped[i] = new Array();
    for (let j = 0; j < 4; j++) {
      npc_walk_flipped[i][j] = new Image();
      npc_walk_flipped[i][j].src =
        "./img/npc/npc" + (i + 1) + "_walk_flipped" + (j + 1) + ".png";
    }
  }
}

class App {
  constructor() {
    Login();

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    chat = new Chat();
    footer = new Footer();
    this.infoModal = new InfoModal();
    this.character = new Character(2560, 60, 100, 3, this.infoModal);
    this.background = new Background(2560);
    this.default_map = new DefaultMap();
    this.npc = new Npc();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = 2560;
    this.stageHeight = 1080;

    this.canvas.width = 2560;
    this.canvas.height = 1080;
    this.ctx.scale(1, 1);
  }

  ////////////////////////////////////////////
  ///////             Draw             ///////
  ////////////////////////////////////////////
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

    this.default_map.draw(this.ctx, tiles, taeho, notice, t);

    this.npc.draw(
      this.ctx,
      npc_idle,
      npc_idle_flipped,
      npc_walk,
      npc_walk_flipped,
      t
    );

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
      ////////////////////////////////////////////
      ///////           Log in             ///////
      ////////////////////////////////////////////

      // 로그인 됨
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);
      playerRef.set({
        id: playerId,
        name: user.uid.substr(0, 5),
        x: 164,
        y: -150,
        ani: "idle",
        flipY: true,
        chat: "",
      });

      chat.setPlayerId(user.uid);
      footer.changeNickname(user.uid, "임시닉네임");

      playerRef.onDisconnect().remove();

      ////////////////////////////////////////////
      ///////       Load Players           ///////
      ////////////////////////////////////////////
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
    } else {
      // 로그아웃 됨
    }
  });
}

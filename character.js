let canInteract = 0;
let infoModal;

export class Character {
  constructor(stageWidth, width, height, speed, modal) {
    this.vx = speed;
    this.vy = speed;
    this.width = width;
    this.height = height;
    this.stageWidth = stageWidth;
    infoModal = modal;

    this.x = 240;
    this.y = -192;

    this.gravity = 0.001;
    this.isJumping = false;

    this.flipY = true;

    this.status = "idle";

    this.cameraPosX = 240;
    this.cameraPosY = -192;

    this.onPlatform = false;

    this.dataChangeFlag = false;

    this.chatTest = {};
    this.chatLogText = document.getElementsByClassName("chatLogText")[0];
    this.chatLogWrap = document.getElementsByClassName("chatLog")[0];

    window.addEventListener("keydown", function (e) {
      if (e.key == "f" && canInteract == 1) {
        infoModal.showInfoModal(infoModal.infoModal);
      } else if (e.key == "f" && canInteract == 2) {
        window.open("https://taeho-choi.github.io/taeho-choi-portfolio/");
      } else if (e.key == "f" && canInteract == 3) {
        window.open(
          "https://scented-handball-29f.notion.site/EMONG-HTML-CSS-JavaScript-React-Firebase-ca486d933dac4e11b1ed97273e7d4567"
        );
      } else if (e.key == "f" && canInteract == 4) {
        window.open(
          "https://scented-handball-29f.notion.site/C-Unreal-Engine-4-dfd31d06460d44c8b36ee432dcd1b26f"
        );
      } else if (e.key == "f" && canInteract == 5) {
        window.open(
          "https://scented-handball-29f.notion.site/C-OpenGL-8520875365524dc49bf1ceb4222c01bb"
        );
      } else if (e.key == "f" && canInteract == 6) {
        window.open(
          "https://scented-handball-29f.notion.site/Following-Cyborgs-C-OpenGL-ba44dade262d4f938bd8a3bd6d3ece08"
        );
      } else if (e.key == "f" && canInteract == 7) {
        window.open(
          "https://scented-handball-29f.notion.site/Let-s-Slice-Polygon-C-OpenGL-133a1eedfd15482ea75c886068654b6e"
        );
      } else if (e.key == "f" && canInteract == 8) {
        window.open("https://taeho-choi.github.io/taeho-choi-portfolio/");
      } else if (e.key == "f" && canInteract == 9) {
        window.open("https://github.com/taeho-choi");
      } else if (e.key == "f" && canInteract == 10) {
        window.open(
          "https://scented-handball-29f.notion.site/6b963aff505d4ec7bbbe060a35569258"
        );
      }
    });
  }

  draw(
    ctx,
    mapData,
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
    players
  ) {
    // 캐릭터 이동
    if (rightPressed && !leftPressed) {
      this.status = "walk";
      this.dataChangeFlag = true;
      if (this.x < 2712) {
        this.x += this.vx;

        // test_bgm.play();
      }
      if (!this.flipY) {
        this.flipY = true;
      }
    } else if (leftPressed && !rightPressed) {
      this.status = "walk";
      this.dataChangeFlag = true;
      if (this.x > 0) {
        this.x -= this.vx;
      }
      if (this.flipY) {
        this.flipY = false;
      }
    }

    // 중력 가속도
    if (this.gravity !== 0) {
      this.y += this.gravity;
      this.dataChangeFlag = true;
      this.gravity += 0.4;
    } else {
      this.gravity = 0;
    }

    // 점프
    if (spacePressed) {
      this.isJumping = true;
      this.onPlatform = false;
    }
    if (this.isJumping && this.gravity == 0) {
      // test_jump.play();

      this.isJumping = false;
      this.y -= this.vy;
      this.dataChangeFlag = true;
      this.gravity = -9;
    } else {
      this.isJumping = false;
    }
    if (this.gravity !== 0) {
      this.status = "jump";
      this.dataChangeFlag = true;
    }

    // 플랫폼에 서기
    if (!this.onPlatform) {
      if (
        mapData[parseInt(-(this.y - 30) / 100)][parseInt(this.x / 160)] >= 1 &&
        this.y > 8 + parseInt(-(this.y - 30) / 100) * -100 &&
        this.y < 46 + parseInt(-(this.y - 30) / 100) * -100 &&
        this.gravity > 0
      ) {
        this.y = 8 + parseInt(-(this.y - 30) / 100) * -100;
        this.dataChangeFlag = true;
        this.gravity = 0;
        this.onPlatform = true;
      }
    }
    if (this.onPlatform) {
      if (mapData[parseInt(-(this.y - 30) / 100)][parseInt(this.x / 160)] < 1) {
        this.gravity = 0.1;
        this.onPlatform = false;
      }
    }

    // idle일 경우 idle 애니메이션으로 바꿔주기
    if (
      !rightPressed &&
      !leftPressed &&
      this.gravity === 0 &&
      this.status !== "idle"
    ) {
      this.status = "idle";
      this.dataChangeFlag = true;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(this.stageWidth / 2, this.stageWidth / 4);

    // 시차 카메라 이동

    if (Math.abs(this.x - this.cameraPosX) > 1) {
      // console.log("X: " + this.x + "   CamX: " + this.cameraPosX);
      this.cameraPosX += (this.x - this.cameraPosX) / 30;
    }

    if (Math.abs(this.y - this.cameraPosY) > 1) {
      // console.log("X: " + this.x + "   CamX: " + this.cameraPosX);
      this.cameraPosY += (this.y - this.cameraPosY) / 30;
    }

    // 맵의 너비에 따라 cameraPosX 제한
    // if (this.cameraPosX < 1.01) {
    //   this.cameraPosX = 1.01;
    // } else if (this.cameraPosX > 20.98) {
    //   this.cameraPosX = 20.98;
    // }
    ctx.translate(-this.cameraPosX, -this.cameraPosY);

    // 캐릭터들 그리기
    Object.keys(players).forEach((key) => {
      // 캐릭터 그리기
      if (players[key].ani === "idle") {
        ctx.drawImage(
          !players[key].flipY
            ? char_idle[parseInt((t / 700) % 2)]
            : char_idle_flipped[parseInt((t / 700) % 2)],
          players[key].x,
          players[key].y
        );
      } else if (players[key].ani === "walk") {
        ctx.drawImage(
          !players[key].flipY
            ? char_walk[parseInt((t / 300) % 4)]
            : char_walk_flipped[parseInt((t / 300) % 4)],
          players[key].x,
          players[key].y
        );
      } else if (players[key].ani === "jump") {
        ctx.drawImage(
          !players[key].flipY ? char_jump : char_jump_flipped,
          players[key].x,
          players[key].y
        );
      }

      // 닉네임 그리기
      ctx.font = "bold 18px malgun gothic";
      ctx.fillStyle = "rgba(250, 250, 250, 1)";
      ctx.strokeStyle = "rgb(20, 20, 20)";
      ctx.lineWidth = 7;
      ctx.textAlign = "center";
      ctx.strokeText(
        players[key].name,
        players[key].x + char_jump.width / 2,
        players[key].y + 186
      );
      ctx.fillText(
        players[key].name,
        players[key].x + char_jump.width / 2,
        players[key].y + 186
      );

      // 말풍선 그리기
      ctx.font = "bold 24px malgun gothic";
      ctx.strokeStyle = "rgb(200, 200, 200)";
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.lineWidth = 4;
      ctx.textAlign = "center";
      ctx.strokeText(
        players[key].chat,
        players[key].x + char_jump.width / 2,
        players[key].y
      );
      ctx.font = "bold 24px malgun gothic";
      ctx.fillText(
        players[key].chat,
        players[key].x + char_jump.width / 2,
        players[key].y
      );

      if (this.chatTest[key] === undefined) {
        this.chatTest[key] = "";
      } else if (this.chatTest[key] !== players[key].chat) {
        if (players[key].chat !== "") {
          this.chatLogText.innerText += `\n${players[key].name} : ${players[key].chat}`;
          this.chatLogWrap.scrollTo(0, 99999);
        }
        this.chatTest[key] = players[key].chat;
      }
    });

    // 상호작용 가능한 요소에 가까이 있는지 판단
    if (
      mapData[parseInt(-(this.y - 30) / 100)][parseInt(this.x / 160)] >= 8 &&
      canInteract == 0
    ) {
      canInteract =
        mapData[parseInt(-(this.y - 30) / 100)][parseInt(this.x / 160)] - 7;
    }
    if (
      mapData[parseInt(-(this.y - 30) / 100)][parseInt(this.x / 160)] <= 7 &&
      canInteract != 0
    ) {
      canInteract = 0;
    }
    if (canInteract != 0) {
      ctx.drawImage(f_key, this.x - f_key.width / 2 - 0.5, this.y - 100);
    }

    if (this.dataChangeFlag) {
      ///////// 동기화 ////////////////////
      const playerRef = firebase.database().ref(`players/${playerId}`);
      playerRef.update({
        id: playerId,
        x: this.x - char_idle[0].width - 36,
        y: this.y - 58,
        ani: this.status,
        flipY: this.flipY,
      });
      /////////////////////////////////////
      this.dataChangeFlag = false;
    }

    //////////////////////////
    //     console test     //
    //////////////////////////

    // 캐릭터 포지션
    // console.log("posX: " + this.x + " // posY: " + this.y);

    // 중력
    // console.log("gravity: " + this.gravity);

    //맵 데이터
    // console.log("mapData: " + mapData);
  }
}

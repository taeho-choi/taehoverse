let canInteract = false;

window.addEventListener("keydown", function (e) {
  if (e.key == "f" && canInteract) {
    window.open("https://taeho-choi.github.io/taeho-choi-portfolio/");
  }
});

export class Character {
  constructor(stageWidth, stageHeight, width, height, speed) {
    this.vx = speed;
    this.vy = speed;
    this.width = width;
    this.height = height;
    this.stageHeight = stageHeight;
    this.stageWidth = stageWidth;

    this.x = 700;
    this.y = -192;

    this.gravity = 0.001;
    this.isJumping = false;

    this.flipY = false;

    this.status = "idle";

    this.cameraPosX = 700;
    this.cameraPosY = -192;

    this.onPlatform = false;

    this.dataChangeFlag = false;

    this.chatTest = {};
    this.chatLogText = document.getElementsByClassName("chatLogText")[0];
    this.chatLogWrap = document.getElementsByClassName("chatLog")[0];
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
    players,
    default_map
  ) {
    // 캐릭터 이동
    if (rightPressed && !leftPressed) {
      this.status = "walk";
      this.dataChangeFlag = true;
      if (this.x < 1167) {
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
        mapData[parseInt(-(this.y - 30) / 100)][parseInt(this.x / 90)] >= 1 &&
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
      if (mapData[parseInt(-(this.y - 30) / 100)][parseInt(this.x / 90)] < 1) {
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
    ctx.translate(this.stageWidth / 2, this.stageWidth / 5);

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
      ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
      ctx.lineWidth = 4;
      ctx.textAlign = "center";
      ctx.strokeText(
        players[key].name,
        players[key].x + char_jump.width / 2,
        players[key].y + 100
      );
      ctx.font = "bold 18px malgun gothic";
      ctx.fillText(
        players[key].name,
        players[key].x + char_jump.width / 2,
        players[key].y + 100
      );

      // 말풍선 그리기
      ctx.font = "bold 18px malgun gothic";
      ctx.strokeStyle = "rgb(200, 200, 200)";
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.lineWidth = 4;
      ctx.textAlign = "center";
      ctx.strokeText(
        players[key].chat,
        players[key].x + char_jump.width / 2,
        players[key].y
      );
      ctx.font = "bold 18px malgun gothic";
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
      mapData[parseInt(-(this.y - 30) / 100)][parseInt(this.x / 90)] >= 2 &&
      !canInteract
    ) {
      canInteract = true;
    }
    if (
      mapData[parseInt(-(this.y - 30) / 100)][parseInt(this.x / 90)] < 2 &&
      canInteract
    ) {
      canInteract = false;
    }
    if (canInteract) {
      ctx.drawImage(f_key, this.x - f_key.width / 2 - 1, this.y);
    }

    if (this.dataChangeFlag) {
      ///////// 동기화 ////////////////////
      const playerRef = firebase.database().ref(`players/${playerId}`);
      playerRef.update({
        id: playerId,
        x: this.x - char_idle[0].width - 2,
        y: this.y + 18,
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

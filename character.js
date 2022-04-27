export class Character {
  constructor(stageWidth, stageHeight, width, height, speed) {
    this.vx = speed;
    this.vy = speed;
    this.width = width;
    this.height = height;
    this.stageHeight = stageHeight;
    this.stageWidth = stageWidth;

    this.nickName = "최태호";

    this.x = 700;
    this.y = -300;

    this.gravity = 0.001;
    this.isJumping = false;

    this.flipY = false;

    this.status = "idle";

    this.cameraPosX = 700;
    this.cameraPosY = -300;

    this.onPlatform = false;

    this.dataChangeFlag = false;
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
    t,
    playerId,
    players
  ) {
    this.status = "idle";

    // 캐릭터 이동
    if (rightPressed && !leftPressed) {
      this.status = "walk";
      if (this.x < 1167) {
        this.x += this.vx;
        // test_bgm.play();
      }
      if (!this.flipY) {
        this.flipY = true;
      }
    } else if (leftPressed && !rightPressed) {
      this.status = "walk";
      if (this.x > 0) {
        this.x -= this.vx;
      }
      if (this.flipY) {
        this.flipY = false;
      }
    }

    // 중력 가속도
    if (this.gravity != 0) {
      this.y += this.gravity;
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
      this.gravity = -9;
    } else {
      this.isJumping = false;
    }
    if (this.gravity !== 0) {
      this.status = "jump";
    }

    // 플랫폼에 서기
    if (!this.onPlatform) {
      if (
        mapData[parseInt(-(this.y - 30) / 100)][parseInt(this.x / 90)] == 1 &&
        this.y > 8 + parseInt(-(this.y - 30) / 100) * -100 &&
        this.y < 30 + parseInt(-(this.y - 30) / 100) * -100 &&
        this.gravity > 0
      ) {
        this.y = 8 + parseInt(-(this.y - 30) / 100) * -100;
        this.gravity = 0;
        this.onPlatform = true;
      }
    }
    if (this.onPlatform) {
      if (mapData[parseInt(-(this.y - 30) / 100)][parseInt(this.x / 90)] != 1) {
        this.gravity = 0.1;
        this.onPlatform = false;
      }
    }

    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.translate(this.stageWidth / 4, this.stageWidth / 10);

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

    // 닉네임 그리기
    ctx.font = "bold 14px malgun gothic";
    ctx.fillStyle = "rgba(250, 250, 250, 1)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
    ctx.lineWidth = 4;
    ctx.textAlign = "center";
    ctx.strokeText(this.nickName, this.x, this.y + 116);
    ctx.font = "normal 14px malgun gothic";
    ctx.fillText(this.nickName, this.x, this.y + 116);

    // 캐릭터 그리기
    // if (this.status === "idle") {
    //   ctx.drawImage(
    //     !this.flipY
    //       ? char_idle[parseInt((t / 500) % 4)]
    //       : char_idle_flipped[parseInt((t / 500) % 4)],
    //     this.x - char_idle[parseInt((t / 500) % 4)].width / 2,
    //     this.y
    //   );
    // } else if (this.status === "walk") {
    //   ctx.drawImage(
    //     !this.flipY
    //       ? char_walk[parseInt((t / 300) % 4)]
    //       : char_walk_flipped[parseInt((t / 300) % 4)],
    //     this.x - char_walk[parseInt((t / 300) % 4)].width / 2,
    //     this.y
    //   );
    // } else if (this.status === "jump") {
    //   ctx.drawImage(
    //     !this.flipY ? char_jump : char_jump_flipped,
    //     this.x - char_jump.width / 2,
    //     this.y
    //   );
    // }

    ///////// 동기화 ////////////////////
    const playerRef = firebase.database().ref(`players/${playerId}`);
    playerRef.set({
      id: playerId,
      name: "Taeho",
      x: this.x - char_idle[0].width / 2,
      y: this.y,
      ani: this.status,
      flipY: this.flipY,
    });
    /////////////////////////////////////

    // 멀티플레이어 캐릭터 그리기
    Object.keys(players).forEach((key) => {
      if (players[key].ani === "idle") {
        ctx.drawImage(
          !players[key].flipY
            ? char_idle[parseInt((t / 500) % 4)]
            : char_idle_flipped[parseInt((t / 500) % 4)],
          players[key].x,
          players[key].y
        );
      } else if (players[key].ani === "walk") {
        ctx.drawImage(
          !players[key].flipY
            ? char_walk[parseInt((t / 500) % 4)]
            : char_walk_flipped[parseInt((t / 500) % 4)],
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
    });

    //////////////////////////
    //     console test     //
    //////////////////////////

    // 캐릭터 포지션
    // console.log("posX: " + this.x + " // posY: " + this.y);

    // 중력
    // console.log("gravity: " + this.gravity);

    // 맵 데이터
    // console.log("mapData: " + mapData);
  }
}

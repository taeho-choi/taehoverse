export class Character {
  constructor(stageWidth, stageHeight, width, height, speed) {
    this.vx = speed;
    this.vy = speed;
    this.width = width;
    this.height = height;
    this.stageHeight = stageHeight;
    this.stageWidth = stageWidth;

    this.x = stageWidth / 2 - this.width / 2;
    this.y = stageHeight / 2 - this.height / 2;

    this.gravity = 0;
    this.isJumping = false;

    this.flipY = false;

    this.status = "idle";
  }

  draw(
    ctx,
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
  ) {
    // 캐릭터 이동
    if (rightPressed && !leftPressed && this.x < this.stageWidth - this.width) {
      this.status = "walk";
      this.x += this.vx;
      if (!this.flipY) {
        this.flipY = true;
      }
    } else if (leftPressed && !rightPressed && this.x > 0) {
      this.status = "walk";
      this.x -= this.vx;
      if (this.flipY) {
        this.flipY = false;
      }
    } else {
      this.status = "idle";
    }

    // 중력 가속도
    if (this.y < this.stageHeight - this.height) {
      this.y += this.gravity;
      this.gravity += 0.6;
    } else {
      this.gravity = 0;
    }

    // 점프
    if (spacePressed) {
      this.isJumping = true;
    }
    if (this.isJumping && this.y === this.stageHeight - this.height) {
      this.isJumping = false;
      this.y -= this.vy;
      this.gravity = -9;
    } else {
      this.isJumping = false;
    }
    if (this.gravity !== 0) {
      this.status = "jump";
    }

    // 바닥으로 뚫지 않게
    if (this.y >= this.stageHeight - this.height) {
      this.y = this.stageHeight - this.height;
    }

    ctx.setTransform(3, 0, 0, 3, 0, 0);
    ctx.translate(this.stageWidth / 2 - this.width / 2, this.stageHeight * 0.7);

    ctx.translate(-this.x - 320, -1030);

    if (this.status === "idle") {
      ctx.drawImage(
        !this.flipY
          ? char_idle[parseInt((t / 500) % 4)]
          : char_idle_flipped[parseInt((t / 500) % 4)],
        this.x - char_idle[parseInt((t / 500) % 4)].width / 2,
        this.y
      );
    } else if (this.status === "walk") {
      ctx.drawImage(
        !this.flipY
          ? char_walk[parseInt((t / 300) % 4)]
          : char_walk_flipped[parseInt((t / 300) % 4)],
        this.x - char_walk[parseInt((t / 300) % 4)].width / 2,
        this.y
      );
    } else if (this.status === "jump") {
      ctx.drawImage(
        !this.flipY ? char_jump : char_jump_flipped,
        this.x - char_walk[parseInt((t / 300) % 4)].width / 2,
        this.y
      );
    }
  }
}

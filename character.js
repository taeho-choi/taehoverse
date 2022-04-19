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
  }

  draw(ctx, rightPressed, leftPressed, upPressed, downPressed, spacePressed) {
    // 캐릭터 이동
    if (rightPressed && !leftPressed && this.x < this.stageWidth - this.width) {
      this.x += this.vx;
    } else if (leftPressed && !rightPressed && this.x > 0) {
      this.x -= this.vx;
    }
    if (downPressed && !upPressed && this.y < this.stageHeight - this.height) {
      this.y += this.vy;
    } else if (upPressed && !downPressed && this.y > 0) {
      this.y -= this.vy;
    }

    // 중력 가속도
    if (this.y < this.stageHeight - this.height) {
      this.y += this.gravity;
      this.gravity += 0.75;
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
      this.gravity = -10;
    } else {
      this.isJumping = false;
    }

    console.log(this.isJumping);

    // 바닥으로 뚫지 않게
    if (this.y >= this.stageHeight - this.height) {
      this.y = this.stageHeight - this.height;
    }

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}
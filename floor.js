export class Floor {
  constructor(stageWidth, stageHeight, width, height) {
    this.width = width;
    this.height = height;
    this.stageHeight = stageHeight;
    this.stageWidth = stageWidth;

    this.x = stageWidth / 2 - this.width / 2;
    this.y = stageHeight - height;
  }

  draw(ctx, rightPressed, leftPressed, upPressed, downPressed, spacePressed) {
    ctx.fillStyle = "grey";
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}

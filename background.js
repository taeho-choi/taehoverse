export class Background {
  constructor(stageWidth, stageHeight, width, height) {
    this.width = width;
    this.height = height;
    this.stageHeight = stageHeight;
    this.stageWidth = stageWidth;

    this.x = stageWidth / 2 - this.width / 2;
    this.y = stageHeight - height;
  }

  draw(ctx, backgroundImage) {
    ctx.drawImage(backgroundImage, -this.stageWidth / 5, -this.stageWidth / 3);
    ctx.drawImage(
      backgroundImage,
      -this.stageWidth / 5 - 1920,
      -this.stageWidth / 3
    );
    ctx.drawImage(
      backgroundImage,
      -this.stageWidth / 5 + 1920,
      -this.stageWidth / 3
    );
  }
}

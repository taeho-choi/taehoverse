export class Background {
  constructor(stageWidth, stageHeight, width, height) {
    this.width = width;
    this.height = height;
    this.stageHeight = stageHeight;
    this.stageWidth = stageWidth;

    this.x = stageWidth / 2 - this.width / 2;
    this.y = stageHeight - height;
  }

  draw(ctx, backgroundImage, character) {
    ctx.drawImage(
      backgroundImage,
      -this.stageWidth / 2 + character.cameraPosX / 2,
      -this.stageWidth / 2 + character.cameraPosY / 2
    );
  }
}

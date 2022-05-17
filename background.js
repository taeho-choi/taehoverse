export class Background {
  constructor(stageWidth) {
    this.stageWidth = stageWidth;
  }

  draw(ctx, backgroundImage, character) {
    ctx.drawImage(
      backgroundImage,
      -this.stageWidth / 2 + character.cameraPosX / 2,
      -this.stageWidth / 2 + character.cameraPosY / 2
    );
  }
}

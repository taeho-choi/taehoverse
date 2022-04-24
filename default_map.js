export class DefaultMap {
  constructor(stageWidth, stageHeight) {
    this.stageHeight = stageHeight;
    this.stageWidth = stageWidth;

    this.x = 0;
    this.y = 0;
  }

  draw(ctx, test_tile) {
    ctx.drawImage(test_tile, -100, 92);
    ctx.drawImage(test_tile, -50, 92);
    ctx.drawImage(test_tile, 0, 92);
    ctx.drawImage(test_tile, 50, 92);
    ctx.drawImage(test_tile, 100, 92);
    ctx.drawImage(test_tile, 150, 92);
  }
}

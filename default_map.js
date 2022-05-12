export class DefaultMap {
  constructor(stageWidth, stageHeight) {
    this.stageHeight = stageHeight;
    this.stageWidth = stageWidth;

    this.x = 0;
    this.y = 0;

    this.mapData = [
      [6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 4, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 4, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  draw(ctx, tiles) {
    // 타일 지형 그리기
    for (let i = 0; i < this.mapData.length; i++) {
      for (let j = 0; j < this.mapData[i].length; j++) {
        if (this.mapData[i][j] >= 1) {
          ctx.drawImage(tiles[this.mapData[i][j] - 1], j * 160, -100 * i + 100);
        }
      }
    }
  }

  interact_2() {
    window.open("https://taeho-choi.github.io/taeho-choi-portfolio/", "_blank");
  }
}

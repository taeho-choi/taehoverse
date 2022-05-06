export class DefaultMap {
  constructor(stageWidth, stageHeight) {
    this.stageHeight = stageHeight;
    this.stageWidth = stageWidth;

    this.x = 0;
    this.y = 0;

    this.mapData = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 0, 1, 2, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  draw(ctx, test_tile) {
    // 타일 지형 그리기
    for (let i = 0; i < this.mapData.length; i++) {
      for (let j = 0; j < this.mapData[i].length; j++) {
        if (this.mapData[i][j] >= 1) {
          ctx.drawImage(test_tile, j * 90, -100 * i + 100);
        }
        if (this.mapData[i][j] == 2) {
          ctx.drawImage(test_tile, j * 90, -100 * i + 40);
        }
      }
    }
  }

  interact_2() {
    window.open("https://taeho-choi.github.io/taeho-choi-portfolio/", "_blank");
  }
}

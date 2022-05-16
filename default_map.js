export class DefaultMap {
  constructor(stageWidth, stageHeight) {
    this.stageHeight = stageHeight;
    this.stageWidth = stageWidth;

    this.x = 0;
    this.y = 0;

    this.mapData = [
      [6, 5, 5, 8, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 9, 1, 10, 1, 11, 1, 12, 1, 13, 1, 14, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  draw(ctx, tiles, taeho, notice, t) {
    for (let i = 0; i < this.mapData.length; i++) {
      for (let j = 0; j < this.mapData[i].length; j++) {
        // 타일 지형 그리기
        if (this.mapData[i][j] >= 1 && this.mapData[i][j] <= 7) {
          ctx.drawImage(tiles[this.mapData[i][j] - 1], j * 160, -100 * i + 100);
        }

        // 최태호 그리기
        if (this.mapData[i][j] == 8) {
          ctx.drawImage(tiles[4], j * 160, -100 * i + 100);
          ctx.drawImage(taeho[parseInt(t / 700) % 2], j * 160, -100 * i - 50);

          ctx.font = "bold 24px malgun gothic";
          ctx.fillStyle = "rgba(250, 250, 250, 1)";
          ctx.strokeStyle = "rgb(20, 20, 20)";
          ctx.lineWidth = 7;
          ctx.textAlign = "center";
          ctx.strokeText("최태호", j * 160 + 80, -100 * i - 50 + 186);
          ctx.font = "bold 24px malgun gothic";
          ctx.fillText("최태호", j * 160 + 80, -100 * i - 50 + 186);
        }

        // 와이어헌터 표지판 그리기
        if (this.mapData[i][j] > 8) {
          ctx.font = "bold 24px malgun gothic";
          ctx.lineWidth = 7;
          ctx.textAlign = "center";
          ctx.fillStyle = "rgb(250, 250, 250)";
          ctx.strokeStyle = "rgb(20, 20, 20)";

          if (this.mapData[i][j] == 9) {
            ctx.drawImage(tiles[2], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "와이어헌터", "UnrealEngine");
          } else if (this.mapData[i][j] == 10) {
            ctx.drawImage(tiles[0], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "폴리곤자르기", "OpenGL");
          } else if (this.mapData[i][j] == 11) {
            ctx.drawImage(tiles[0], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "사이보그", "OpenGL");
          } else if (this.mapData[i][j] == 12) {
            ctx.drawImage(tiles[0], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "444", "OpenGL");
          } else if (this.mapData[i][j] == 13) {
            ctx.drawImage(tiles[0], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "555", "OpenGL");
          } else if (this.mapData[i][j] == 14) {
            ctx.drawImage(tiles[3], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "666", "OpenGL");
          }

          ctx.drawImage(notice[this.mapData[i][j] - 9], j * 160, -100 * i - 50);
        }
      }
    }
  }

  drawName(ctx, i, j, name, info) {
    ctx.strokeText(name, j * 160 + 80, -100 * i - 50 + 186);
    ctx.fillText(name, j * 160 + 80, -100 * i - 50 + 186);
    ctx.fillStyle = "rgb(150, 150, 150)";
    ctx.strokeStyle = "rgb(70, 70, 70)";
    ctx.strokeText(info, j * 160 + 80, -100 * i - 50 + 216);
    ctx.fillText(info, j * 160 + 80, -100 * i - 50 + 216);
  }

  interact_2() {
    window.open("https://taeho-choi.github.io/taeho-choi-portfolio/", "_blank");
  }
}

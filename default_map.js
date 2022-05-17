export class DefaultMap {
  constructor() {
    this.mapData = [
      [6, 5, 5, 8, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 9, 1, 10, 1, 11, 1, 12, 1, 13, 1, 14, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 3, 1, 15, 1, 1, 16, 1, 1, 17, 1, 4, 0, 0, 0],
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

          this.drawName(ctx, i, j, "최태호", "도움말");
        }

        // 표지판 그리기
        if (this.mapData[i][j] > 8 && this.mapData[i][j] < 15) {
          if (this.mapData[i][j] == 9) {
            ctx.drawImage(tiles[2], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "태호버스", "HTML5 Canvas");
          } else if (this.mapData[i][j] == 10) {
            ctx.drawImage(tiles[0], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "EMONG", "React");
          } else if (this.mapData[i][j] == 11) {
            ctx.drawImage(tiles[0], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "와이어헌터", "UnrealEngine4");
          } else if (this.mapData[i][j] == 12) {
            ctx.drawImage(tiles[0], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "개스키", "OpenGL");
          } else if (this.mapData[i][j] == 13) {
            ctx.drawImage(tiles[0], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "FollowingCyborgs", "OpenGL");
          } else if (this.mapData[i][j] == 14) {
            ctx.drawImage(tiles[3], j * 160, -100 * i + 100);
            this.drawName(ctx, i, j, "LetsSlicePloygon", "OpenGL");
          }

          ctx.drawImage(notice[this.mapData[i][j] - 9], j * 160, -100 * i - 50);
        }

        // 링크들 그리기
        if (this.mapData[i][j] >= 15) {
          if (this.mapData[i][j] == 15) {
            ctx.drawImage(tiles[0], j * 160, -100 * i + 100);
            ctx.drawImage(taeho[parseInt(t / 700) % 2], j * 160, -100 * i - 50);
            this.drawName(ctx, i, j, "Website", "");
          } else if (this.mapData[i][j] == 16) {
            ctx.drawImage(tiles[0], j * 160, -100 * i + 100);
            ctx.drawImage(taeho[parseInt(t / 700) % 2], j * 160, -100 * i - 50);
            this.drawName(ctx, i, j, "GitHub", "");
          } else if (this.mapData[i][j] == 17) {
            ctx.drawImage(tiles[0], j * 160, -100 * i + 100);
            ctx.drawImage(taeho[parseInt(t / 700) % 2], j * 160, -100 * i - 50);
            this.drawName(ctx, i, j, "Notion", "");
          }
        }
      }
    }
  }

  drawName(ctx, i, j, name, info) {
    ctx.font = "bold 24px malgun gothic";
    ctx.lineWidth = 7;
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.strokeStyle = "rgb(20, 20, 20)";
    ctx.font = "bold 18px malgun gothic";
    ctx.strokeText(name, j * 160 + 80, -100 * i - 50 + 186);
    ctx.fillText(name, j * 160 + 80, -100 * i - 50 + 186);
    ctx.fillStyle = "rgb(250, 250, 50)";
    ctx.strokeStyle = "rgb(70, 70, 70)";
    ctx.strokeText(info, j * 160 + 80, -100 * i - 50 + 216);
    ctx.fillText(info, j * 160 + 80, -100 * i - 50 + 216);
  }
}

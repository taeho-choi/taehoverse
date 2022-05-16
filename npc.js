export class Npc {
  constructor() {
    this.npc = [
      {
        idx: 0,
        x: 200,
        y: -51,
        vx: 2,
        tempT: 0,
        isIdle: false,
      },
      {
        idx: 1,
        x: 1300,
        y: -51,
        vx: -2,
        tempT: 0,
        isIdle: false,
      },
      {
        idx: 2,
        x: 2000,
        y: -51,
        vx: 2,
        tempT: 0,
        isIdle: false,
      },
      {
        idx: 1,
        x: 1400,
        y: -351,
        vx: 2,
        tempT: 0,
        isIdle: false,
      },
      {
        idx: 1,
        x: 800,
        y: -651,
        vx: -2,
        tempT: 0,
        isIdle: false,
      },
    ];
  }

  draw(ctx, char_idle, char_idle_flipped, char_walk, char_walk_flipped, t) {
    for (let i = 0; i < this.npc.length; i++) {
      // NPC 이동 로직
      if (!this.npc[i].isIdle) {
        this.npc[i].x += this.npc[i].vx;

        if (this.npc[i].x > this.npc[i].idx * 700 + 1000) {
          this.npc[i].tempT = t;
          this.npc[i].isIdle = true;
        } else if (this.npc[i].x < this.npc[i].idx * 700) {
          this.npc[i].tempT = t;
          this.npc[i].isIdle = true;
        }
      }

      if (this.npc[i].isIdle && t - this.npc[i].tempT > 2000) {
        this.npc[i].isIdle = false;
        this.npc[i].vx *= -1;
      }

      // NPC 그리기
      ctx.font = "bold 24px malgun gothic";
      ctx.lineWidth = 7;
      ctx.textAlign = "center";
      ctx.fillStyle = "rgb(250, 250, 250)";
      ctx.strokeStyle = "rgb(20, 20, 20)";

      if (this.npc[i].isIdle) {
        if (this.npc[i].vx < 0) {
          ctx.drawImage(
            char_idle[parseInt((t / 700) % 2)],
            this.npc[i].x,
            this.npc[i].y
          );
        } else {
          ctx.drawImage(
            char_idle_flipped[parseInt((t / 700) % 2)],
            this.npc[i].x,
            this.npc[i].y
          );
        }
      } else {
        if (this.npc[i].vx < 0) {
          ctx.drawImage(
            char_walk[parseInt((t / 300) % 4)],
            this.npc[i].x,
            this.npc[i].y
          );
        } else {
          ctx.drawImage(
            char_walk_flipped[parseInt((t / 300) % 4)],
            this.npc[i].x,
            this.npc[i].y
          );
        }
      }
    }
  }
}

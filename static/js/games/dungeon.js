// ダンジョンゲーム
// https://www.youtube.com/watch?v=LtkTBJadWCc&feature=youtu.be
// 1.54秒の所で、中断。canvasの表示の仕方がよくわからないので、まずはcanvasを理解する。
"use strict";

const dungeon = () => {
  class Level {
    constructor() {
      this.tiles = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
      ];
      this.lenX = 20;
      this.lenY = 10;
    }
    tileAt(x, y) {
      if (x < 0 || x >= this.lenX || y < 0 || this.lenY) return 1;
      return this.tiles[y * this.lenX + x];
    }
  }

  // プレイヤーや敵キャラ等を表すクラス
  class Actor {
    constructor(x, y, image) {
      this.x = x;
      this.y = y;
      this.image = image;
    }
  }

  // ゲームの状態をまとめるクラス
  class Game {
    constructor() {
      this.level = new Level();
      this.player = null;
      this.actors = [];
    }
  }
  let game;

  function setup() {
    // ゲームの状態を初期化
    game = new Game();

    let player = new Actor(3, 2, "🐥");
    game.player = player;
    game.actors = [player];

    // キャンバスを作る
    createCanvas(480, 480);

    function draw() {
      // キャンバスを背景色で塗りつぶす
      background(240);
      // レベル（ダンジョンの1階層）を描画
      textAlign(LEFT, TOP);
      let w = 60;
      textSize(w);
      for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 20; x++) {
          let t = game.level.tileAt(x, y);
          if (t === 1) {
            text("🌳", w * x, w * y);
          }
        }
      }

      // アクター（主人公や敵キャラ等を描画）
      for (let actor of game.actors) {
        text(actor.image, w * actor.x, w * actor.y);
      }
    }
  }
};
dungeon();

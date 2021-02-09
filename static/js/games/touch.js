"use strict";

{
  class Panel {
    constructor(game) {
      this.game = game;
      this.el = document.createElement("li");
      this.el.classList.add("pressed");
      this.el.addEventListener("click", () => {
        this.check();
      });
    }

    getEl() {
      return this.el;
    }

    activate(num) {
      this.el.classList.remove("pressed");
      this.el.textContent = num;
    }

    check() {
      // parseIntで（10進数の）数値にする
      if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
        this.el.classList.add("pressed");
        this.game.addCurrentNum();

        if (this.game.addCurrentNum() === 4) {
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }
  }
  class Board {
    constructor(game) {
      this.game = game;
      this.panels = [];
      for (let i = 0; i < 4; i++) {
        this.panels.push(new Panel(this.game));
      }
      this.setup();
    }

    setup() {
      const board = document.getElementById("touch-board");
      this.panels.forEach((panel) => {
        // クラスのプロパティに外部から直接指定するのは避けた方が良いとされているので、
        // メソッド経由で呼び出す。（=オブジェクト思考のカプセル化）
        board.appendChild(panel.getEl());
      });
    }

    activate() {
      const nums = [0, 1, 2, 3];

      this.panels.forEach((panel) => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      });
    }
  }

  class Game {
    constructor() {
      // Gameクラスのプロパティにするために、consやletとして定義ではなく、thisとして継承する。
      this.board = new Board(this);

      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;

      // このボタンは他のメソッドでは使わないので、constのままで良い。
      const btn = document.getElementById("touch-btn");
      btn.addEventListener("click", () => {
        this.start();
      });
    }

    // クラスを継承したプロパティやメソッドにはthisをつける必要がある。
    start() {
      if (typeof this.timeoutId !== "undefined") {
        clearTimeout(timeoutId);
      }

      this.currentNum = 0;
      this.board.activate();

      this.startTime = Date.now();
      this.runTimer();
    }

    runTimer() {
      const timer = document.getElementById("touch-timer");
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);

      // 10ms後に呼び出す
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }

    addCurrentNum() {
      this.currentNum++;
    }

    getCurrentNum() {
      return this.currentNum;
    }

    getTimeoutId() {
      return this.timeoutId;
    }
  }

  new Game();
}

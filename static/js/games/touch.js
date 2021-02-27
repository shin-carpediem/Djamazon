"use strict";

const touch = () => {
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

        if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
          // ゲーム結果に応じてポイント操作をするクラスを呼び出す
          const spendTime = (
            (Date.now() - this.game.getStartTime()) /
            1000
          ).toFixed(2);
          if (spendTime <= 30) {
            if (changelevelElem.value == 1) {
              setPoint(100);
            } else if (changelevelElem.value == 2) {
              setPoint(300);
            } else if (changelevelElem.value == 3) {
              setPoint(800);
            } else if (changelevelElem.value == 4) {
              setPoint(1000);
            } else {
              setPoint(2000);
            }
          } else {
            if (changelevelElem.value == 1) {
              setPoint(-300);
            } else if (changelevelElem.value == 2) {
              setPoint(-400);
            } else if (changelevelElem.value == 3) {
              setPoint(-500);
            } else if (changelevelElem.value == 4) {
              setPoint(-800);
            } else {
              setPoint(-2000);
            }
          }
          setTimeout(sendPoint, 2000);

          clearTimeout(this.game.getTimeoutId());
        }
      }
    }
  }
  class Board {
    constructor(game) {
      this.game = game;
      this.panels = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
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
      const nums = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        nums.push(i);
      }

      this.panels.forEach((panel) => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      });
    }
  }

  class Game {
    constructor(level) {
      // Gameクラスのプロパティにするために、constやletとして定義ではなく、thisとして継承する。
      this.level = level;
      this.board = new Board(this);

      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;

      // このボタンは他のメソッドでは使わないので、constのままで良い。
      const btn = document.getElementById("touch-btn");
      btn.addEventListener("click", () => {
        this.start();
      });
      this.setup();
    }

    // クラスを継承したプロパティやメソッドにはthisをつける必要がある。
    setup() {
      const touch_area = document.getElementById("touch-area");
      const PANEL_WIDTH = 50;
      const BOARD_PADDING = 10;
      // 50px * 2 + 10px * 2
      touch_area.style.width =
        PANEL_WIDTH * this.level + BOARD_PADDING * 2 + "px";
    }

    start() {
      if (typeof this.timeoutId !== "undefined") {
        clearTimeout(this.timeoutId);
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

    getStartTime() {
      return this.startTime;
    }

    getTimeoutId() {
      return this.timeoutId;
    }

    getLevel() {
      return this.level;
    }
  }

  // https://code-kitchen.dev/html/input-range/
  // ⓪要素を取得
  const touchPoint = document.getElementById("touch_point");
  const touchPointBtn = document.getElementById("touch_point_btn");
  const changelevelElem = document.getElementById("changeLevel");
  const currentValueElem = document.getElementById("current-value");

  let randomNum = Math.floor(Math.random() * 5 + 1);
  new Game(randomNum);

  // α：かかった時間に応じてポイントをinput要素に入れる
  const setPoint = (po) => {
    touchPoint.value = po;
  };

  // β：view.pyに値を返す
  const sendPoint = (e) => {
    touchPointBtn.click(e);
  };

  // ①現在のレベルをレベル表示箇所に埋め込む関数
  const setCurrentValue = (val) => {
    currentValueElem.innerText = val;
  };

  // ①②をターゲットのvalueに応じて実行する関数
  const rangeOnChange = (e) => {
    setCurrentValue(e.target.value);
  };

  // スライダー変化時に②を発火
  window.onload = () => {
    changelevelElem.addEventListener("input", rangeOnChange);
    setCurrentValue(randomNum);
    changelevelElem.value = randomNum;
  };
};
touch();

"use strict";

// returnは関数にしか使えないので、以下を即時関数にする
(() => {
  // ⓪：要素を取得
  const changelevelElem = document.getElementById("pingpongChangeLevel");
  const currentValueElem = document.getElementById("pingpong-current-value");

  // ①：現在のレベルをレベル表示箇所に埋め込む関数
  function setCurrentValue(val) {
    currentValueElem.innerText = val;
  }

  // ②：①をターゲットのvalueの値に応じて実行
  function rangeOnChange(e) {
    setCurrentValue(e.target.value);
  }

  // ④ウィンドウ読み込み完了時に発火
  window.onload = () => {
    changelevelElem.addEventListener("input", rangeOnChange);
    setCurrentValue(randomNum);
    changelevelElem.value = randomNum;
  };

  // ゲームレベルをランダム設定させる
  let randomNum = Math.floor(Math.random() * 5 + 1);

  // ボールが生成される位置や速度をランダムにする。Ballクラスや他のクラスとも関係ないので、ユーティリティとして一番上に置いとく
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Ball {
    constructor(canvas) {
      this.range = randomNum;
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.x = rand(30, 250);
      this.y = 30;
      this.r = 10;
      this.vx = rand(3, 5) * (Math.random() < 0.5 ? 1 : -1); //0.5より小さかったら1、そうではなかったら-1の50%にする
      this.vy = rand(3, 5);
      this.isMissed = false;

      this.changeLevel(this.range);
    }

    // ゲームレベルを変える関数
    changeLevel() {
      console.log(this.range);
      if (this.range == 1) {
        this.vx = this.vx;
        this.vy = this.vy;
      } else if (this.range == 2) {
        this.vx = rand(4, 6);
        this.vy = rand(4, 6);
      } else if (this.range == 3) {
        this.vx = rand(5, 7);
        this.vy = rand(5, 7);
      } else if (this.range == 4) {
        this.vx = rand(6, 8);
        this.vy = rand(6, 8);
      } else {
        this.vx = rand(8, 10);
        this.vy = rand(8, 10);
      }
    }

    getMissedStatus() {
      return this.isMissed;
    }

    bounce() {
      this.vy *= -1;
    }

    reposition(paddleTop) {
      this.y = paddleTop - this.r;
    }

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

    getR() {
      return this.r;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.y - this.r > this.canvas.height) {
        this.isMissed = true;
      }

      // ボールを跳ね返らせる処理
      if (
        // 左の壁に当たった場合（差分の半径分を引かないと、半径分壁にめり込んでから軌道が反転(*=-1)になる。）
        this.x - this.r < 0 ||
        // 右の壁に当たった場合
        this.x + this.r > this.canvas.width
      ) {
        this.vx *= -1;
      }

      if (this.y - this.r < 0) {
        this.vy *= -1;
      }
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "#fdfdfd";
      // arcメソッドで円を描画
      this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  class Paddle {
    constructor(canvas, game) {
      this.canvas = canvas;
      this.game = game;
      this.ctx = this.canvas.getContext("2d");
      this.w = 60;
      this.h = 16;
      this.x = this.canvas.width / 2 - this.w / 2;
      this.y = this.canvas.height - 32;
      this.mouseX = this.x;
      this.addHandler();
    }

    addHandler() {
      document.addEventListener("mousemove", (e) => {
        this.mouseX = e.clientX;
      });
    }

    update(ball) {
      const ballBottom = ball.getY() + ball.getR();
      const paddleTop = this.y;
      const ballTop = ball.getY() - ball.getR();
      const paddleBottom = this.y + this.h;
      const ballCenter = ball.getX();
      const paddleLeft = this.x;
      const paddleRight = this.x + this.w;

      if (
        ballBottom > paddleTop &&
        ballTop < paddleBottom &&
        ballCenter > paddleLeft &&
        ballCenter < paddleRight
      ) {
        ball.bounce();
        // ボールが浅く入ってくるとパドルの中で跳ね返ってしまうので、それを防ぐ
        ball.reposition(paddleTop);
        this.game.addScore();
      }

      const rect = this.canvas.getBoundingClientRect(); //canvasの位置を取得するメソッド
      this.x = this.mouseX - rect.left - this.w / 2;

      // canvasの左右端よりもパドルが行ってしまわないようにする
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x + this.w > this.canvas.width) {
        this.x = this.canvas.width - this.w;
      }
    }

    draw() {
      this.ctx.fillStyle = "#fdfdfd";
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }

  class PingPongGame {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.ball = new Ball(this.canvas);
      this.paddle = new Paddle(this.canvas, this);
      this.loop();
      this.isGameOver = false;
      this.score = 0;

      this.pingpongPoint = document.getElementById("pingpong_point");
      this.pingpongPointBtn = document.getElementById("pingpong_point_btn");
    }

    addScore() {
      this.score++;
    }

    // "ゲームループ"と呼ばれる
    loop() {
      if (this.isGameOver) {
        return;
      }

      this.update();
      this.draw();

      // 再帰的に呼び出すには setTimeout() を使ってもいいが、
      // 描画処理に最適化された requestAnimationFrame() というメソッドを使えば
      // ブラウザの次の描画タイミングに合わせて渡した関数を
      // 実行してくれる
      requestAnimationFrame(() => {
        this.loop();
      });
    }

    update() {
      this.ball.update();
      this.paddle.update(this.ball);

      if (this.ball.getMissedStatus()) {
        this.isGameOver = true;
      }
    }

    draw() {
      if (this.isGameOver) {
        this.drawGameOver(); // ゲームオーバーになったら、
        this.operatePoint(); // ポイント操作をする
        return;
      }
      // ボールが動いた後の軌跡を消す為に、clearRectをここで指定する
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ball.draw();
      this.paddle.draw();
      this.drawScore();
    }

    drawGameOver() {
      this.ctx.font = '28px "Arial Black"';
      this.ctx.fillStyle = "tomato";
      this.ctx.fillText("GAME OVER", 50, 150);
    }

    drawScore() {
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "#fdfdfd";
      this.ctx.fillText(this.score, 10, 25);
    }

    // α：かかった時間に応じてポイントをinput要素に入れる
    setPoint(point) {
      this.pingpongPoint.value = point;
    }

    // β：view.pyに値を返す
    sendPoint(e) {
      this.pingpongPointBtn.click(e);
    }

    // ゲームの難易度と跳ね返した回数に応じてポイント増減
    operatePoint() {
      if (this.score >= 5) {
        if (changelevelElem.value == 1) {
          this.setPoint(100);
        } else if (changelevelElem.value == 2) {
          this.setPoint(300);
        } else if (changelevelElem.value == 3) {
          this.setPoint(800);
        } else if (changelevelElem.value == 4) {
          this.setPoint(1000);
        } else {
          this.setPoint(2000);
        }
      } else {
        if (changelevelElem.value == 1) {
          this.setPoint(-300);
        } else if (changelevelElem.value == 2) {
          this.setPoint(-400);
        } else if (changelevelElem.value == 3) {
          this.setPoint(-500);
        } else if (changelevelElem.value == 4) {
          this.setPoint(-800);
        } else {
          this.setPoint(-2000);
        }
      }
      this.sendPoint();
    }
  }

  const canvas = document.querySelector("canvas");
  if (typeof canvas.getContext === "undefined") {
    return;
  }

  new PingPongGame(canvas);
})();

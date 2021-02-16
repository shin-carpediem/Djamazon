"use strict";

const slot = () => {
  // ⓪：要素を取得
  const changelevelElem = document.getElementById("slotChangeLevel");
  const currentValueElem = document.getElementById("slot-current-value");

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

  class Panel {
    constructor() {
      // ⓪：要素を取得
      this.range = randomNum;
      const section = document.createElement("section");
      section.classList.add("panel");

      this.img = document.createElement("img");
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;

      this.stop = document.createElement("div");
      this.stop.textContent = "STOP";
      this.stop.classList.add("stop", "inactive");
      this.stop.addEventListener("click", () => {
        if (this.stop.classList.contains("inactive")) {
          return;
        }
        this.stop.classList.add("inactive");

        clearTimeout(this.timeoutId);

        panelsLeft--;

        if (panelsLeft === 0) {
          setTimeout(checkResult, 2000);
          spin.classList.remove("inactive");
          panelsLeft = 3;
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector("main");
      main.appendChild(section);
    }

    // ③：ゲームレベルを変更する関数
    getRandomImage() {
      let images = [
        "./../../../static/img/games/slot/seven.png",
        "./../../../static/img/games/slot/bell.png",
        "./../../../static/img/games/slot/cherry.png",
      ];
      if (this.range == 1) {
        images = images;
      } else if (this.range == 2) {
        images.push("./../../../static/img/games/slot/burger.png");
      } else if (this.range == 3) {
        images.push("./../../../static/img/games/slot/burger.png");
        images.push("./../../../static/img/games/slot/apple.png");
      } else if (this.range == 4) {
        images.push("./../../../static/img/games/slot/burger.png");
        images.push("./../../../static/img/games/slot/apple.png");
        images.push("./../../../static/img/games/slot/pizza.png");
      } else {
        images.push("./../../../static/img/games/slot/burger.png");
        images.push("./../../../static/img/games/slot/apple.png");
        images.push("./../../../static/img/games/slot/pizza.png");
        images.push("./../../../static/img/games/slot/grape.png");
      }
      return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }

    isUnmatched(p1, p2) {
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
      this.img.classList.add("unmatched");
    }

    activate() {
      this.img.classList.remove("unmatched");
      this.stop.classList.remove("inactive");
    }
  }

  const slotPoint = document.getElementById("slot_point");
  const slotPointBtn = document.getElementById("slot_point_btn");

  // α：結果に応じてポイントをinput要素に入れる
  function setPoint(point) {
    slotPoint.value = point;
  }

  // β：view.pyに値を返す
  function sendPoint(e) {
    slotPointBtn.click(e);
  }

  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
      setPoint(-300);
    } else if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
      setPoint(-300);
    } else if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
      setPoint(-300);
    } else {
      // 全て揃った時
      setPoint(3000);
    }
    sendPoint();
  }

  let panels = [new Panel(), new Panel(), new Panel()];

  let panelsLeft = 3;

  const spin = document.getElementById("spin");
  spin.addEventListener("click", () => {
    if (spin.classList.contains("inactive")) {
      return;
    }
    spin.classList.add("inactive");

    panels.forEach((panel) => {
      panel.activate();
      panel.spin();
    });
  });
};
slot();

"use strict";

{
  // ⓪：要素を取得
  const changelevelElem = document.getElementById("slotChangeLevel");
  const currentValueElem = document.getElementById("slot-current-value");

  // ①：現在のレベルをレベル表示箇所に埋め込む関数
  function setCurrentValue(val) {
    currentValueElem.innerText = val;
  }

  // ③：①②をターゲットのvalueの値に応じて実行
  function rangeOnChange(e) {
    setCurrentValue(e.target.value); // ①
    getImageSet(e.target.value); // ②
  }

  // ④：①②をウィンドウロード時に発火
  window.onload = () => {
    // ここが機能していない。どうやって、window_load時に発火させるか
    changelevelElem.addEventListener("input", rangeOnChange);
    setCurrentValue(changelevelElem.value);
    getImageSet(changelevelElem.value);
  };
  class Panel {
    constructor() {
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
          checkResult();
          spin.classList.remove("inactive");
          panelsLeft = 3;
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector("main");
      main.appendChild(section);

      // ⓪：要素を取得
      this.changelevelElem = document.getElementById("slotChangeLevel");
      this.currentValueElem = document.getElementById("slot-current-value");
    }

    // ①：ゲームレベルを変更する関数
    getImageSet(lev) {
      const images_def = [
        "./../../../static/img/games/slot/seven.png",
        "./../../../static/img/games/slot/bell.png",
        "./../../../static/img/games/slot/cherry.png",
      ];
      if (lev == 1) {
        images_def = images_def;
      } else if (lev == 2) {
        images_def.push("./../../../static/img/games/slot/burger.png");
      } else if (lev == 3) {
        images_def.push("./../../../static/img/games/slot/burger.png");
        images_def.push("./../../../static/img/games/slot/apple.png");
      } else if (lev == 4) {
        images_def.push("./../../../static/img/games/slot/burger.png");
        images_def.push("./../../../static/img/games/slot/apple.png");
        images_def.push("./../../../static/img/games/slot/pizza.png");
      } else {
        images_def.push("./../../../static/img/games/slot/burger.png");
        images_def.push("./../../../static/img/games/slot/apple.png");
        images_def.push("./../../../static/img/games/slot/pizza.png");
        images_def.push("./../../../static/img/games/slot/grape.png");
      }
      return images_def;
    }

    // ②：現在のレベルをレベル表示箇所に埋め込む関数
    setCurrentValue(val) {
      this.currentValueElem.innerText = val;
    }

    // ③：①②をターゲットのvalueの値に応じて実行
    rangeOnChange(e) {
      this.getImageSet(e.target.value); // ①
      this.setCurrentValue(e.target.value); // ②
    }

    // ④：①②をウィンドウロード時に発火
    onload() {
      // ここが機能していない。どうやって、window_load時に発火させるか
      this.changelevelElem.addEventListener("input", this.rangeOnChange);
      this.getImageSet(this.changelevelElem.value);
      this.setCurrentValue(this.changelevelElem.value);
    }

    // 元々
    // getRandomImage() {
    //   const images = [
    //     "./../../../static/img/games/slot/seven.png",
    //     "./../../../static/img/games/slot/bell.png",
    //     "./../../../static/img/games/slot/cherry.png",
    //   ];
    //   return images[Math.floor(Math.random() * images.length)];
    // }

    getRandomImage() {
      let images = this.getImageSet();
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

  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  const panels = [new Panel(), new Panel(), new Panel()];

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

  // ④：①②をウィンドウロード時に発火
  // window.onload = () => {
  //   changelevelElem.addEventListener("input", rangeOnChange);
  //   getImageSet(changelevelElem.value);
  //   setCurrentValue(changelevelElem.value);
  // };
}

"use strict";

{
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
      // ストップボタンを押すとforEachループによるグルグル回転が止まるようにする
      this.stop.addEventListener("click", () => {
        if (this.stop.classList.contains("inactive")) {
          return;
        }
        this.stop.classList.add("inactive");
        clearTimeout(this.timeoutId);

        panelsleft--;

        if (panelsleft === 0) {
          // 結果判定後も遊べるようにする
          spin.classList.remove("inactive");
          panelsleft = 3;
          checkResult();
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector("main");
      main.appendChild(section);
    }

    getRandomImage() {
      const images = [
        "./../../../static/img/games/slot/seven.png",
        "./../../../static/img/games/slot/bell.png",
        "./../../../static/img/games/slot/cherry.png",
      ];
      return images[Math.floor(Math.random() * images * length)];
    }

    spin() {
      this.img.src = this.getRandomImage();
      // 50ms毎に次のspinを繰り返す
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

  // 個々のパネルではなく、パネル同士の比較をするために、上の外で記述する
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

  // 一致しなかったパネルの色を薄くするために、ゲームの終了を管理する
  // そのために、ゲーム中残っているパネルの枚数を関数で管理する
  let panelsleft = 3;

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
}

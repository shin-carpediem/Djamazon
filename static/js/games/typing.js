"use strict";

const typing = () => {
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0]; // spliceの返り値は配列になるので、[0]で1番目を指定する。
    target.textContent = word;
    loc = 0;
  }

  // ⓪：要素を取得/設定
  const changelevelElem = document.getElementById("typingChangeLevel");
  const currentValueElem = document.getElementById("typing-current-value");

  const typingPoint = document.getElementById("typing_point");
  const typingPointBtn = document.getElementById("typing_point_btn");

  let words = ["red", "blue", "pink"];

  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false; // プレイ中もクリックできてしまうバグを直す
  const target = document.getElementById("typing-question");

  // α：かかった時間に応じてポイントをinput要素に入れる
  function setPoint(point) {
    typingPoint.value = point;
  }

  // β：view.pyに値を返す
  function sendPoint(e) {
    typingPointBtn.click(e);
  }

  // ①：現在のレベルをレベル表示箇所に埋め込む関数
  function setCurrentValue(val) {
    currentValueElem.innerText = val;
  }

  // ②：ゲームのレベルを変えるかつ、セッティングする関数
  function changeLevel(lev) {
    if (lev == 1) {
      words = this.words;
    } else if (lev == 2) {
      words.push("green", "yellow");
    } else if (lev == 3) {
      words.push("green", "yellow", "black", "white");
    } else if (lev == 4) {
      words = ["interesting", "wonderful", "amazing", "imaginative"];
    } else {
      words = [
        "interesting",
        "wonderful",
        "amazing",
        "imaginative",
        "sophisticated",
        "emotional",
      ];
    }
  }

  // ③：①②をターゲットのvalueの値に応じて実行
  function rangeOnChange(e) {
    setCurrentValue(e.target.value); //①
    changeLevel(e.target.value); //②
  }

  // ④：①②をウィンドウロード時に発火
  window.onload = () => {
    changelevelElem.addEventListener("input", rangeOnChange);
    setCurrentValue(changelevelElem.value);
    changeLevel(changelevelElem.value);
  };

  document.addEventListener("click", () => {
    if (isPlaying === true) {
      return;
    }

    isPlaying = true;
    startTime = Date.now();
    setWord();
    document.querySelector("#typing-question").style.cursor = "auto";
  });

  document.addEventListener("keydown", (e) => {
    // ハズレの場合何も起きない
    if (e.key !== word[loc]) {
      return;
    }
    // 以降は当たりの場合
    loc++;

    // 1: _ed
    // 2: __d
    // 3: ___
    target.textContent = "🤩".repeat(loc) + word.substring(loc);

    if (loc === word.length) {
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2); // 時間はms単位で出力されるので、1000で割ってs単位にする。
        const result = document.getElementById("typing-result");
        result.textContent = `Finished. ${elapsedTime} seconds.`;
        if (elapsedTime <= 20) {
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
      }
      setWord();
    }
  });
};
typing();

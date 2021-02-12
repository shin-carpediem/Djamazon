"use strict";

{
  // ⓪：ボックスの個数の初期値
  let num = 3;
  let winner = Math.floor(Math.random() * num); // num = 3 の時は、0 - 2

  // https://code-kitchen.dev/html/input-range/
  // ⓪：要素を取得
  const counterContent = document.getElementById("counterContent");
  const changelevelElem = document.getElementById("counterChangeLevel");
  const currentValueElem = document.getElementById("counter-current-value");

  // ①：ゲームをセッティングする関数
  function setGame(num) {
    counterContent.innerText = "";
    for (let i = 0; i < num; i++) {
      const div = document.createElement("div");
      div.classList.add("box");

      div.addEventListener("click", () => {
        if (i === winner) {
          div.textContent = "Win!";
          div.classList.add("win");
        } else {
          div.textContent = "Lose!";
          div.classList.add("lose");
        }
      });

      counterContent.appendChild(div);
    }
  }

  // ②：現在のレベルをレベル表示箇所に埋め込む関数
  function setCurrentValue(val) {
    currentValueElem.innerText = val;
  }

  // ③：①のゲームレベルを変える関数
  function changeLevel(lev) {
    // ここで引数としてターゲットvalueを受け取れていない
    if (lev == 1) {
      setGame(3);
    } else if (lev == 2) {
      setGame(4);
    } else if (lev == 3) {
      setGame(5);
    } else if (lev == 4) {
      setGame(7);
    } else {
      setGame(10);
    }
  }

  // ④：②③をターゲットのvalueの値に応じて実行
  function rangeOnChange(e) {
    setCurrentValue(e.target.value); //②
    changeLevel(e.target.value); //③
  }

  // ⑤：②をウィンドウロード時に発火
  window.onload = () => {
    changelevelElem.addEventListener("input", rangeOnChange);
    setCurrentValue(changelevelElem.value);
    changeLevel(changelevelElem.value);
  };

  // ⑥：③をrangeのvalueの値毎に発火
  // changelevelElem.addEventListener("input", rangeOnChange);
  // changeLevel(changelevelElem.value);
}

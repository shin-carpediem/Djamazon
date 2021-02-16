"use strict";

const counter = () => {
  // https://code-kitchen.dev/html/input-range/
  // ⓪：要素を取得
  const counterContent = document.getElementById("counterContent");
  const changelevelElem = document.getElementById("counterChangeLevel");
  const currentValueElem = document.getElementById("counter-current-value");

  const counterPoint = document.getElementById("counter_point");
  const counterPpointBtn = document.getElementById("counter_point_btn");

  function radomNum(num) {
    let winner = Math.floor(Math.random() * num); // num = 3 の時は、0 - 2
    return winner;
  }

  // α：引いたくじの結果に応じてポイントをinput要素に入れる
  function setPoint(point) {
    counterPoint.value = point;
  }

  // β：view.pyに値を返す
  function sendPoint(e) {
    counterPpointBtn.click(e);
  }

  // ①：ゲームをセッティングする関数
  function setGame(num) {
    counterContent.innerText = "";

    for (let i = 0; i < num; i++) {
      const div = document.createElement("div");
      div.classList.add("box");

      let winner = Math.floor(Math.random() * num);
      div.addEventListener("click", () => {
        if (i === winner) {
          div.textContent = "Win!";
          div.classList.add("win");
          setPoint(1000);
        } else {
          div.textContent = "Lose!";
          div.classList.add("lose");
          setPoint(-500);
        }
        setTimeout(sendPoint, 2000);
      });

      counterContent.appendChild(div);
    }
  }

  // ③：①のゲームレベルを変える関数
  function changeLevel(lev) {
    if (lev == 1) {
      radomNum(3);
      setGame(3);
    } else if (lev == 2) {
      radomNum(4);
      setGame(4);
    } else if (lev == 3) {
      radomNum(5);
      setGame(5);
    } else if (lev == 4) {
      radomNum(7);
      setGame(7);
    } else {
      radomNum(10);
      setGame(10);
    }
  }

  // ②：現在のレベルをレベル表示箇所に埋め込む関数
  function setCurrentValue(val) {
    currentValueElem.innerText = val;
  }

  // ④：②③をターゲットのvalueの値に応じて実行
  function rangeOnChange(e) {
    setCurrentValue(e.target.value); // ②
    changeLevel(e.target.value); // ③
  }

  // ⑤：②③をウィンドウロード時に発火
  window.onload = () => {
    changelevelElem.addEventListener("input", rangeOnChange);
    setCurrentValue(changelevelElem.value);
    changeLevel(changelevelElem.value);
  };
};
counter();

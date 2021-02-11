"use strict";

{
  // ボックスの個数の初期値
  let num = 3;

  // https://code-kitchen.dev/html/input-range/
  // input要素を取得
  const changelevelElem = document.getElementById("counterChangeLevel");
  const changelevelValueElem = changelevelElem.value;
  const currentValueElem = document.getElementById("counter-current-value");

  // ①numの値を決める関数
  const changeLevel = (lev) => {
    console.log(lev);
    if (lev == 1) {
      num = 3;
      console.log(num);
      return num;
    } else if (lev == 2) {
      num = 5;
      console.log(num);
      return num;
    } else if (lev == 3) {
      num = 10;
      console.log(num);
      return num;
    } else if (lev == 4) {
      num = 15;
      console.log(num);
      return num;
    } else {
      num = 15;
      console.log(num);
      return num;
    }
  };

  // ②現在の値をspanに埋め込む関数
  function setCurrentValue(val) {
    currentValueElem.innerText = val;
  }

  // ①②をターゲットのvalueに応じて実行する関数
  const rangeOnChange = (e) => {
    const newlevel = e.target.value;
    changeLevel(newlevel);
    setCurrentValue(newlevel);
  };

  // スライダー変化時に②を発火
  window.onload = () => {
    changelevelElem.addEventListener("input", rangeOnChange);
    setCurrentValue(changelevelValueElem);
  };

  // 以下はゲームロジック
  let winner = Math.floor(Math.random() * num); // num = 3 の時は、0 - 2

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

    document.getElementById("counterContent").appendChild(div);
  }
}

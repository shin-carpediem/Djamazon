"use strict";

{
  // ボックスの個数の初期値
  let num = 3;

  // https://code-kitchen.dev/html/input-range/
  // input要素を取得
  const changelevelElem = document.getElementById("counterChangeLevel");
  const changelevelValueElem = changelevelElem.value;
  const currentValueElem = document.getElementById("counter-current-value");

  // numの値を決める分岐
  const changeNum = (changelevelValueElem) => {
    switch (changelevelValueElem) {
      case 1:
        num = 3;
        break;
      case 2:
        num = 5;
        break;
      case 3:
        num = 10;
        break;
      case 4:
      case 5:
        num = 15;
        break;
    }
  };

  // 現在の値をspanに埋め込む関数
  const setCurrentValue = (val) => {
    currentValueElem.innerText = val;
  }; // inputイベント時に値をセットする関数

  // スライダーのvalueの値、すなわちnewlevelに応じて2つの関数を実行
  // 一つは、ゲームのレベルを変える関数
  // もう一つは、現在のレベルを表示させる関数
  const rangeOnChange = (e) => {
    const newlevel = e.target.value;
    changeLevel(newlevel);
    setCurrentValue(newlevel);
  };

  window.onload = () => {
    // スライダー変化時にイベントを発火
    changelevelElem.addEventListener("input", rangeOnChange);
    setCurrentValue(changelevelValueElem);
  };

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

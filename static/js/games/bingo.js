"use strict";

const binGo = () => {
  function createColumn(col) {
    const source = [];
    for (let i = 0; i < 15; i++) {
      source[i] = i + 1 + 15 * col;
    }

    const column = [];
    for (let i = 0; i < 5; i++) {
      column[i] = source.splice(
        Math.floor(Math.random() * source.length),
        1
      )[0];
    }
    return column;
  }

  function createColumns() {
    const columns = [];
    for (let i = 0; i < 5; i++) {
      columns[i] = createColumn(i);
    }
    columns[2][2] = "FREE";
    return columns;
  }

  function renderBingo(columns) {
    for (let row = 0; row < 5; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 5; col++) {
        const td = document.createElement("td");
        td.textContent = columns[col][row];
        tr.appendChild(td);
      }
      document.querySelector("tbody").appendChild(tr);
    }
  }

  const columns = createColumns();
  renderBingo(columns);

  const openNumber = document.getElementById("open-number");
  const bingoNumber = document.getElementById("bingo-number");
  const remainedNumber = document.getElementById("remained-number");
  const bingoPoint = document.getElementById("counter_point");
  const bingoPointBtn = document.getElementById("counter_point_btn");
  let currentTurn = 0;
  let isGameOver = false;
  let winOrNot = undefined;

  openNumber.addEventListener("click", () => {
    let num = Math.floor(Math.random() * 75 + 1);
    // 右側のパネルの操作
    bingoNumber.innerText = num;
    currentTurn++;
    remainedNumber.innerText = `${15 - currentTurn}`;

    // 左側のビンゴシートの操作
    //TODO: マス目の数とnumが一致したら、の条件を書く
    if (num == 1) {
      xx.classList.add("disabled");
    } else {
      return;
    }
  });

  // 15回以内でも縦横斜めのどこか一つでも揃っていれば、即勝ち
  //TODO: 条件を書く
  if (num == 1) {
    winOrNot = true;
    isGameOver = true;
    operatePoint();
  }

  // α：引いたくじの結果に応じてポイントをinput要素に入れる
  function setPoint(point) {
    bingoPoint.value = point;
  }

  // β：view.pyに値を返す
  function sendPoint(e) {
    bingoPointBtn.click(e);
  }

  // 上記を合わせた関数
  function operatePoint() {
    if ((winOrNot = true)) {
      setPoint(1000);
    } else {
      setPoint(-200);
    }
    sendPoint();
  }
};
binGo();

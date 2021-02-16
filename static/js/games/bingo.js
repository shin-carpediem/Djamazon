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

  // ビンゴシートの各マスを取得
  const bingo_td = document.querySelectorAll("td");
  console.log(bingo_td[0].innerText); //ok...15
  // ビンゴシートの各マスの数値を配列として取得
  const bingo_sheet_num = [];
  for (let num = 0; num <= 25; num++) {
    // bingo_sheet_num.push(bingo_td[num].innerText);
    // console.log(bingo_sheet_num);TODO:
    // ok?NG?...["hoge", "hoge", ...]取得できているのに、
    // 「Uncaught TypeError: Cannot read property 'innerText' of undefined at binGo」のエラーも出てくる
  }
  // console.log(bingo_sheet_num[0].innerText); // TODO: NG。ここでつっかえて後がうまくいっていない

  const bingoPoint = document.getElementById("counter_point");
  const bingoPointBtn = document.getElementById("counter_point_btn");

  const totalNum = [];
  // 当たって透明になったパネルを取得
  const d_panel = document.getElementsByClassName("bingo-disabled");
  console.log(d_panel); //TODO: 未チェック but...[]

  // 1から75までの数値の並ぶ配列を作る
  for (let i = 1; i <= 75; i++) {
    totalNum.push(i);
  }
  console.log(totalNum); //ok...[1, 2, 3, ... 75]

  let currentTurn = 0;
  let winOrNot = undefined;

  openNumber.addEventListener("click", () => {
    let splicedNum = totalNum.splice(
      Math.floor(Math.random() * totalNum.length),
      1
    )[0];
    console.log(splicedNum); //ok...70
    // 右側のパネルの操作
    bingoNumber.innerText = splicedNum;
    currentTurn++;
    console.log(currentTurn); //ok...1
    remainedNumber.innerText = `${15 - currentTurn}`;

    // 左側のビンゴシートの操作
    // マス目の数とオープンした数が一致したら、マスを透明にする
    if (splicedNum in bingo_sheet_num) {
      console.log("ok"); // TODO: 未チェック
      bingo_td.classList.add("bingo-disabled");
    } else {
      return;
    }
  });

  // α：引いたくじの結果に応じてポイントをinput要素に入れる
  function setPoint(point) {
    bingoPoint.value = point;
  }

  // β：view.pyに値を返す
  function sendPoint(e) {
    bingoPointBtn.click(e);
  }

  // 上記を合わせた関数（3秒後にリダイレクト）
  function operatePoint() {
    if ((winOrNot = true)) {
      setPoint(1000);
    } else {
      setPoint(-200);
    }
    setTimeout(sendPoint, 3000);
  }

  // 15回目終了後にゲーム終了
  if (currentTurn == 15) {
    winOrNot = false;
    operatePoint();
  }

  // 15回以内でも縦横斜めのどこか一つでも揃っていれば、即勝ちの設定
  // 縦が全て揃った時
  if (
    (d_panel[0] && d_panel[1] && d_panel[2] && d_panel[3] && d_panel[4]) ||
    (d_panel[5] && d_panel[6] && d_panel[7] && d_panel[8] && d_panel[9]) ||
    (d_panel[10] && d_panel[11] && d_panel[13] && d_panel[14]) ||
    (d_panel[15] && d_panel[16] && d_panel[17] && d_panel[18] && d_panel[19]) ||
    (d_panel[20] && d_panel[21] && d_panel[22] && d_panel[23] && d_panel[24]) ||
    // 横が全て揃った時
    (d_panel[0] && d_panel[5] && d_panel[10] && d_panel[15] && d_panel[20]) ||
    (d_panel[1] && d_panel[6] && d_panel[11] && d_panel[16] && d_panel[21]) ||
    (d_panel[2] && d_panel[7] && d_panel[17] && d_panel[22]) ||
    (d_panel[3] && d_panel[8] && d_panel[13] && d_panel[18] && d_panel[23]) ||
    (d_panel[4] && d_panel[9] && d_panel[14] && d_panel[19] && d_panel[24]) ||
    // 斜めが全て揃った時
    (d_panel[0] && d_panel[6] && d_panel[18] && d_panel[24]) ||
    (d_panel[4] && d_panel[8] && d_panel[16] && d_panel[20])
  ) {
    winOrNot = true;
    operatePoint();
  }
};
binGo();

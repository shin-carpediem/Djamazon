"use strict";

const omikuji = () => {
  // ⓪：要素を取得
  const btn = document.getElementById("btn");
  const changelevelElem = document.getElementById("omikujiChangeLevel");
  const currentValueElem = document.getElementById("omikuji-current-value");

  const omikujiPoint = document.getElementById("omikuji_point");
  const omikujiPointBtn = document.getElementById("omikuji_point_btn");

  // α：引いたくじの結果に応じてポイントをinput要素に入れる
  function setPoint(point) {
    omikujiPoint.value = point;
  }

  // β：view.pyに値を返す
  function sendPoint(e) {
    omikujiPointBtn.click(e);
  }

  // ①：現在のレベルをレベル表示箇所に埋め込む関数
  function setCurrentValue(val) {
    currentValueElem.innerText = val;
  }

  // ②：ゲームのレベルを変えるかつ、セッティングする関数
  function setGame(lev) {
    btn.addEventListener("click", () => {
      let n = Math.random();

      // ゲームのレベルを変える
      if (lev == 1) {
        n = n;
      } else if (lev == 2) {
        n = n + 0.03;
      } else if (lev == 3) {
        n = n + 0.06;
      } else if (lev == 4) {
        n = n + 0.1;
      } else {
        n = n + 0.15;
      }

      // 結果を表示する
      if (n < 0.2) {
        btn.textContent = "大吉"; // 19%
        setPoint(2000);
        sendPoint();
      } else if (n < 0.4) {
        btn.textContent = "吉"; // 20%
        setPoint(1000);
        sendPoint();
      } else if (n < 0.6) {
        btn.textContent = "中吉"; // 20%
        setPoint(600);
        sendPoint();
      } else if (n < 0.8) {
        btn.textContent = "小吉"; // 20%
        setPoint(400);
        sendPoint();
      } else if (n < 1) {
        btn.textContent = "末吉"; // 20%
        setPoint(200);
        sendPoint();
      } else {
        btn.textContent = "凶"; // 1%
        setPoint(-1500);
        sendPoint();
      }
    });
  }

  // ③：①②をターゲットのvalueの値に応じて実行
  function rangeOnChange(e) {
    setCurrentValue(e.target.value); //①
    setGame(e.target.value); //②
  }

  // ④：①②をウィンドウロード時に発火
  window.onload = () => {
    changelevelElem.addEventListener("input", rangeOnChange);
    setCurrentValue(changelevelElem.value);
    setGame(changelevelElem.value);
  };
};
omikuji();

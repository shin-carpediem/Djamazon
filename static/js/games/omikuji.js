"use strict";

const omikuji = () => {
  const btn = document.getElementById("btn");

  btn.addEventListener("click", () => {
    // // 当確率の場合
    // const results = ["大吉", "吉", "中吉", "小吉", "末吉", "凶"];
    // btn.textContent = results[Math.floor(Math.random() * results.length)];
    const n = Math.random();
    if (n < 0.05) {
      btn.textContent = "大吉"; // 5%
    } else if (n < 0.2) {
      btn.textContent = "吉"; // 20%
    } else if (n < 0.3) {
      btn.textContent = "中吉"; // 10%
    } else if (n < 0.55) {
      btn.textContent = "小吉"; // 25%
    } else if (n < 0.9) {
      btn.textContent = "末吉"; // 35%
    } else {
      btn.textContent = "凶"; // 10%
    }
  });
};
omikuji();

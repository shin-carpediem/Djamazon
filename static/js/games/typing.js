"use strict";

{
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0]; // spliceの返り値は配列になるので、[0]で1番目を指定する。
    target.textContent = word;
    loc = 0;
  }

  const words = ["red", "blue", "pink"];
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false; // プレイ中もクリックできてしまうバグを直す
  const target = document.getElementById("typing-question");

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
        result.textContent = `Finished! ${elapsedTime} seconds!`;
        return;
      }
      setWord();
    }
  });
}

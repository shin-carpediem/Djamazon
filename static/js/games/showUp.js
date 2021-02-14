// https://developer.mozilla.org/ja/docs/Web/API/Document/getElementsByClassName
// https://www.javadrive.jp/javascript/webpage/index4.html
"use strict";

const showUp = () => {
  const eachGameContainer = document.getElementsByClassName(
    "each-game-container"
  )[0];
  window.setTimeout(function () {
    eachGameContainer.classList.add("show-each-game");
  }, 1000);
};
showUp();

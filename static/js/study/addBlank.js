// "use strict";

let addBlank = () => {
  let atag = document.querySelectorAll("A");
  atag.addEventListner("click", (e) => {
    // 属性を設定
    e.setAttribute("target", "_blank");
    e.setAttribute("rel", "noopener noreferre");
  });
};
addBlank();

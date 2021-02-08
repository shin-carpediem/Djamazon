// https://www.sejuku.net/blog/25060
"use strict";

const changeLang = () => {
  const changelang = document.getElementById("changeLang");
  const clickbtn = document.getElementById("langBtn");

  changelang.addEventListener("change", (e) => {
    clickbtn.click(e);
  });
};
changeLang();

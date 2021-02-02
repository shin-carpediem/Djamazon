"use strict";

const mouseMove = () => {
  //#titleを取得
  const title = document.getElementById("title");
  //#bgを取得
  const bg = document.getElementById("bg");

  document.addEventListener("mousemove", e => {
    //X座標(値は適宜調整)
    let x = Math.round(e.pageX / 100);
    //Y座標(値は適宜調整)
    let y = Math.round(e.pageY / 100);

    console.log(x, y);

    //#titleのX軸・Y軸を設定
    title.style.marginLeft = -x + "px";
    title.style.marginTop = -y + "px";

    //#bgのX軸・Y軸を設定
    bg.style.marginLeft = x + "px";
    bg.style.marginTop = y + "px";
  });
};
mouseMove();

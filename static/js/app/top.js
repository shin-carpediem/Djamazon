"use strict";

const headerTitle = () => {
  const h1 = document.querySelector("h1");

  h1.addEventListener("input", () => {
    this.setAttribute("data-heading", this.innerText);
  });
};
headerTitle();

// https://www.sejuku.net/blog/25060
const changeLang = () => {
  const changelang = document.getElementById("changeLang");
  const clickbtn = document.getElementById("langBtn");

  changelang.addEventListener("change", (e) => {
    clickbtn.click(e);
  });
};
changeLang();

// https://www.sejuku.net/blog/25060
const pointFilter = () => {
  const filter_product = document.getElementById("filter-product");
  const clickbtn = document.getElementById("filterBtn");

  filter_product.addEventListener("change", (e) => {
    clickbtn.click(e);
  });
};
pointFilter();

const scrollButton = () => {
  // anime.js利用

  /* ========================================================
スクロールでトップに戻るボタンを表示
=========================================================*/
  // スクロールして何ピクセルでアニメーションさせるか
  const px_change = 1;
  // スクロールのイベントハンドラを登録
  window.addEventListener("scroll", (e) => {
    // 変化するポイントまでスクロールしたらクラスを追加
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > px_change) {
      document.getElementById("btn-backtotop").classList.add("fadein");

      // 変化するポイント以前であればクラスを削除
    } else {
      document.getElementById("btn-backtotop").classList.remove("fadein");
    }
  });

  /* ========================================================
トップに戻るボタンのスムーズスクロール
=========================================================*/

  document.getElementById("btn-backtotop").addEventListener("click", (e) => {
    anime.remove("html, body");
    anime({
      targets: "html, body",
      scrollTop: 0,
      dulation: 600,
      easing: "easeOutCubic",
    });
    return false;
  });
};
scrollButton();

const mouseMove = () => {
  //#titleを取得
  const title = document.getElementById("title");
  //#bgを取得
  const bg = document.getElementById("bg");

  document.addEventListener("mousemove", (e) => {
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

const logOutConfirm = () => {
  const logout = document.getElementById("logOut");

  logout.addEventListener("click", () => {
    const answer = confirm("Are you sure logout?");
    if (answer) {
      window.location.href = "/logout/";
      console.log("Logout succeeded.");
    } else {
      console.log("Logout cancelled.");
    }
  });
};
logOutConfirm();

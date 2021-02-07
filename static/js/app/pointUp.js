"use strict";

{
  async function callUserPointApi() {
    const res = await fetch("http://127.0.0.1:8000/api/user/");
    const users = await res.json();
    console.log(users);
  }

  callUserPointApi();
}

// https://qiita.com/nishinoshake/items/b91236c77b1987036656
{
  const duration = 1000;
  const window = document.body;
  const pointup = document.getElementById("pointUp");

  window.addEventListener("mouseover", (e) => {
    const from = parseInt(pointup.dataset.from, 10);
    const to = parseInt(pointup.dataset.to, 10);
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = elapsedTime / duration;

      if (progress < 1) {
        pointup.textContent = Math.floor(from + progress * (to - from));
      } else {
        pointup.textContent = to;
        clearInterval(timer);
      }
    }, 16);
  });
}

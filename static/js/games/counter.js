const counter = () => {
  "use strict";

  const num = 5;
  const winner = Math.floor(Math.random() * num); // 0 ~ 4

  for (let i = 0; i < num; i++) {
    const div = document.createElement("div");
    div.classList.add("box");

    div.addEventListener("click", () => {
      if (i === winner) {
        div.textContect = "Win!";
        div.classList.add("win");
      } else {
        div.textContect = "Lose!";
        div.classList.add("lose");
      }
    });

    document.getElementById("counterContent").appendChild(div);
  }
};
counter();

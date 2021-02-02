"use strict";

const headerTitle = () => {
  const h1 = document.querySelector("h1");

  h1.addEventListener("input", () => {
    this.setAttribute("data-heading", this.innerText);
  });
};
headerTitle();

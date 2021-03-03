"use strict";

const accountOnClickJs = () => {
  const resetPass = document.getElementById("resetPass");
  const accountOnClickIn = document.getElementById("accountOnClickIn");

  resetPass.addEventListener("click", () => {
    accountOnClickIn.classList.add("account-onclick-in");
    console.log(accountOnClickIn);
  });
};
accountOnClickJs();

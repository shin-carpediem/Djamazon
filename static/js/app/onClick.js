"use strict";

const accountOnClickJs = () => {
  const resetPass = document.getElementById("resetPass");
  const accountOnClickIn = document.getElementById("accountOnClickIn");

  resetPass.addEventListener("click", () => {
    accountOnClickIn.classList.add("account-onclick-in");
  });
};
accountOnClickJs();

const accountOnClickForPwSendJs = () => {
  const accountOnClickForPwSend = document.getElementById("onClickForPwSend");
  const accountOnClickInForPwSend = document.getElementById(
    "onClickInForPwSend"
  );

  accountOnClickForPwSend.addEventListener("click", () => {
    accountOnClickInForPwSend.classList.add("account-onclick-in");
  });
};
accountOnClickForPwSendJs();

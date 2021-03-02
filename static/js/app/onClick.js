"use strict";

const accountOnClickJs = () => {
  const accountOnClick = document.getElementById("onClick");
  const accountOnClickIn = document.getElementById("onClickIn");

  accountOnClick.addEventListener("click", () => {
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

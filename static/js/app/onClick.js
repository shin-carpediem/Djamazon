"use strict";

const onClick = () => {
  $("#onClick").click(() => {
    $("#onClickIn").fadeIn();
  });
};
onClick();

const onClickForPwSend = () => {
  $("#onClickForPwSend").click(() => {
    $("#onClickInForPwSend").fadeIn();
  });
};
onClickForPwSend();

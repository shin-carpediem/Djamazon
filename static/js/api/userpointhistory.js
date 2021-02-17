"use strict";

async function callUserPointHistoryApi() {
  const res = await fetch("https://shinac.pythonanywhere.com/api/userpointhistory/");
  const userpointhistory = await res.json();
  console.log(userpointhistory[0]);
}

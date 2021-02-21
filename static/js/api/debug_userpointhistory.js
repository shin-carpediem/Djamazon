"use strict";

async function callUserPointHistoryApi() {
  const res = await fetch("http://127.0.0.1:8000/api/userpointhistory/");
  const userpointhistory = await res.json();
  console.log(userpointhistory[0]["point_history"]);
  console.log(userpointhistory[0]["created_at"]);
}

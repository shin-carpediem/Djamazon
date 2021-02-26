"use strict";

{
  async function callUserApi() {
    const res = await fetch("https://djamazonapp.pythonanywhere.com/api/user/");
    const users = await res.json();
    console.log(users);
  }

  callUserApi();
}

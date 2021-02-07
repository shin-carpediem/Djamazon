"use strict";

{
  async function callUserApi() {
    const res = await fetch("http://127.0.0.1:8000/api/user/");
    const users = await res.json();
    console.log(users);
  }

  callUserApi();
}

"use strict";

const recommendDemo = () => {
  let signupForm = document.getElementsByClassName("signupForm")[0];
  console.log(signupForm);

  function signUpMotion() {
    signupForm.addEventListener("mousemove", (e) => {
      const useDemo = confirm(
        "You can also use demo account*. Are you want to login with it? (*The password cannot be changed.)"
      );
      if (useDemo) {
        window.location.href = "/login/";
        console.log("hoge");
      }
    });

    if ((window.location.href = "/login/")) {
      const username = document.getElementById("username");
      console.log(username);
      const password = document.getElementById("password");
      console.log(username.value);
      username.value = "demo@demo.com";
      password.value = "demoaccount";
    }
  }
  signUpMotion();

  signupForm = document.getElementsByClassName("signupForm")[1];
  signUpMotion();
};
recommendDemo();

"use strict";

const recommendDemo = () => {
  try {
    let signupForm = document.getElementsByClassName("signupForm")[0];

    function signUpMotion() {
      signupForm.addEventListener("mousemove", (e) => {
        const useDemo = confirm(
          "You can also use demo account*. Are you want to login with it? (*The password cannot be changed.)"
        );
        if (useDemo) {
          window.location.href = "/login/";
        }
      });
    }
    signUpMotion();

    signupForm = document.getElementsByClassName("signupForm")[1];
    signUpMotion();
  } catch (e) {
    // ページがsignup.htmlからlogin.htmlに切り替わった後の動作
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    username.value = "demo@demo.com";
    password.value = "demoaccount";
  }
};
recommendDemo();

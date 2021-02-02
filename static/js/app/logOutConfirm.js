const logOutConfirm = () => {
  logout = document.getElementById("logOut");

  logout.addEventListener("click", () => {
    const answer = confirm("Are you sure logout?");
    if (answer) {
      window.location.href = "https://shinac.pythonanywhere.com/signup/";
      console.log("Logout succeeded.");
    } else {
      console.log("Logout cancelled.");
    }
  });
};
logOutConfirm();

// https://darkmodejs.learn.uno/

function addDarkmodeWidget() {
  const options = {
    bottom: "40px", // default: '32px'
    right: "unset", // default: '32px'
    left: "32px", // default: 'unset'
    backgroundColor: "#ececec", // default: '#fff'
    label: "🌓", // default: ''
  };

  const darkmode = new Darkmode(options);
  darkmode.showWidget();
}
window.addEventListener("load", addDarkmodeWidget);

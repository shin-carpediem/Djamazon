// http://cly7796.net/wp/javascript/to-page-transition-by-selecting-a-pull-down/

const changeLang = () => {
  window.onload = () => {
    document.getElementById("changeLang").onchange = () => {
      let url = this.options[this.selectedIndex].value;
      if (url != "") {
        location.href = url;
      }
    };
  };
};
changeLang();

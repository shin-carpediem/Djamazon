const fadeIn = () => {
  $(window).scroll(function () {
    $(".fadeIn").each(function () {
      let elemPos = $(this).offset().top;
      let scroll = $(window).scrollTop();
      let windowHeight = $(window).height();
      if (scroll > elemPos - windowHeight + 200) {
        $(this).addClass("effect-scroll");
      }
    });
  });
};
fadeIn();

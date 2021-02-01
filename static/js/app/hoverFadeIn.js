const hoverFadeIn = () => {
  $(".each-wrapper").hover(
    function () {
      $(this).find(".text_soft").addClass("text-active");
    },
    function () {
      $(this).find(".text_soft").removeClass("text-active");
    }
  );
};
hoverFadeIn();

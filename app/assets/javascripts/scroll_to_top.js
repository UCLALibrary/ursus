$(document).ready(function (c) {
  $(window).scroll(function () {
    if ($(this).scrollTop() < 100) {
      $('.btn-base--base--ursus-scroll').fadeOut();
    } else {
      $('.btn-base--base--ursus-scroll').fadeIn();
    }
  });

  //Click event to scroll to top
  $('.btn-base--base--ursus-scroll').click(function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });
});

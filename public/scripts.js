$(document).ready(function() {
  $('.nav-toggle').click(function() {
    $('.mobile-nav').toggleClass('active');
  });

  $('.dropdown-toggle').click(function() {
    $('.dropdown-items').toggleClass('active');
  });
});

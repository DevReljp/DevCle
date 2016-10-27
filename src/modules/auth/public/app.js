$(function() {
  $("form#login").on("submit", function(e) {
    e.preventDefault();
    data = $(this).serialize();
    $.ajax({
      url: '/auth',
      type: 'POST',
      data: data
    })
    .then(function(data) {
      location.href = "/";
    },
    function(err) {
      console.error(err);
    })
  })
});

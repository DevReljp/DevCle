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
  });
  $("#logout").on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/auth',
      type: 'DELETE'
    })
    .then(function(data) {
      location.href = "/";
    },
    function(err) {
      console.error(err);
    })
  })
});

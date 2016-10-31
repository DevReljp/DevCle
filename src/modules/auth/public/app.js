$(function() {
  $.ajax({
    url: '/auth'
  })
    .then((data) => {
      $('.dc-userId').text(data.userId);
      if (data === '') {
        $('.no-signin').show();
        $('.signined').hide();
      }else{
        $('.no-signin').hide();
        $('.signined').show();
      }
    })
  $("form#login").on("submit", function(e) {
    e.preventDefault();
    var data = $(e.target).serialize();
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
  $("#signout").on('click', function(e) {
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

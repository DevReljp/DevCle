// JavaScript
$(function() {
  $("#signout").on('click', function(e) {
    $.ajax({
      url: '/auth',
      type: 'DELETE'
    })
    .then(() => {
      location.href = '/';
    }, (err) => {
      
    });
  });
});
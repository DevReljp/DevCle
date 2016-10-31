// JavaScript
$(function() {
  $('form#register').on('submit', (e) => {
    e.preventDefault();
    var data = $(e.target).serialize();
    $.ajax({
      url: '/users',
      type: 'POST',
      data: data
    })
    .then((data) => {
      location.href = '/';
    }, (err) => {
      
    })
  });
});

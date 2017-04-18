$(document).ready(function() {
  $('.new-tweet').on('keyup', '#compose textarea', function() {
    var charactersTyped = $(this).val().length;
    var charactersLeft = 140 - charactersTyped;
    $(this).siblings('span').find('.counter').html(charactersLeft);
  });
})

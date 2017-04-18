$(document).ready(function() {
  $('.new-tweet').on('keyup', '#compose textarea', function() {
    var charactersTyped = $(this).val().length;
    var charactersLeft = 140 - charactersTyped;
    var updatedCounter = $(this).siblings('span').find('.counter').html(charactersLeft);
    if (charactersLeft < 0) {
      updatedCounter.addClass('color-red');
    } else {
      updatedCounter.removeClass('color-red');
    }
  });
});

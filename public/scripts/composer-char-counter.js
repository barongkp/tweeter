$(document).ready(function() {
  $('.new-tweet').on('keyup', '#compose textarea', function() {
    var charactersTyped = $(this).val().length;
    console.log('typed: ', charactersTyped);
    var charactersLeft = 140 - charactersTyped;
    console.log('left: ', charactersLeft);
  })
})

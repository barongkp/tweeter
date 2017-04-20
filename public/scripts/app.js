
$(document).ready(function() {

  function showNotificationBar(message, duration, bgColor, txtColor, height) {
    /*set default values*/
    duration = typeof duration !== 'undefined' ? duration : 1500;
    bgColor = typeof bgColor !== 'undefined' ? bgColor : "#F4E0E1";
    txtColor = typeof txtColor !== 'undefined' ? txtColor : "#A42732";
    height = typeof height !== 'undefined' ? height : 40;
    /*create the notification bar div if it doesn't exist*/
    if ($('#notification-bar').size() == 0) {
        var HTMLmessage = "<div class='notification-message' style='text-align:center; line-height: " + height + "px;'> " + message + " </div>";
        $('body').prepend("<div id='notification-bar' style='display:none; width:100%; height:" + height + "px; background-color: " + bgColor + "; position: fixed; z-index: 100; color: " + txtColor + ";border-bottom: 1px solid " + txtColor + ";'>" + HTMLmessage + "</div>");
    }
    /*animate the bar*/
    $('#notification-bar').slideDown(function() {
        setTimeout(function() {
            $('#notification-bar').slideUp(function() { $(this).remove();});
        }, duration);
    });
  }

  function createTweetElement (tweetObj) {
    $tweet = $("<article>").addClass("tweet");
    let html = `
      <header>
        <img src=${tweetObj.user.avatars.small} alt="user-avatar" />
        <h1>${tweetObj.user.name}</h1>
        <h2>${tweetObj.user.handle}</h2>
      </header>
      <div class="tweet-body">
        <p>
          ${tweetObj.content.text}
        </p>
      </div>
      <footer>
        <p>
        ${tweetObj.created_at}
        </p>
        <span>
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </span>
      </footer>
    `;
    $tweet = $tweet.append(html);
    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach((tweet)=> {
      var a = createTweetElement(tweet);
      $(".tweets-container").prepend(a);
    });
  }

  $(function() {
      var $submit = $('#compose');
      $submit.on('submit', function (event) {
        console.log('Button clicked, performing ajax call...');
        event.preventDefault();
        var formDataStr = $(this).serialize();
        var textAreaContent = $('#new-tweet-area').val();
        // debugger;
        console.log(textAreaContent === "");

        if(textAreaContent === "") {
          return showNotificationBar("Please enter a text");
        } else if (textAreaContent.length > 140) {
          return showNotificationBar("Tweet is too long");
        } else {
          $.ajax({
            url: `tweets/`,
            method: 'POST',
            data: formDataStr,
            success: function () {
              loadTweets();
              $('#new-tweet-area').val('');
              $('.counter').html(140);
              console.log('the ajax request is successfull');
            }
          });
        }
      });
    });
    function loadTweets() {
      $.ajax({
        url: `/tweets`,
        method: 'GET',
        success: function (data) {
          console.log('Success: ', data);
          renderTweets(data);
        }
      });
    }
    // loadTweets();
  });


$(document).ready(function() {

  const URL = 'http://localhost:8080';

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
      $(".tweets-container").append(a);
    });
  }

  $(function() {
      var $submit = $('#compose');
      $submit.on('submit', function (event) {
        console.log('Button clicked, performing ajax call...');
        event.preventDefault();
        var formDataStr = $(this).serialize();
        console.log($(this).serialize());
        $.ajax({
          url: `${URL}/tweets/`,
          method: 'POST',
          data: formDataStr,
          success: $('#new-tweet-area').val('')
        });
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
    loadTweets();
  });

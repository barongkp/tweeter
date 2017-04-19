// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

$(document).ready(function() {

  function createTweetElement (tweetObj) {
    let html = `
      <header>
        <img src=${tweetObj.user.avatars.small} alt="bird" />
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
    $tweet = $("<article>").addClass("tweet");
    return $tweet.append(html);
  }

  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('.tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});

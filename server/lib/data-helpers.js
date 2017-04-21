"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      console.log('I\'m inside getTweets function callback');
      db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      console.log('callback will get fired now');
      callback(null, tweets);
      console.log("tweets", tweets);
      console.log('end of the get tweets function');
      });
      // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
    }
  }
}

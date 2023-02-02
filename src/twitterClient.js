const { TwitterApi } = require("twitter-api-v2");
require('dotenv').config();

// Twitter API credentials
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Client to read and write on the Twitter API
const twitterClient = client.readWrite;

module.exports = { twitterClient };
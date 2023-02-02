# Twitter GPT-3 AI bot boilerplate

 This repository holds the boilerplate code for an AI-powered Twitter bot. This project will give you a starting platform to create your own AI-powered Twitter bot easily. 

## Project description

This project gives you the tools to use the Twitter and OpenAI GPT-3 APIs to create an AI Powered Twitter bot. By cloning this project, you have a simple starting point.

> Note that many improvements can be made to this code.

This specific example follows these steps:

* Create a Twitter client instance using the [Twitter API](https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api).
* Retrieve a random fact using the [API Ninjas— Facts API](https://api-ninjas.com/api/facts).
* Expand on the topic by querying the [OpenAI— GPT-3 API](https://platform.openai.com/docs/api-reference/introduction).
* Parse the response and Tweet a thread.

You can use this boilerplate to create any AI-powered Twitter bot you want!

## Quick start

Clone this repository

```sh
git clone
```

Install dependencies

```sh
npm ci
```

Edit the `.env.sample` file, replace the examples with your API keys, and rename it to `.env`.

```env
API_KEY="YOUR_API_NINJAS_KEY"
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
TWITTER_API_KEY='YOUR_TWITTER_API_KEY'
TWITTER_API_SECRET='YOUR_TWITTER_API_SECRET'
TWITTER_ACCESS_TOKEN='YUOR_TWITTER_ACCESS_TOKEN'
TWITTER_ACCESS_TOKEN_SECRET='YOUR_TWITTER_ACCESS_TOKEN_SECRET'
```

Run the script

```sh
npm run start
```

This will run the `index.js` file running the bot. The bot is set up by default to send a request and tweet the response every 3 hours; you can change this by editing the `setInterval()` function in the `index.js` file.

```js
// Run main function every 6 hours
setInterval(main, 10800000); // 10800000 milliseconds = 3 hours
```

## Prerequisites

* Node.js: ^16.17.0— [install Node](https://nodejs.org/en/download/)
* A Twitter developer account— Sign up on the [Twitter developer portal](https://developer.twitter.com).

## Setup

To use the `Twitter GPT-3 AI bot boilerplate`, you must create a project on your Twitter developer portal, get your credentials, and update the access permissions.

> :warning: You must give read and write permission, or you will not be able to send tweets.

1. Create a developer account on the Twitter Developer website (https://developer.twitter.com/en/apps).
1. Once you have created an account, create a **new Project**within the project, create a new **Developer App**.
1. Fill in the required details, such as name, website, and a brief description of your App.
1. Once you have created the App, it will take you to the App's overview page, where you can see your App's API Key and API Secret.
1. Go to the Keys and Tokens tab, and generate an Access Token and an Access Token Secret.
1. To allow your App to read and write tweets, go to the Permissions tab in the App's settings and select the **Read, write, and direct messages** options. You will also need to specify a URL and a website. You can use any; I usually use `http://localhost/3000` for the URL and `https://twitter.com/` for the website.
1. Save your changes.

## Make your own GPT-3 AI-powered bot 

I made this boilerplate very modularly on purpose so that you can adapt this to your use case. 

Here is a brief breakdown of the structure:

### index.js

The `index.js` file runs the `main()` function, which follows the logic in sequence.

```js
async function main() {
    const fact = await getFact()
    const aiResponse = await askAi(fact)
    await sendTweet(fact, aiResponse)
}
```

### src directory 

The `src` directory holds the different scripts responsible for retrieving, parsing, and tweeting the data.

#### twitterClient.js

This file takes the secrets from the environment variables you have in the `.env` file and uses them to create a Twitter client instance; the `tweet.js` file then uses this instance to send the tweet.

```js
// Twitter API credentials
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Client to read and write on the Twitter API
const twitterClient = client.readWrite;
```

#### getFact.js

Here is where the bot sends the request to the API Ninjas API. The `getFact()` function sends the request to the API and returns the fact's text after some parsing.

#### openAI.js

This file holds the code to send a request to the GTP-3 model API. 

It takes the text of the fact returned from the API Ninjas API and uses it as part of the prompt to the AI model. 

The following is the AI model configuration:

```js
const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Tell me more about this: ${aiPrompt}`,
        temperature: 0.3,
        max_tokens: 200,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
```

The `prompt` field is essentially what the function asks the AI model. `max_tokens` is the field managing how long the response from the AI will be. The general setting of the configuration is to give a "fact-oriented" type of answer. 

You can see different configurations on the [OpenAI docs](https://platform.openai.com/examples). 

#### tweet.js

The last step of the process is to send the tweet. The `sendTweet` function parses the response from the AI model, creates a thread, and posts it on Twitter.
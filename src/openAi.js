const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function askAi(aiPrompt) {
try {

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Tell me more about this: ${aiPrompt}`,
        temperature: 0.3,
        max_tokens: 200,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

const textResponse = response.data.choices[0].text
//console.log(textResponse)

return textResponse
}
catch(error) {
    console.log(`Something went wrong, try again later: ${error}`)
}
}

module.exports = { askAi };
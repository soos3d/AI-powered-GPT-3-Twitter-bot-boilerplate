const { getFact } = require("./src/getFact")
const { askAi } = require("./src/openAi")
const { sendTweet } = require("./src/tweet")

async function main() {
    const fact = await getFact()
    const aiResponse = await askAi(fact)
    await sendTweet(fact, aiResponse)
}

// Run main function once at the start of the script
main();

// Run main function every 6 hours
setInterval(main, 21600000); // 6 hours

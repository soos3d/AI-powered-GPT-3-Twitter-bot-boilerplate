const { twitterClient } = require("./twitterClient.js")

function breakText(text) {
  var maxLength = 250;
  var textArray = [];
  var start = 0;
  while (start < text.length) {
      var end = start + maxLength;
      if (end > text.length) {
          end = text.length;
      }
      var lastSpace = text.lastIndexOf(" ", end);
      if (lastSpace === -1) {
          lastSpace = end;
      } else if (lastSpace < start) {
          lastSpace = end;
      }
      var slicedText = text.slice(start, lastSpace);
      textArray.push(slicedText);
      start = lastSpace + 1;
  }
  return textArray;
}

async function sendTweet(fact, aiResponse) {

  const tweetText = aiResponse
  console.log(tweetText)

  const rawThread = breakText(tweetText)

  // Remove extra whitespaces
  let threadToFix = rawThread
  const fixedThread = threadToFix.map(str => str.replace('\n' + '\n', ''));
  console.log(fixedThread)


  const thread = [];
  const size = Math.ceil(fixedThread.length / 4);
  for (let i = 0; i < fixedThread.length; i += size) {
      if (i + size >= fixedThread.length) {
          thread[thread.length - 1] = thread[thread.length - 1] + " " + fixedThread[i];
      } else {
          thread.push(fixedThread.slice(i, i + size).join(" "));
      }
  }

  //console.log(thread);
  console.log(`Thread length: ${thread.length}`);

  // Somethimes the thread ends up being 2 or 3 tweets. The following logic takes care of this.
  if (thread.length == 2) {
      try {
          console.log("Sending Tweet...");

          await twitterClient.v2.tweetThread([
              `🧠The fact of the moment🧠 \n \n ${fact}`,
              {
                  text: thread[0]
              },
              {
                  text: thread[1]
              },
          ]);

          console.log("Tweet sent!");

      } catch (error) {
          console.log(`Something went wrong. ${error}`)
      }
  } if (thread.length == 3) {
      try {
          console.log("Sending Tweet...");

          await twitterClient.v2.tweetThread([
              `🧠The fact of the moment🧠 \n \n ${fact}`,
              {
                  text: thread[0]
              },
              {
                  text: thread[1]
              },
              {
                  text: thread[2]
              },
          ]);

          console.log("Tweet sent!");

      } catch (error) {
          console.log(`Something went wrong. ${error}`)
      }
  }
}



module.exports = {
  sendTweet
};

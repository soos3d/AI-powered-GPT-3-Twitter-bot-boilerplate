const request = require('request');
require('dotenv').config();

// Limit is how many facts you want to receive.
const limit = 1;
const options = {
  url: `https://api.api-ninjas.com/v1/facts?limit=${limit}`,
  headers: {
    'X-Api-Key': process.env.API_KEY
  },
};

// Return the fact.
async function getFact() {
  
  return new Promise((resolve, reject) => {
    request.get(options, (error, response, body) => {
      if (error) {

        console.error('Request failed:', error);
        reject(error);

      } else if (response.statusCode !== 200) {
        console.error('Error:', response.statusCode, body.toString('utf8'));
        reject(response.statusCode);

      } else {

        const facts = JSON.parse(body);
        if(facts.length > 0) {
            const { fact } = facts[0];
            console.log(`Fact found: ${fact}`);
            //console.log(facts);
            resolve(fact);

        }else{
            
            reject("No facts found.");
        }
      }
    });
  });
}

module.exports = {getFact}

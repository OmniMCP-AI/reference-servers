import { config } from "dotenv"
import { TwitterApi } from "twitter-api-v2"
config()



const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

export async function createPost(status) {
    const newPost = await twitterClient.v2.tweet(status)

    return {
        content: [
            {
                type: "text",
                text: `Tweeted: ${status}`
            }
        ]
    }
}

const options = {
    method: 'POST',
    headers: {
      Authorization: 'AAAAAAAAAAAAAAAAAAAAADfgyQEAAAAA5RSEWZiX8NWhIZa4J4eTtUmwWnQ%3D8OIUkFZFEMHdEa131MhjrjOzEkSF0idhjJAcEdcMXoF4sh29t7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: "Hello from my LLM + MCP setup!",
      for_super_followers_only: false,
      nullcast: false
    })
  };
  
  fetch('https://api.twitter.com/2/tweets', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  



    
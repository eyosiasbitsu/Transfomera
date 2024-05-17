const OpenAIApi  = require("openai");
const dotenv = require("dotenv");
const path = require('path');

// Configure dotenv to load the .env file from the correct path
dotenv.config({ path: path.join(__dirname, '../../.env') });

const apiKey = process.env.API_KEY;
console.log('API Key:', apiKey); // Log the API key to ensure it's loaded correctly

const openai = new OpenAIApi({
  apiKey: apiKey,
});

async function callGPT(conversationHistory) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Switch to different models if necessary
      messages: conversationHistory,
    });

    const botResponse = response.choices[0].message.content;

    // Add the bot's response to the conversation history
    conversationHistory.push({
      role: "assistant",
      content: botResponse,
    });

    console.log(botResponse);
    return conversationHistory;
  } catch (error) {
    console.error("Error:", error);
    return `An error occurred while processing the request: ${error.message}`;
  }
}

module.exports = { callGPT };

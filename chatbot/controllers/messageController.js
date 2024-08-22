
// controllers/messageController.js
const { callGPT } = require('../services/openaiService');

const initialText = "You are a chatbot designed to assist users in listing their cars. Start by asking the user to provide a description of the car. Analyze this description to determine which of the required fields have already been covered. The mandatory fields for listing cars are: make, year of manufacture, condition, mileage (KM), model, transmission, color, price, and description. Identify and collect any missing mandatory fields in a conversational manner. At the end of the conversation, summarize the collected information and return it in JSON format for user verification and final confirmation.";

// Initialize conversation history
let conversationHistory = [
  { 
    role: "system", 
    content: initialText
  }
];
" Thank You! { k:v fields of the bidding object} "
const handleMessage = async (req, res) => {
  const userMessage = req.body.message;

  // Add the user's message to the conversation history
  conversationHistory.push({
    role: "user",
    content: userMessage,
  });

  // Call the GPT function with the updated conversation history
  conversationHistory = await callGPT(conversationHistory);

  // Get the latest bot response
  const botResponse = conversationHistory[conversationHistory.length - 1].content;

  res.json({ response: botResponse });
};

const clearHistory = (req, res) => {
  conversationHistory = [
    { 
      role: "system", 
      content: initialText },
  ];
  res.json({ message: 'Conversation history cleared.' });
};

module.exports = { handleMessage, clearHistory };

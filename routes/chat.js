const express = require('express');
const { protect } = require('../middleware/auth');
const OpenAI = require('openai');
const Interaction = require('../models/Interaction');

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/chat', protect, async (req, res) => {
  const userMessage = req.body.message;
  const userId = req.user._id;

  try {
    // Fetch previous interactions
    const previousInteractions = await Interaction.find({ userId }).sort({ timestamp: 1 });

    // Create context for the chat
    const chatHistory = previousInteractions.map(interaction => ({
      role: 'user',
      content: interaction.message
    })).concat(previousInteractions.map(interaction => ({
      role: 'assistant',
      content: interaction.response
    }))).slice(-10); // Limit context to the last 10 interactions

    // Add the latest user message
    chatHistory.push({ role: 'user', content: userMessage });

    // Get AI response
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: chatHistory,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    const botMessage = response.choices[0].message.content;

    // Save the interaction
    await Interaction.create({ userId, message: userMessage, response: botMessage });

    res.send({ message: botMessage });
  } catch (error) {
    console.error('Error chatting with AI:', error);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;

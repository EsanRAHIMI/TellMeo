const express = require('express');
const Chat = require('../models/Chat');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { message, response } = req.body;
  const chat = new Chat({ user: req.user._id, message, response });
  await chat.save();
  res.status(201).json(chat);
});

module.exports = router;

// src/controllers/twilioController.js
const express = require('express');
const router = express.Router();
const { sendMessage } = require('../services/TwilioService'); // Ensure correct path

router.post('/send', async (req, res) => {
  const { recipient, messageBody, sendAt } = req.body;

  try {
    const messageSid = await sendMessage({ recipient, messageBody, sendAt });
    res.status(200).json({ messageSid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

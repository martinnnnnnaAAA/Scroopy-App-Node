// const express = require('express');
// const router = express.Router();
// const { sendMessage } = require('../services/MessageService.js');

// router.post('/send', async (req, res) => {
//   const { recipient, messageBody, sendAt } = req.body;

//   try {
//     const messageSid = await sendMessage({ recipient, messageBody, sendAt });
//     res.status(200).json({ messageSid });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
// src/controllers/TwilioController.js
const twilioService = require('../services/TwilioService');

const sendMessage = async (req, res) => {
    try {
        const { to, body } = req.body;
        const message = await twilioService.sendMessage({ to, body });
        res.status(200).json({ sid: message.sid });
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
        res.status(500).json({ error: 'Hubo un error al enviar el mensaje.' });
    }
};

module.exports = {
    sendMessage,
};

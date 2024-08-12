const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');

router.post('/schedule-message', messageController.scheduleMessage);

module.exports = router;

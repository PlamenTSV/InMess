const express = require('express');
const router = express.Router();

const messagesController = require('../Controllers/messagesController');

router.post('/messages/add', messagesController.addMessage);
router.get('/messages/loadAll/:activeChannel', messagesController.loadMessages);

module.exports = router;
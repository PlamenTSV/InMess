const express = require('express');
const router = express.Router();

const channel_controller = require('../Controllers/channelsController');

router.post('/channels', channel_controller.addChannel);

module.exports = router;
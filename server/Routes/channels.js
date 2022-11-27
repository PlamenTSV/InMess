const express = require('express');
const router = express.Router();

const channel_controller = require('../Controllers/channelsController');

router.post('/channels/add', channel_controller.addChannel);

router.get('/channels/load', channel_controller.loadChannels);

router.delete('/channels/delete/:id', channel_controller.deleteChannel);

module.exports = router;
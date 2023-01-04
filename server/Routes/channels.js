const express = require('express');
const router = express.Router();

const channel_controller = require('../Controllers/channelsController');

router.post('/channels/add', channel_controller.addChannel);

router.post('/channels/join', channel_controller.joinChannel);

router.get('/channels/load', channel_controller.loadChannels);

router.delete('/channels/delete/:id', channel_controller.deleteChannel);

module.exports = router;
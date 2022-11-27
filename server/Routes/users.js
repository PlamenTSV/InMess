const express = require('express');
const router = express.Router();

const usersController = require('../Controllers/usersController');

router.get('/users/load', usersController.loadCredentials);

module.exports = router;
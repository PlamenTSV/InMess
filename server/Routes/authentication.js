const express = require('express');
const router = express.Router();

const auth_controller = require('../Controllers/authenticationController');

router.post('/register', auth_controller.registerUser);

router.post('/login', auth_controller.loginUser);

router.get('/session', auth_controller.userHasSession);

module.exports  = router;
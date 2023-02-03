const express = require('express');
const router = express.Router();

const auth_controller = require('../Controllers/authenticationController');

//GET ROUTES
router.get('/session', auth_controller.getSession);

router.get('/profileIcon', auth_controller.getProfileIcon);

//POST ROUTES
router.post('/register', auth_controller.registerUser);

router.post('/login', auth_controller.loginUser);

//DELETE ROUTES
router.delete('/logout', auth_controller.logoutUser);

//PUT ROUTES
router.put('/updateProfile', auth_controller.updateUser);

module.exports  = router;
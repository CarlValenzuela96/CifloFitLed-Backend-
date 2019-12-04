const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');

authRouter.post('/register/user', authController.registrarUsuario);
authRouter.post('/register/admin', authController.registrarAdmin);
authRouter.post('/login', authController.login);

module.exports = authRouter;
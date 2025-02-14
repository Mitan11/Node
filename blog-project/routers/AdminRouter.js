const express = require('express');
const { login, loginPost, dashboard, logout } = require('../controllers/LoginController');
const adminRouter = express.Router();

adminRouter.get('/', login);
adminRouter.post('/login', loginPost);
adminRouter.get('/dashboard', dashboard);
adminRouter.get('/logout', logout);

module.exports = adminRouter;

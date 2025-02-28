const express = require('express');
const { login, loginPost, dashboard, logout } = require('../controllers/LoginController');
const adminRouter = express.Router();
const passport = require('../middleware/passportLocal');


adminRouter.get('/', login);
adminRouter.post('/login',passport.authenticate('local', {
    failureRedirect: '/'
}), loginPost);
adminRouter.get('/dashboard',passport.isAuthenticated, dashboard);
adminRouter.get('/logout', logout);

module.exports = adminRouter;

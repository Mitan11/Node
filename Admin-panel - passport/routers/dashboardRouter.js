const express = require('express');
const controllers = require('../controllers/dashboardController');
const upload = require('../config/multer');
const passport = require('../middleware/passportLocal');

const dashboardRouter = express.Router();

dashboardRouter.get('/', controllers.loginController)

dashboardRouter.post('/login-user', passport.authenticate('local', {
    failureRedirect: '/'
}), controllers.loginPostController)

dashboardRouter.get('/forgot-password', controllers.forgotPasswordController);

dashboardRouter.post('/forgot-password', controllers.forgotPasswordPostController);

dashboardRouter.get('/otpPage', controllers.otpPageController);

dashboardRouter.post('/verify-otp', controllers.verifyOtpController);

dashboardRouter.get('/password-reset', controllers.passwordResetController);

dashboardRouter.post('/reset-password', controllers.resetPasswordController);

dashboardRouter.get('/signup', controllers.signupController)

dashboardRouter.post('/signup-user', upload.single('image'), controllers.signupPostController)

dashboardRouter.get('/logout', controllers.logoutController);

dashboardRouter.get('/dashboard', passport.isAuthenticated, controllers.dashboardController)

dashboardRouter.get('/change-password', passport.isAuthenticated, controllers.changePasswordController);

dashboardRouter.post('/change-password', passport.isAuthenticated, controllers.changePasswordPostController);

dashboardRouter.get('/user-data', passport.isAuthenticated, controllers.userDataController);

dashboardRouter.get("/edit/:id", passport.isAuthenticated, controllers.editUserController)

dashboardRouter.post("/update/:id", passport.isAuthenticated, upload.single("image"), controllers.updateUserPostController);

dashboardRouter.get("/delete/:id", passport.isAuthenticated, controllers.deleteUserController)

dashboardRouter.get('/add-product', passport.isAuthenticated, controllers.addProductController);

dashboardRouter.get('/products-table', passport.isAuthenticated, controllers.productsTableController);

module.exports = dashboardRouter;
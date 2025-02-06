const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const loginController = require('../controllers/dashboardController');
const upload = require('../config/multer');

const dashboardRouter = express.Router();

dashboardRouter.get('/dashboard', dashboardController)

dashboardRouter.get('/', loginController)

dashboardRouter.get('/signup', (req, res) => {
    res.render('signup')
})

dashboardRouter.post('/signup-user',  upload.single('image') , (req, res) => {
    console.log(req.body.userName);  // This will show the correct user name.
    console.log(req.body.email);     // This will show the correct email.
    console.log(req.body.password);  // This will show the correct password.
    console.log(req.image); 
    res.send("ok")
})

// dashboardRouter.get('/', (req, res) => {
//     res.send('dashboard')
// })

module.exports = dashboardRouter
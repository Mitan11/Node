const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const loginController = require('../controllers/dashboardController');
const userModel = require('../models/userModel');
const upload = require('../config/multer');
const isLoggedIn = require('../middleware/isLoggedIn');
const attachUser = require('../middleware/attachUser');
const fs = require('fs');
const path = require('path');

const dashboardRouter = express.Router();

dashboardRouter.get('/dashboard', isLoggedIn, attachUser, async (req, res) => {
    try {
        res.render('dashboard', { user: req.user })
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

dashboardRouter.get('/', loginController)

dashboardRouter.get('/signup', (req, res) => {
    let getData = req.cookies.userData;
    if (!getData) {
        res.render("signup");
    } else {
        res.redirect("/dashboard");
    }
})

dashboardRouter.post('/signup-user', upload.single('image'), async (req, res) => {
    // const normalBody = Object.assign({}, req.body);
    // console.log(normalBody);
    let user = req.body;
    user.image = req.file.filename;
    console.log(user);
    try {
        const existingUser = await userModel.findOne({ email: user.email });
        if (existingUser) {
            console.log("User already exists.");
            return res.redirect("back");
        }
        await userModel.create(user)
        console.log("New User Created");
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
})

dashboardRouter.post('/login-user', async (req, res) => {
    console.log(req.body)
    try {
        const getLoginData = await userModel.findOne({ email: req.body.email });
        console.log(getLoginData);
        if (getLoginData.password === req.body.password) {
            res.cookie("userData", getLoginData);
            res.redirect("/dashboard");
        } else {
            console.log("Incorrecct username or password");
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

dashboardRouter.get('/logout', (req, res) => {
    res.clearCookie("userData");
    res.redirect("/");
});

dashboardRouter.get('/user-data', attachUser, async (req, res) => {
    try {
        const users = await userModel.find({})
        // console.log(users)
        res.render('userTable', { user: req.user, users })
    } catch (error) {
        console.log(error);
    }
});

dashboardRouter.get("/edit/:id", attachUser, async (req, res) => {
    const id = req.params.id
    // console.log(id);
    try {
        const user = await userModel.findById(id);
        // console.log(user)
        res.render('editForm', { user })
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
})

dashboardRouter.post("/update/:id", upload.single("image"), async (req, res) => {
    let userData = await userModel.findById(req.params.id);
    const { userName, email, password } = req.body;
    let updateData = { userName, email, password };
    if (req.file) {
        fs.unlinkSync(path.join(__dirname, "..", "public", "images", "uploads", userData.image));
        updateData.image = req.file.filename;
    }
    await userModel.findByIdAndUpdate(req.params.id , updateData);
    console.log("User updated ");
    res.redirect("/user-data");
});

dashboardRouter.get("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id);
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return
        }
        fs.unlinkSync(path.join(__dirname, "..", "public", "images", "uploads", user.image));
        await userModel.findByIdAndDelete(id);
        console.log("user deleted successfully");
        res.redirect("back")
    } catch (error) {
        console.log(error);
    }
})


module.exports = dashboardRouter
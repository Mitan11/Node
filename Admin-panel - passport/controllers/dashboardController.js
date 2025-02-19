const userModel = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const dashboardController = async (req, res) => {
    res.render('dashboard')
}

const loginController = (req, res) => {
    res.render("login")
}

const signupController = (req, res) => {
    res.render("signup");
}

const signupPostController = async (req, res) => {
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
}

const loginPostController = async (req, res) => {
    try {
        res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

const forgotPasswordController = (req, res) => {
    res.render("forgotPassword");
}

const forgotPasswordPostController = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.redirect("back");
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log("Generated OTP:", otp);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "OTP for Password Reset and this will expire in 10 minutes (Do not share this OTP with anyone)",
            text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        console.log("OTP Email sent successfully");

        res.cookie("otp", otp, {
            maxAge: 10 * 60 * 1000,
            httpOnly: true,
        });

        res.cookie("email", email);

        res.redirect("/otpPage");

    } catch (err) {
        console.error("Forgot Password Error:", err);
        return res.redirect("back");
    }
};

const otpPageController = (req, res) => {
    res.render("otpPage", { email: req.cookies.email });
}

const verifyOtpController = (req, res) => {
    const { otp } = req.body;
    const otpFromCookie = req.cookies.otp;
    console.log(otpFromCookie, otp);
    try {
        if (otp !== otpFromCookie) {
            return res.redirect("back");
        }
        res.redirect("/password-reset");
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
}

const resetPasswordController = async (req, res) => {
    const {password, confirmPassword} = req.body;

    try{
        if(password !== confirmPassword){
            return res.redirect("back");
        }
        await userModel.findOneAndUpdate({email: req.cookies.email}, {password});
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
}

const passwordResetController = (req, res) => {
    res.render("passwordReset");
}

const logoutController = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

const changePasswordController = (req, res) => {
    res.render("changePassword");
}

const changePasswordPostController = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await userModel.findById(req.user._id);
    try {
        if (!user) {
            return res.redirect("back");
        }
        if (newPassword !== confirmPassword) {
            return res.redirect("back");
        }
        if (oldPassword === newPassword) {
            return res.redirect("back");
        }
        user.password = newPassword;
        await user.save();
        res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
}

const userDataController = async (req, res) => {
    try {
        const users = await userModel.find({})
        // console.log(users)
        res.render('userTable', { user: req.user, users })
    } catch (error) {
        console.log(error);
    }
}

const editUserController = async (req, res) => {
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
}

const updateUserPostController = async (req, res) => {
    let userData = await userModel.findById(req.params.id);
    const { userName, email, password } = req.body;
    let updateData = { userName, email, password };
    try{
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, "..", "public", "images", "uploads", userData.image));
            return;
        }
        updateData.image = req.file.filename;
        await userModel.findByIdAndUpdate(req.params.id, updateData);
        console.log("User updated ");
        res.redirect("/user-data");
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
}

const deleteUserController = async (req, res) => {
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
}

const addProductController = (req, res) => {
    res.render("addProductForm");
}

const productsTableController = (req, res) => {
    res.render("productsTable");
}

module.exports = { loginController, dashboardController, signupController, signupPostController, loginPostController, logoutController, userDataController, editUserController, updateUserPostController, deleteUserController, addProductController, productsTableController, changePasswordController, changePasswordPostController, forgotPasswordController, forgotPasswordPostController, otpPageController, verifyOtpController, passwordResetController, resetPasswordController }
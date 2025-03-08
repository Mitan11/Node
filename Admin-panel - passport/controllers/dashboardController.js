const userModel = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const categoryModel = require('../models/categoryModel');
const subCategoryModel = require('../models/subCategoryModel');
const subSubCategoryModel = require('../models/subSubCategoryModel');
const productModel = require('../models/productModel');



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
    const { password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.redirect("back");
        }
        await userModel.findOneAndUpdate({ email: req.cookies.email }, { password });
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
    try {
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

const productsTableController = async (req, res) => {
    try {
        res.render("productsTable");
    } catch (error) {
        console.log(error)
    }
}

const addProductController = async (req, res) => {
    try {
        const subSubCategories = await subSubCategoryModel.find({}).populate('subCategory').populate('category');
        console.log(subSubCategories);
        res.render("addProductForm", { subSubCategories });
    } catch (error) {
        console.log(error);
    }
}

const addProductPostController = async (req, res) => {
    try {
        const { productName, productPrice, productDescription, productSubSubCategory, productContact } = req.body;
        const productImage = req.file ? req.file.filename : null;

        const subSubCategories = await subSubCategoryModel.findOne({_id:productSubSubCategory});
        
        const newProduct = new productModel({
            productName,
            productPrice,
            productDescription,
            productCategory : subSubCategories.category.categoryName,
            productSubCategory : subSubCategories.subCategory.subCategory,
            productSubSubCategory,
            productContact,
            productImage
        });

        await newProduct.save();
        res.redirect('/products-table');
    } catch (error) {
        console.error(error);
    }
};

const addCategoryController = (req, res) => {
    res.render("categoryForm");
}

const addCategoryPostController = async (req, res) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.json({
                success: false,
                message: 'Category name is required and must be a non-empty string.'
            });
        }

        const existingCategory = await categoryModel.findOne({ categoryName: categoryName.trim() });
        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: 'Category with this name already exists.'
            });
        }

        const newCategory = new categoryModel({
            categoryName: categoryName.trim()
        });

        await newCategory.save();

        console.log(newCategory)

        return res.redirect('back');

    } catch (error) {
        console.error(error);
    }
}

const addSubCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.render("addSubCategoryForm", { categories });
    } catch {
        console.error(error);
    }
}

const addSubCategoryPostController = async (req, res) => {
    try {
        const { subCategory, category } = req.body;

        if (!subCategory) {
            return res.json({
                success: false,
                message: 'SubCategory name is required and must be a non-empty string.'
            });
        }

        const existingSubCategory = await subCategoryModel.findOne({
            subCategory: subCategory.trim(),
            category: category
        });

        if (existingSubCategory) {
            return res.status(409).json({
                success: false,
                message: 'A subcategory with this name already exists under the selected category.'
            });
        }

        const newSubCategory = new subCategoryModel({
            subCategory: subCategory.trim(),
            category: category
        });

        await newSubCategory.save();
        res.redirect('back');

    } catch (error) {
        console.error(error);
    }
}

const addSubSubCategoryController = async (req, res) => {
    try {
        const subCategories = await subCategoryModel.find({}).populate('category');

        res.render("addSubSubCategoryForm", { subCategories });
    } catch {
        console.error(error);
    }
}

const addSubSubCategoryPostController = async (req, res) => {
    try {
        const { subSubCategory, subCategory, category } = req.body;

        if (!subSubCategory) {
            return res.redirect('back');
        }

        if (!subCategory) {
            return res.redirect('back');
        }

        if (!category) {
            return res.redirect('back');
        }

        const parentSubCategory = await subCategoryModel.findOne({
            _id: subCategory,
            category: category
        });

        if (!parentSubCategory) {
            return res.redirect('back');
        }

        const existingSubSubCategory = await subSubCategoryModel.findOne({
            subSubCategory: subSubCategory,
            subCategory: subCategory
        });

        if (existingSubSubCategory) {
            return res.redirect('back');
        }

        const newSubSubCategory = new subSubCategoryModel({
            subSubCategory: subSubCategory,
            subCategory: subCategory,
            category: category
        });

        await newSubSubCategory.save();
        res.redirect('back');
    } catch (error) {
        console.error(error);
        res.redirect('back');
    }
};
module.exports = { addSubSubCategoryPostController, addSubCategoryPostController, addSubSubCategoryController, addSubCategoryController, addProductPostController, loginController, dashboardController, signupController, signupPostController, loginPostController, logoutController, userDataController, editUserController, updateUserPostController, deleteUserController, addProductController, productsTableController, changePasswordController, changePasswordPostController, forgotPasswordController, forgotPasswordPostController, otpPageController, verifyOtpController, passwordResetController, resetPasswordController, addCategoryController, addCategoryPostController }
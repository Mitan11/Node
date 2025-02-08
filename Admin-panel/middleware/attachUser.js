const userModel = require('../models/userModel');

const attachUser = async (req, res, next) => {
    try {
        if (req.cookies && req.cookies.userData) {

            const email = req.cookies.userData.email;

            const user = await userModel.findOne({ email });

            if (user) {
                req.user = user;
            }
        }
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = attachUser;

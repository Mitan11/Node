const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            console.log(email, password);
            try {
                const user = await userModel.findOne({ email });
                if (!user) {
                    return done(null, false);
                }
                if (password === user.password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                console.log(error);
                return done(null, false);
            }
        }
    )
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

passport.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/');
    }
};

passport.attachUser = (req, res, next) => {
    res.locals.user = req.user;
    next();
}

module.exports = passport;
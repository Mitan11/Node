const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = {email , password}
                const validEmail = 'admin@gmail.com';
                const validPassword = 'admin';

                if (email === validEmail && password === validPassword) {
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
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
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
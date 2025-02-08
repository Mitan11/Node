function isLoggedIn(req, res, next) {
    const token = req.cookies.userData;

    if (!token) return res.redirect("/");

    else {
        next();
    }
}

module.exports = isLoggedIn
function isAuthenticated(req, res, next) {
    let name = req.body.name;
    let password = req.body.password;
    let isAuth = (name === 'admin' && password === 'admin') ? true : false;
    if (isAuth) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = isAuthenticated;

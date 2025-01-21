function isAuthenticated(req, res, next) {
    let name = req.body.name;
    let password = req.body.password;
    let isAuth = (name === 'admin' && password === 'admin') ? true : false;
    console.log(name , password);
    
    if (isAuth) {
        res.render('Home');
    } else {
        res.redirect('/');
    }
}

module.exports = isAuthenticated;

const login = (req, res) => {
    res.render('login')
}

const loginPost = (req, res) => {
    res.redirect('/dashboard');
};

const dashboard = (req, res) => {
    res.render('dashboard');
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

module.exports = { login, loginPost, dashboard, logout }
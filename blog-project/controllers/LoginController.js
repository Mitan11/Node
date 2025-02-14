const login = (req, res) => {
    const getdata = req.cookies.userData;
    if (getdata) {
        res.redirect('/dashboard');
    } else {
        res.render('login')
    }
}

const loginPost = (req, res) => {
    const { email, password } = req.body;

    const validEmail = 'admin@gmail.com';
    const validPassword = 'admin';

    if (email === validEmail && password === validPassword) {
        res.cookie('userData', { email , password}, { httpOnly: true });
        res.redirect('/dashboard');
    } else {
        console.log('Invalid email or password');
        res.redirect('/login');
    }
};

const dashboard = (req, res) => {
    const getdata = req.cookies.userData;

    if (!getdata) {
        return res.redirect('/');
    }

    res.render('dashboard', { getdata });
};

const logout = (req, res) => {
    res.clearCookie('userData');
    res.redirect('/');
}

module.exports = { login, loginPost, dashboard, logout }
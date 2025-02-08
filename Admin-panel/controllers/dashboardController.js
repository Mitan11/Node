const dashboardController = (req, res) => {
    res.render("dashboard")
}

const loginController = (req, res) => {
    let getData = req.cookies.userData;
    if (!getData) {
        res.render("login")
    } else {
        res.redirect("/dashboard");
    }
}

module.exports = dashboardController
module.exports = loginController
const express = require('express');
const isAuthenticated = require('./middleware/auth');

const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("index");
});

app.use(isAuthenticated)

app.get('/home', (req, res) => {
    res.render('Home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server running on http://localhost:${port}`);
});

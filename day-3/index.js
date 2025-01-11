const express = require('express');

const app = express();

const port = 8080;

app.set("view engine", "ejs");

let name = "Mitan";

app.get('/', (req, res) => {
    return res.render("index",{name});
})

app.get('/about', (req, res) => {
    return res.render("about");
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(`Your Port is running on ${port}`);
})
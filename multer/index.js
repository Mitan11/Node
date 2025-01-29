const express = require('express');
const conn = require('./config/db');
const upload = require('./config/multerconfig');
const PORT = 8080;

const app = express()

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/add", upload(), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    // res.redirect('/')
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return
    }
    conn()
    console.log(`Your server is running on ${PORT}`);
})
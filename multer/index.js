const express = require('express');
const conn = require('./config/db');
const upload = require('./config/multerconfig');
const userModel = require('./models/userModel');
const path = require('path');

const PORT = 8080;

const app = express()
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
    let user = await userModel.find({})
    res.render("index", { user });
})

app.post("/add", upload , async (req, res) => {
    let user = req.body;
    user.avatar = req.file.filename;
    try {
        await userModel.create(user);
        console.log("user created successfully");
        res.redirect("/");
    } catch (e) {
        console.log(e);
        res.redirect("/");
    }
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return
    }
    conn()
    console.log(`Your server is running on ${PORT}`);
})
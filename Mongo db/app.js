const express = require('express')
const mongoose = require('mongoose');
const container = require('./config/db');
const userModel = require('./models/userModel');

const PORT = 8080;
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
    try {
        let useData = await userModel.find({})
        console.log(useData);
        res.render('index', { useData });
    } catch (error) {
        console.log(error);
    }
})

app.get("/add-data", (req, res) => {
    res.render('form');
})

app.get("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete(id);
        console.log("User Deleted")
    } catch (error) {
        console.log(error);
    } finally {
        res.redirect('/');
    }
})

app.post("/add", async (req, res) => {
    try {
        await userModel.create(req.body);
        console.log("User Created");
    } catch (error) {
        console.error("Error creating user:", error);
    } finally {
        res.redirect('/');
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return
    }
    container();
    console.log(`Server is running on http://localhost:${PORT}`);
});
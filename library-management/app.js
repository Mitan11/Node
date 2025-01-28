const express = require("express");
const conn = require("./config/db");
const bookModel = require('./models/bookModel');

const PORT = 8080;

const app = express();

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
    try {
        const books = await bookModel.find({})
        res.render("index", { books });
    } catch (error) {
        console.log(error)
        res.render("index");
    }
})

app.get("/add-book", (req, res) => {
    res.render("add-form");
})

app.get("/edit/:id", async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id)
        res.render("edit-data", { book });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

app.get("/delete/:id", async (req, res) => {
    try {
        await bookModel.findByIdAndDelete(req.params.id)
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

app.post("/add", async (req, res) => {
    try {
        await bookModel.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

app.post("/update/:id", async (req, res) => {
    try {
        await bookModel.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error starting server", err);
        return;
    }
    conn();
    console.log(`Server started on port ${PORT}`);
});
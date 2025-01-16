const express = require('express');
const path = require('path');
const port = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs")

let todos = [
    {
        title: "Go to market",
        date: new Date().toLocaleDateString(),
        completed: false,
        priority: "Medium"
    },
    {
        title: "Watch movie",
        date: new Date().toLocaleDateString(),
        completed: false,
        priority: "Low"
    },
    {
        title: "Reading books",
        date: new Date().toLocaleDateString(),
        completed: false,
        priority: "High"
    },
    {
        title: "Morning workout",
        date: new Date().toLocaleDateString(),
        completed: false,
        priority: "Medium"
    },
    {
        title: "Complete coding project",
        date: new Date().toLocaleDateString(),
        completed: false,
        priority: "High"
    },
    {
        title: "Grocery shopping",
        date: new Date().toLocaleDateString(),
        completed: false,
        priority: "Low"
    },
    {
        title: "Meet friends",
        date: new Date().toLocaleDateString(),
        completed: false,
        priority: "Medium"
    }
];

app.get("/", (req, res) => {
    return res.render('index', { todos });
})

app.get("/add-task", (req, res) => {
    return res.render('add');
})

app.get("/edit-task/:id", (req, res) => {
    const id = req.params.id;
    const todo = todos[id];
    return res.render('update', { todo, id });
})

app.post("/add-data", (req, res) => {
    todos.push(req.body);
    return res.redirect("/");
})

app.post("/edit-data", (req, res) => {
    const id = req.body.id;
    let todo = todos[id]
    todos[id] = { ...todo, title: req.body.title, priority: req.body.priority }
    return res.redirect("/");
})

app.get("/delete/:id", (req, res) => {

    todos = todos.filter((_, i) => i != req.params.id)
    console.log(todos);
    return res.redirect("/");
})

app.get("/completed/:id", (req, res) => {
    const id = req.params.id;
    let todo = todos[id]
    todos[id] = { ...todo, completed: !todo.completed }
    return res.redirect("/");
})


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(port);
})
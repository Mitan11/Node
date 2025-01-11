const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const port = 8080;

let students = [
    { name: "Mitan", course: "React", marks: "90" },
]


app.get('/', (req, res) => {
    res.render("index", { students });
})

app.get('/add-student', (req, res) => {
    res.render("form");
})

app.post('/add-data', (req, res) => {
    students.push(req.body);
    return res.redirect("/");
})

app.get('/edit-student/:id', (req, res) => {
    const id = req.params.id;
    const student = students[req.params.id]
    return res.render("edit-form", { student, id });
})

app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    students[id] = {
        name: req.body.name,
        course: req.body.course,
        marks: req.body.marks
    };
    res.redirect('/');
})

app.get('/delete-student/:id', (req, res) => {
    let id = req.params.id;
    students = students.filter((_, i) => i != id);
    return res.redirect("/");
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(`Your server is running on http://localhost:${port}`);
})


// [
//     { "name": "Alice Johnson", "course": "React", "marks": 92 },
//     { "name": "Charlie Brown", "course": "Python", "marks": 88 },
//     { "name": "Diana Prince", "course": "JavaScript", "marks": 94 },
//     { "name": "Ethan Hunt", "course": "HTML & CSS", "marks": 89 },
//     { "name": "Fiona Gallagher", "course": "Angular", "marks": 87 },
//     { "name": "George Lopez", "course": "React Native", "marks": 91 },
//     { "name": "Hannah Baker", "course": "PHP", "marks": 84 },
//     { "name": "Ian Wright", "course": "MySQL", "marks": 90 },
//     { "name": "Jack Reacher", "course": "Flutter", "marks": 93 }
// { "name": "Bob Smith", "course": "Node.js", "marks": 85 },
// { name: "Riya", course: "Angular", marks: "85" },
// { name: "John", course: "Vue", marks: "88" },
// { name: "Alice", course: "JavaScript", marks: "92" }
//   ]

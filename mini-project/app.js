const express = require('express');
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 8080;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts")
    res.render("profile", { user });
});

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user")
    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid)
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    await post.save()
    res.redirect("/profile");
});

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user")

    res.render("edit", { post });
});

app.post('/update/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content })

    res.redirect("/profile");
});

app.get('/delete/:id', isLoggedIn, async (req, res) => {

    let post = await postModel.findOneAndDelete({ _id: req.params.id })


    res.redirect("/profile");
});

app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    let { content } = req.body;
    let post = await postModel.create({ user: user._id, content: content })
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile')
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/register', async (req, res) => {
    let { email, password, username, name, age } = req.body;
    let user = await userModel.findOne({ email })
    if (user) return res.status(500).send("User already registered")

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash,
            });
            let token = jwt.sign({ email: email, userid: user._id }, "shhh")
            res.cookie("token", token);
            res.send("registered");
        })
    })
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email })
    if (!user) return res.status(500).send("Somting Went Wrong")

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "shhh");
            res.cookie("token", token);
            return res.status(200).redirect('/profile')
        }
        else return res.redirect("/login");
    })
});

app.get('/logout', async (req, res) => {
    res.clearCookie("token");
    res.redirect("login");
});


function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");


    else {
        let data = jwt.verify(token, "shhh");
        req.user = data;
        next();
    }
}







app.listen(PORT, (err) => {
    if (err) {
        console.error("Server failed to start:", err);
        return;
    }
    console.log(`Server running at http://localhost:${PORT}`);
});

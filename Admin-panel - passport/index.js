const express = require('express');
require('dotenv').config()
const dashboardRouter = require('./routers/dashboardRouter');
const connection = require('./config/db');
const cookieParser = require("cookie-parser");
const passport = require('passport')
const session = require('express-session');

const app = express()
const port = process.env.PORT || 8080

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {  } // Expires when the browser is closed (session cookie)
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.attachUser);

app.use('/', dashboardRouter);

app.listen(port, (error) => {
    if (error) return console.log("Connection error ", error);
    connection()
    console.log(`Your server is running on  http://localhost:${port}`)
})
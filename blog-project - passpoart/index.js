const express = require('express')
const app = express()
const adminRouter = require('./routers/AdminRouter')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session');
require("dotenv").config();

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {  } // Expires when the browser is closed (session cookie)
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.attachUser);


app.use('/', adminRouter)

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000')
})
const express = require('express')
const app = express()
const adminRouter = require('./routers/AdminRouter')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')

app.use('/', adminRouter)

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000')
})
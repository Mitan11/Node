const mongoose = require('mongoose')

const connection = async ()=>{
    await mongoose.connect('mongodb://localhost:27017/users')
    console.log("DB Connected")
}

module.exports = connection
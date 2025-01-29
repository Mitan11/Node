const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/images/uplodes')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(6, function (err, name) {
            const fn = name.toString("hex") + path.extname(file.originalname);
            cb(null, file.fieldname + '-' + fn)
        })
    }
})

const upload = multer({ storage: storage })

module.exports = upload
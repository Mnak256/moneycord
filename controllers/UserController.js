const mongoose = require('mongoose')
const user = require('../models/User')

const User = mongoose.model('User')

let userController = {}

userController.getAll = function (req, res) {
    User.find({}).exec((err, users) => {
        if (err) {
            // do some fancy error handling ;)
            throw err
        }
        res.json(users)
    })
}

module.exports = userController

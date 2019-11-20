const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
})

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
}
  
UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = Math.floor(Date.now() / 1000 + (60))
    return jwt.sign({
        username: this.username,
        id: this._id,
        exp: expirationDate
    }, 'secret');
}

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        username: this.username,
        token: this.generateJWT()
    }
}

module.exports = mongoose.model('User', UserSchema)

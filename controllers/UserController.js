const mongoose = require('mongoose')
// require('../models/User') //app.js already initializes Mongoose Schema

const passport = require('passport')

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

userController._add = function (req, res) {
    const user = new User(req.query)
        user.save((err) => {
        if (err) {
            throw err // hehe
        }
        res.json(req.query)
    })
}

userController.add = function (req, res) {
    const user = req.body
    if(!user.username) {
        return res.status(422).json({
            errors: {
              username: 'is required'
            }
        })
    }
    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required'
            }
        })
    }
    const finalUser = new User(user)
    finalUser.setPassword(user.password)
    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }))
        .catch(err => {
          if (err.code === 11000) {
            res.status(422).json({
              errors: {
                  username: 'already exists'
              }
          })
          } else {
            throw err
          }
        })
}

userController.login = function (req, res, next) {
    const user = req.body
    if(!user.username) {
        return res.status(422).json({
            errors: {
              username: 'is required'
            }
        });
    }
    if(!user.password) {
      return res.status(422).json({
          errors: {
            password: 'is required'
          }
      });
    }
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      if(err) {
        return next(err)
      }
      if(passportUser) {
        const user = passportUser
        user.token = passportUser.generateJWT()
        return res.json({ user: user.toAuthJSON() })
      }
      return res.status(400).json({
        errors: {
          incorrect: 'username or password'
        }
    })
    })(req, res, next)
}

userController.profile = function (req, res, next) {
  res.json(req.payload)
}

userController.logout = function (req, res, next) {
  // no way to logout :(
  res.send('can\'t logout')
}

module.exports = userController

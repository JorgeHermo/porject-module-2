const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10


// Signup
router.get('/sign-up', (req, res, next) => res.render('auth/signup'))
router.post('/sign-up', (req, res, next) => {

    const { userPassword } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPassword, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(() => res.redirect('/'))
        .catch(error => next(new Error(error)))
})

// Login
router.get('/log-in', (req, res, next) => res.render('auth/login'))
router.post('/log-in', (req, res, next) => {

    const { email, userPassword } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email Not Registered' })
                return
            } else if (bcrypt.compareSync(userPassword, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Wrong Password' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(new Error(error)))
})

// Logout
router.post('/log-out', (req, res, next) => {
    req.session.destroy(() => res.redirect('/log-in'))
})

module.exports = router
const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10


// Signup
router.get('/sign-up', (req, res, next) => res.render('auth/signup'))
router.post('/sign-up', (req, res, next) => {

    const { userPassword } = req.body
    console.log(req.body)

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPassword, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})

// Login
router.get('/log-in', (req, res, next) => res.render('auth/login'))
router.post('/log-in', (req, res, next) => {

    const { email, userPassword, password: plainPassword } = req.body
    console.log(req.body)
    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(userPassword, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})

// Logout
router.post('/log-out', (req, res, next) => {
    req.session.destroy(() => res.redirect('/log-in'))
})

module.exports = router
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.render('auth/login', { errorMessage: 'You must log in to continue' })
    }
    next()
}

module.exports = { isLoggedIn }
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
    }
    next()
}

module.exports = { isLoggedIn }
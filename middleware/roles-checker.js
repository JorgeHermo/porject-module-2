const checkRole = (...grantedRoles) => (req, res, next) => {

    if (grantedRoles.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'WRONG CREDENTIALS' })
    }
}
 
module.exports = { checkRole }

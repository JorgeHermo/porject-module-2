const isOwnerId = (req, res, next) => {

    const isOwner = req.params._id === req.session.currentUser._id
    const isAdmin = req.session.currentUser.role === 'ADMIN'

    if (isOwner || isAdmin) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'WRONG CREDENTIALS' })
    }
}


module.exports = { isOwnerId }
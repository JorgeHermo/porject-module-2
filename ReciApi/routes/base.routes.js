const { rolesChecker } = require("../utils/checker-roles")

const router = require("express").Router()

router.get('/', (req, res, next) => {

    const roles = rolesChecker(req.session.currentUser)

    res.render('pages/index', { roles })
})

module.exports = router
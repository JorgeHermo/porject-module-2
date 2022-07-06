const { isLoggedIn } = require('../middleware/session-guards')

const router = require('express').Router()

router.get("/basic", isLoggedIn, (req, res) => res.render("maps/map-place"))

module.exports = router
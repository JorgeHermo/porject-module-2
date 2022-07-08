const { isLoggedIn } = require('../middleware/session-guards')

const router = require('express').Router()

router.get("/basic", isLoggedIn, (req, res) => res.render("recipes/list-recipes"))

module.exports = router
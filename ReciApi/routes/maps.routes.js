const router = require('express').Router()

router.get("/basic", (req, res) => res.render("maps/map-place"))

module.exports = router
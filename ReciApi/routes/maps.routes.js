const router = require("express").Router();

router.get("/basic", (req, res, next) => res.render("maps/map-place"))

module.exports = router
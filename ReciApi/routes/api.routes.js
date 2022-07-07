const router = require('express').Router()

const Recipe = require('./../models/Recipe.model')

router.get('/maps', (req, res) => {

    Recipe
        .find()
        .then(places => res.json(places))
        .catch(error => next(new Error(error)))

})

module.exports = router
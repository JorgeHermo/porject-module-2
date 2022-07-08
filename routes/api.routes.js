const router = require('express').Router()

const Recipe = require('./../models/Recipe.model')

router.get('/maps', (req, res) => {

    Recipe
        .find()
        .then(recipeInfo => res.json(recipeInfo))
        .catch(error => res.status(500).json({ message: 'server error', error }))

})

module.exports = router
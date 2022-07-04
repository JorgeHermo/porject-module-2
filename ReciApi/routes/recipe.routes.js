const router = require('express').Router()

const Recipe = require('./../models/Recipe.model')


// Create recipes (render)

router.get('/create', (req, res, next) => {
    res.render('recipes/create-recipe')
})

//Create recipe (handler)

router.post('/create', (req, res, next) => {
    const { title, ingredients, directions, category, duration, imageUrl } = req.body

    Recipe
        .create({ title, ingredients, directions, category, duration, imageUrl })
        .then(newRecipe => res.redirect('/recipes/list'))
        .catch(err => console.log(err))
})

//Recipes list
router.get('/list', (req, res, next) => {

    Recipe
        .find()
        .then(recipes => {
            res.render('recipes/list-recipes', { recipes })
        })
        .catch(err => console.log(err))
})

//recipe details

router.get('/:id/details', (req, res, next) => {

    const { id } = req.params

    Recipe
        .findById(id)
        .then(recipeData => {
            res.render('recipes/details-recipe', { recipeData })
        })
        .catch(err => console.log(err))
})

// Recipe edition (render)

router.get('/:id/edit', (req, res, next) => {

    const { id } = req.params

    Recipe
        .findById(id)
        .then(recipeDetails => res.render('/recipes/edit-recipes', recipeDetails))
        .catch(err => console.log(err))
})

// recipe edition (handler)

router.post('/:id/edit', (req, res, next) => {
    const { title, ingredients, directions, category, duration, imageUrl } = req.body
    const { id } = req.params

    Recipe
        .findByIdAndUpdate(id, { title, ingredients, directions, category, duration, imageUrl })
        .then(recipeDetails => res.redirect(`/recipes/${id}/details`))
        .catch(err => console.log(err))
})

module.exports = router
const router = require('express').Router()

const Recipe = require('./../models/Recipe.model')


// RECIPE CREATE
router.get('/create', (req, res, next) => {
    res.render('recipes/create-recipe')
})


// RECIPE CREATE
router.post('/create', (req, res, next) => {

    const { title, ingredients, directions, category, duration, imageUrl } = req.body

    Recipe
        .create({ title, ingredients, directions, category, duration, imageUrl })
        .then(() => res.redirect('/recipes/list'))
        .catch(error => next(new Error(error)))
})


// RECIPE LIST
router.get('/list', (req, res, next) => {

    Recipe
        .find()
        .then(recipes => res.render('recipes/list-recipes', { recipes }))
        .catch(error => next(new Error(error)))
})


// RECIPE DETAILS
router.get('/:id/details', (req, res, next) => {

    const { id } = req.params

    Recipe
        .findById(id)
        .then(recipeData => res.render('recipes/details-recipe', { recipeData }))
        .catch(error => next(new Error(error)))
})


// RECIPE EDITION
router.get('/:id/edit', (req, res, next) => {

    const { id } = req.params

    Recipe
        .findById(id)
        .then(recipeDetails => res.render('recipes/edit-recipe', recipeDetails))
        .catch(error => next(new Error(error)))
})


router.post('/:id/edit', (req, res, next) => {

    const { title, ingredients, directions, category, duration, imageUrl } = req.body
    const { id } = req.params

    Recipe
        .findByIdAndUpdate(id, { title, ingredients, directions, category, duration, imageUrl })
        .then(() => res.redirect(`/recipes/${id}/details`))
        .catch(error => next(new Error(error)))
})


// RECIPE DELETE
router.post('/:id/delete', (req, res, next) => {

    const { id } = req.params

    Recipe
        .findByIdAndDelete(id)
        .then(() => res.redirect('/recipes/list-recipes'))
        .catch(error => next(new Error(error)))
})


module.exports = router
const router = require('express').Router()

const Recipe = require('./../models/Recipe.model')

const { isLoggedIn } = require('../middleware/session-guards')

const uploaderConfig = require('./../config/uploader.config')

// RECIPE CREATE
router.get('/create', isLoggedIn, (req, res, next) => {
    res.render('recipes/create-recipe')
})


// RECIPE CREATE
router.post('/create', isLoggedIn, uploaderConfig.single('cover'), (req, res, next) => {

    const { title, ingredients, directions, category, duration } = req.body

    const owner = req.session.currentUser._id

    console.log(req.file)

    Recipe
        .create({ title, ingredients, directions, category, duration, imageUrl: req.file.path, owner })
        .then(() => res.redirect('/recipes/list'))
        .catch(error => next(new Error(error)))
})


// RECIPE LIST
router.get('/list', isLoggedIn, (req, res, next) => {

    Recipe
        .find()
        .then(recipes => res.render('recipes/list-recipes', { recipes }))
        .catch(error => next(new Error(error)))
})


//MY RECIPES
router.get('/my-recipes', isLoggedIn, (req, res, next) => {

    const { _id: owner } = req.session.currentUser

    console.log('..........', owner)

    Recipe
        .find({ owner })
        .then(recipes => {
            console.log('+++++++', recipes)
            res.render('recipes/my-recipes', { recipes })
        })
        .catch(error => next(new Error(error)))
})


// RECIPE DETAILS
router.get('/:id/details', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Recipe
        .findById(id)
        .populate('owner')
        .then(recipeData => res.render('recipes/details-recipe', { recipeData }))
        .catch(error => next(new Error(error)))
})


// RECIPE EDITION
router.get('/:id/edit', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Recipe
        .findById(id)
        .then(recipeDetails => res.render('recipes/edit-recipe', recipeDetails))
        .catch(error => next(new Error(error)))
})


router.post('/:id/edit', isLoggedIn, (req, res, next) => {

    const { title, ingredients, directions, category, duration, imageUrl } = req.body
    const { id } = req.params

    Recipe
        .findByIdAndUpdate(id, { title, ingredients, directions, category, duration, imageUrl })
        .then(() => res.redirect(`/recipes/${id}/details`))
        .catch(error => next(new Error(error)))
})


// RECIPE DELETE
router.post('/:id/delete', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Recipe
        .findByIdAndDelete(id)
        .then(() => res.redirect('/recipes/list-recipes'))
        .catch(error => next(new Error(error)))
})


module.exports = router
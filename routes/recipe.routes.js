const router = require('express').Router()

const Recipe = require('./../models/Recipe.model')
const Comment = require('./../models/Comment.model')

const { isLoggedIn } = require('../middleware/session-guards')
const uploaderConfig = require('./../config/uploader.config')

// RECIPE CREATE
router.get('/create', isLoggedIn, (req, res, next) => {
    res.render('recipes/create-recipe')
})


// RECIPE CREATE
router.post('/create', isLoggedIn, uploaderConfig.single('cover'), (req, res, next) => {

    const { title, ingredients, directions, description, category, duration, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    const owner = req.session.currentUser._id

    Recipe
        .create({ title, ingredients, directions, description, category, duration, location, imageUrl: req.file.path, owner })
        .then(() => res.redirect('/recipes/list'))
        .catch(error => next(new Error(error)))
})


// RECIPE LIST
router.get('/list', isLoggedIn, (req, res, next) => {

    Recipe
        .find()
        .populate('owner')
        .then(recipes => {

            let allInfo = recipes.map(recipe => {

                const ownerID = recipe.owner._id.toString()

                return {
                    isOwner: ownerID === req.session.currentUser._id,
                    recipe
                }
            })

            return allInfo
        })
        .then(allInfo => res.render('recipes/list-recipes', { allInfo }))
        .catch(error => next(new Error(error)))
})


//MY RECIPES
router.get('/my-recipes', isLoggedIn, (req, res, next) => {

    const { _id: owner } = req.session.currentUser

    Recipe
        .find({ owner })
        .then(recipes => res.render('recipes/my-recipes', { recipes }))
        .catch(error => next(new Error(error)))
})


// RECIPE DETAILS
router.get('/:id/details', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    const promises = [
        Recipe.findById(id).populate('owner'),
        Comment.find({ recipe: id })
            .populate('owner')
    ]

    Promise
        .all(promises)
        .then(([recipeData, commentsData]) => {
            res.render('recipes/details-recipe', { recipeData, commentsData })
        })
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
        .then(() => res.redirect('/recipes/list'))
        .catch(error => next(new Error(error)))
})



module.exports = router
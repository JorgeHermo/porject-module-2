const router = require("express").Router()

const Comment = require('./../models/Comment.model')

const { isLoggedIn } = require('../middleware/session-guards')


// COMMENT ROUTE
router.post('/:recipe_id/comment', isLoggedIn, (req, res, next) => {

    const { _id: owner } = req.session.currentUser
    const { recipe_id: recipe } = req.params
    const { comment } = req.body

    Comment
        .create({ owner, comment, recipe })
        .then(() => res.redirect(`/recipes/${recipe}/details`))
        .catch(error => next(new Error(error)))
})

module.exports = router
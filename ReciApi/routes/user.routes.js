const router = require("express").Router()

const User = require("../models/User.model")


//////////////////////

// User routes

//     | Route | METHOD | Description |
// | -----------------   | ---------   | -------------------------------   |
// | `/users` | GET | Retrive the user list data | DONE
// | `/user/:id/details` | GET | Retrive the user details | DONE
// | `/user/:id/edit` | GET | Retrives the user Data |
// | `/user/:id/edit` | POST | Update a specific User |
// | `/user/:id/delete` | POST | Delete a specific User |


///////////////////////

router.get('/', (req, res, next) => {

    User
        .find()
        .then(users => res.render('users/users-list', { users }))
        .catch(err => console.log(err))
})

router.get('/:id/details', (req, res, next) => {

    const { id } = req.params   

    User
        .findById(id)
        .then(user => res.render('users/user-profile', { user }))
        .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('users/user-update', { user }))
        .catch(err => console.log(err))
})
/////////////////////////////////

// router.post('/:id/edit', (req, res, next) => {

//     const { username, email, password, avatar, description, role } = req.body
//     const { id } = req.query

//     User
//         .findByIdAndUpdate(id, { username, email, password, avatar, description, role })
//         .then(user => res.redirect('/users/${user._id}'))
//         .catch(err => console.log(err))

       
// })








module.exports = router
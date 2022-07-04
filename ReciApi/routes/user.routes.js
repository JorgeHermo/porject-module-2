const router = require("express").Router()

const User = require("../models/User.model")


//////////////////////

// User routes

//     | Route | METHOD | Description |
// | -----------------   | ---------   | -------------------------------   |
// | `/users` | GET | Retrive the user list data | DONE
// | `/user/:id/details` | GET | Retrive the user details | DONE
// | `/user/:id/edit` | GET | Retrives the user Data | DONE
// | `/user/:id/edit` | POST | Update a specific User | DONE
// | `/user/:id/delete` | POST | Delete a specific User | DONE


///////////////////////

//ALL USERS

router.get('/', (req, res, next) => {

    User
        .find()
        .then(users => res.render('users/users-list', { users }))
        .catch(err => console.log(err))
})

//USER DETAILS
router.get('/:id/details', (req, res, next) => {

    const { id } = req.params   

    User
        .findById(id)
        .then(user => res.render('users/user-profile', { user }))
        .catch(err => console.log(err))
})

//EDIT USER (RENDER)
router.get('/:id/edit', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('users/user-update', { user }))
        .catch(err => console.log(err))
})

//EDIT USER (HANDLE)

router.post('/:id/edit', (req, res, next) => {


    const { username, email, password, avatar, description, role } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, email, password, avatar, description, role })
        .then(() => res.redirect(`/users/${id}/details`))
        .catch(err => console.log(err))

       
})

//DELETE USER 

router.get('/:id/delete', (req, res) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/`))
        .catch(err => console.log(err))
})







module.exports = router
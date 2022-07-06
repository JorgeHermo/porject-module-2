const router = require("express").Router()

const { checkRole } = require("../middleware/roles-checker")
const { isLoggedIn } = require('../middleware/session-guards')

router.get('/', isLoggedIn, checkRole('ADMIN'), (req, res) => {
    // res.send('Yo no arriesgo con la ruta del admin')
    res.render('admin/panel', { user: req.session.currentUser})
})
 
module.exports = router
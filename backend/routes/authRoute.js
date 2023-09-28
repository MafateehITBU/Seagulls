const express = require('express')
const router = express.Router()
const { registerAdminCtr1, loginAdminCtrl } = require('../controllers/authControllers.js')

//Register New Admin
router.post('/register', registerAdminCtr1)

//Login User
router.post('/login', loginAdminCtrl)


module.exports = router
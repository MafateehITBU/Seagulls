const express = require('express')
const router = express.Router()
const { registerUserCtr1, loginUsertrl } = require('../controllers/authTechnicianControllers.js')

//Register New User
router.post('/register', registerUserCtr1)

//Login User
router.post('/login', loginUsertrl)

module.exports = router
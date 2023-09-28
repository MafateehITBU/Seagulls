const express = require('express')
const router = express.Router()
const { getAllTechnicianCtrl } = require('../controllers/TechnicianControllers.js')


router.get('/', getAllTechnicianCtrl)


module.exports = router
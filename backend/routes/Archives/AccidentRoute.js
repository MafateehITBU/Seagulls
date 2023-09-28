const express = require('express')
const router = express.Router()
const { getAllAccidentFiltersCtrl, createTicketAccidentFiltersCtr1,
    UpdateTicketAccidentFiltersCtrl } = require('../../controllers/Archives/Accident')
const { verifyTokenAdmin } = require('../../middlewares/verifyToken.js')
const validateObjectld = require('../../middlewares/validateObjectld.js')


router.route('/')
    .get(getAllAccidentFiltersCtrl)

router.route('/:id')
    .post(verifyTokenAdmin, validateObjectld, createTicketAccidentFiltersCtr1)
    .put(verifyTokenAdmin, validateObjectld, UpdateTicketAccidentFiltersCtrl)


module.exports = router
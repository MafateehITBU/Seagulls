const express = require('express')
const router = express.Router()
const { getAllCleaningFiltersCtrl, createTicketCleaningFiltersCtr1,
    UpdateTicketCleaningFiltersCtrl } = require('../../controllers/Archives/Cleaning')
const { verifyTokenAdmin } = require('../../middlewares/verifyToken.js')
const validateObjectld = require('../../middlewares/validateObjectld.js')


router.route('/')
    .get(getAllCleaningFiltersCtrl)

router.route('/:id')
    .post(verifyTokenAdmin, validateObjectld, createTicketCleaningFiltersCtr1)
    .put(verifyTokenAdmin, validateObjectld, UpdateTicketCleaningFiltersCtrl)


module.exports = router



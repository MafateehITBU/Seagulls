const express = require('express')
const router = express.Router()
const { getAllMaintenanceFiltersCtrl, createTicketMaintenanceFiltersCtr1,
    UpdateTicketMaintenanceFiltersCtrl } = require('../../controllers/Archives/Maintenance')
const { verifyTokenAdmin } = require('../../middlewares/verifyToken.js')
const validateObjectld = require('../../middlewares/validateObjectld.js')


router.route('/')
    .get(getAllMaintenanceFiltersCtrl)

router.route('/:id')
    .post(verifyTokenAdmin, validateObjectld, createTicketMaintenanceFiltersCtr1)
    .put(verifyTokenAdmin, validateObjectld, UpdateTicketMaintenanceFiltersCtrl)


module.exports = router




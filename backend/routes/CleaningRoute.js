const express = require('express')
const router = express.Router()
const { getAllCleaningCtrl, createTicketCleaningCtr1,
    UpdateTicketCleaningCtrl, DeleteTicketCleaningCtrl, getCleaningReservations } = require('../controllers/CleaningControllers.js')
const { verifyTokenAdmin } = require('../middlewares/verifyToken.js')
const validateObjectld = require('../middlewares/validateObjectld.js')

router.route('/')
    .get(getAllCleaningCtrl)
    .post(verifyTokenAdmin, createTicketCleaningCtr1)

router.route('/showCollect')
    .get(getCleaningReservations)

router.route('/:id')
    .delete(verifyTokenAdmin, validateObjectld, DeleteTicketCleaningCtrl)
    .put(verifyTokenAdmin, validateObjectld, UpdateTicketCleaningCtrl)


module.exports = router
const express = require('express')
const router = express.Router()
const { getAllAccidentCtrl, createTicketAccidentCtr1, UpdateTicketAccidentCtrl,
    DeleteTicketAccidentCtrl, getAccidentReservations, getAccidentFillters, getTicketByID, NoOneTookTicketCtrl } = require('../controllers/AccidentControllers.js')
const { verifyTokenAdmin } = require('../middlewares/verifyToken.js')
const validateObjectld = require('../middlewares/validateObjectld.js')
const photoUpload = require('../middlewares/photoupload')

router.route('/')
    .get(getAllAccidentCtrl)
    .post(verifyTokenAdmin, photoUpload.single('sparePartsImage'), createTicketAccidentCtr1)

// router.route('/ticket/:id')
//     .get(validateObjectld, getTicketByID)

router.route('/showCollect')
    .get(getAccidentReservations)

router.route('/:id')
    .delete(verifyTokenAdmin, validateObjectld, DeleteTicketAccidentCtrl)
    .put(verifyTokenAdmin, validateObjectld, photoUpload.single('sparePartsImage'), UpdateTicketAccidentCtrl)

// router.route('/no-took/:ticket-ID')
//     .put(validateObjectld, NoOneTookTicketCtrl)

router.route('/close-ticket/:id')
    .delete(verifyTokenAdmin, validateObjectld, getAccidentFillters)


module.exports = router
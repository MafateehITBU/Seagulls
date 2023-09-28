const express = require('express')
const router = express.Router()
const { getAllMaintenanceCtrl, createTicketMaintenanceCtr1,
    UpdateTicketMaintenanceCtrl, getMaintenanceReservations,
    DeleteTicketMaintenanceCtrl, getMaintenanceFillters } = require('../controllers/MaintenanceControllers.js')
const { verifyTokenAdmin } = require('../middlewares/verifyToken.js')
const validateObjectld = require('../middlewares/validateObjectld.js')
const photoUpload = require('../middlewares/photoupload')

router.route('/')
    .get(getAllMaintenanceCtrl)
    .post(verifyTokenAdmin, photoUpload.single('sparePartsImage'), createTicketMaintenanceCtr1)


router.route('/showCollect')
    .get(getMaintenanceReservations)

router.route('/:id')
    .delete(verifyTokenAdmin, validateObjectld, DeleteTicketMaintenanceCtrl)
    .put(verifyTokenAdmin, validateObjectld, photoUpload.single('sparePartsImage'), UpdateTicketMaintenanceCtrl)


router.route('/close-ticket/:id')
    .delete(verifyTokenAdmin, validateObjectld, getMaintenanceFillters)


module.exports = router





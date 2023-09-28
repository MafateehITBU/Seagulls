const express = require('express')
const router = express.Router()
const { getApprovedTicketCtrl, approvedTicketCtrl, rejectedTicketCtrl } = require('../../controllers/IT/Approved.js')
const { verifyTokenAdmin } = require('../../middlewares/verifyToken.js')
const validateObjectld = require('../../middlewares/validateObjectld.js')


router.route('/')
    .get(getApprovedTicketCtrl)


router.route('/:id')
    .put(verifyTokenAdmin, validateObjectld, approvedTicketCtrl)

router.route('/Rejected/:id')
    .put(verifyTokenAdmin, validateObjectld, rejectedTicketCtrl)



module.exports = router


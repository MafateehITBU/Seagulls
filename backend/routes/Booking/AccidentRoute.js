const express = require('express')
const router = express.Router()
const { startWorkingTechnicianTaskCtrl, bookingTechnicianTaskCtrl,
    collectByNameCtrl, insertCrocaCtrl, editAccidentCtrl, closeAccidentCtrl } = require('../../controllers/Booking/Accident')
const { verifyToken } = require('../../middlewares/verifyToken.js')
const validateObjectld = require('../../middlewares/validateObjectld.js')
const photoUpload = require('../../middlewares/photoupload')

router.route('/start-working/:id')
    .put(verifyToken, validateObjectld, startWorkingTechnicianTaskCtrl)

router.route('/:id')
    .get(validateObjectld, collectByNameCtrl)
    .put(verifyToken, validateObjectld, bookingTechnicianTaskCtrl)

router.route('/croca/:id')
    .put(verifyToken, photoUpload.single('crocaFile'), validateObjectld, insertCrocaCtrl)

router.route('/edit-accident/:id')
    .put(
        verifyToken,
        photoUpload.fields([
            { name: 'pictureBefore', maxCount: 1 },
            { name: 'pictureAfter', maxCount: 1 }
        ]),
        validateObjectld,
        editAccidentCtrl
    );

router.route('/closed-ticket/:id')
    .put(verifyToken, validateObjectld, closeAccidentCtrl)


module.exports = router
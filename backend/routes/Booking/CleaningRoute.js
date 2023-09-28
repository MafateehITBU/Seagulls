const express = require('express')
const router = express.Router()
const { startWorkingTechnicianTaskCtrl, bookingTechnicianTaskCtrl,
    collectByNameCtrl, editCleaningCtrl, closeCleaningCtrl } = require('../../controllers/Booking/Cleaning')
const { verifyToken } = require('../../middlewares/verifyToken.js')
const validateObjectld = require('../../middlewares/validateObjectld.js')
const photoUpload = require('../../middlewares/photoupload')

router.route('/start-working/:id')
    .put(verifyToken, validateObjectld, startWorkingTechnicianTaskCtrl)

router.route('/:id')
    .get(validateObjectld, collectByNameCtrl)
    .put(verifyToken, validateObjectld, bookingTechnicianTaskCtrl)

router.route('/edit-cleaning/:id')
    .put(
        verifyToken,
        photoUpload.fields([
            { name: 'pictureBefore', maxCount: 1 },
            { name: 'pictureAfter', maxCount: 1 }
        ]),
        validateObjectld,
        editCleaningCtrl
    );

router.route('/closed-ticket/:id')
    .put(verifyToken, validateObjectld, closeCleaningCtrl)


module.exports = router
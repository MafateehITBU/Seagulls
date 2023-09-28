const express = require('express')
const router = express.Router()
const { getSparePartstCtrl, createSparePartsCtr1, UpdateSparePartsCtrl, deleteSparePartsCtrl } = require('../../controllers/SpareParts/SpareParts')
const { verifyTokenAdmin } = require('../../middlewares/verifyToken.js')
const validateObjectld = require('../../middlewares/validateObjectld.js')
const photoUpload = require('../../middlewares/photoupload')

router.route('/')
    .get(getSparePartstCtrl)
    .post(verifyTokenAdmin, photoUpload.single('sparePartsImage'), createSparePartsCtr1)

router.route('/:id')
    .put(verifyTokenAdmin, photoUpload.single('sparePartsImage'), validateObjectld, UpdateSparePartsCtrl)


router.route('/:id')
    .delete(verifyTokenAdmin, validateObjectld, deleteSparePartsCtrl)

module.exports = router


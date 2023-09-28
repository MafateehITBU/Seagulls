const express = require('express')
const router = express.Router()
const { getAssetCtrl, createAssetCtr1, getAssetByIdCtrl, UpdateAssetCtrl, deleteAssetCtrl, } = require('../../controllers/Asset/Asset')
const { verifyTokenAdmin } = require('../../middlewares/verifyToken.js')
const validateObjectld = require('../../middlewares/validateObjectld.js')
const photoUpload = require('../../middlewares/photoupload')

router.route('/')
    .get(getAssetCtrl)
    .post(verifyTokenAdmin, photoUpload.single('assetImage'), createAssetCtr1)


router.route('/:id')
    .get(validateObjectld, getAssetByIdCtrl)

router.route('/:id')
    .put(verifyTokenAdmin, photoUpload.single('assetImage'), validateObjectld, UpdateAssetCtrl)

router.route('/:id')
    .delete(verifyTokenAdmin, validateObjectld, deleteAssetCtrl)


module.exports = router


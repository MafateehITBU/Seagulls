const express = require('express')
const router = express.Router()
const { getAllVendorCtrl, createVendorCtr1, updateVendorCtrl, deleteVendorCtrl } = require('../controllers/Vendor')
const { verifyTokenAdmin } = require('../middlewares/verifyToken.js')
const validateObjectld = require('../middlewares/validateObjectld.js')

router.route('/')
    .get(getAllVendorCtrl)
    .post(verifyTokenAdmin, createVendorCtr1)

router.route('/:id')
    .put(verifyTokenAdmin, validateObjectld, updateVendorCtrl)
    .delete(verifyTokenAdmin, validateObjectld, deleteVendorCtrl)


module.exports = router
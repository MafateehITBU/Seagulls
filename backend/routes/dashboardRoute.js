const express = require('express')
const router = express.Router()
const { getAllAccidentCountCtrl, getAllMaintenanceCountCtrl,
    getAllCleaningCountCtrl, getCountCtrl, getArchivesCountCtrl,
    getLineChartCtrl } = require('../controllers/DashboardControllers.js')

router.route('/')
    .get(getCountCtrl)

router.route('/accident-count')
    .get(getAllMaintenanceCountCtrl)

router.route('/maintenance-count')
    .get(getAllAccidentCountCtrl)

router.route('/cleaning-count')
    .get(getAllCleaningCountCtrl)

router.route('/filters')
    .get(getArchivesCountCtrl)

router.route('/line-chart')
    .get(getLineChartCtrl)


module.exports = router
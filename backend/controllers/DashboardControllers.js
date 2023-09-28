const asyncHandler = require('express-async-handler')

const { Accident } = require('../models/Accident')
const { Maintenance } = require('../models/Maintenance')
const { Cleaning } = require('../models/Cleaning')

const { AccidentFilters } = require('../models/Archives/Accident')
const { MaintenanceFilters } = require('../models/Archives/Maintenance.js')
const { CleaningFilters } = require('../models/Archives/Cleaning')


/**-------------------------------------------------------------
 * @desc    Get Accident Count
 * @route   /api/Count/accident-count 
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getAllAccidentCountCtrl = asyncHandler(async (req, res) => {
    const accident = await Accident.count()
    res.status(200).json(accident)
})


/**-------------------------------------------------------------
 * @desc    Get Maintenance Count
 * @route   /api/Count/maintenance-count
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getAllMaintenanceCountCtrl = asyncHandler(async (req, res) => {
    const maintenance = await Maintenance.count()
    res.status(200).json(maintenance)
})


/**-------------------------------------------------------------
 * @desc    Get Cleaning Count
 * @route   /api/Count/cleaning-count
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getAllCleaningCountCtrl = asyncHandler(async (req, res) => {
    const cleaning = await Cleaning.count()
    res.status(200).json(cleaning)
})


/**-------------------------------------------------------------
 * @desc    Get All Data Count
 * @route   /api/Count/cleaning-count
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getCountCtrl = asyncHandler(async (req, res) => {

    let allCount = []
    const accident = await Accident.count()
    allCount.push(accident)

    const maintenance = await Maintenance.count()
    allCount.push(maintenance)

    const cleaning = await Cleaning.count()
    allCount.push(cleaning)

    //Archives Count 
    let allCountFilters = []
    const accidentFilters = await AccidentFilters.count()
    allCountFilters.push(accidentFilters)

    const maintenanceFilters = await MaintenanceFilters.count()
    allCountFilters.push(maintenanceFilters)

    const cleaningFilters = await CleaningFilters.count()
    allCountFilters.push(cleaningFilters)

    const totalCount = allCountFilters.reduce((acc, currentValue) => acc + currentValue, 0)
    allCount.push(totalCount)

    res.status(200).json(allCount)
})


/**-------------------------------------------------------------
 * @desc    Get Archives Count
 * @route   /api/Count/filter
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getArchivesCountCtrl = asyncHandler(async (req, res) => {

    let allCount = []
    const accident = await AccidentFilters.count()
    allCount.push(accident)

    const maintenance = await MaintenanceFilters.count()
    allCount.push(maintenance)

    const cleaning = await CleaningFilters.count()
    allCount.push(cleaning)

    res.status(200).json(allCount)
})


/**-------------------------------------------------------------
 * @desc    Get Line Chart Count 
 * @route   /api/Count/line-chart
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getLineChartCtrl = asyncHandler(async (req, res) => {
    try {
        const allArrayCount = []

        const dataByMonthAccidents = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const accidents = await Accident.find();
        accidents.forEach(accident => {
            const month = new Date(accident.createdAt).getMonth();
            dataByMonthAccidents[month]++;
        });
        allArrayCount.push(dataByMonthAccidents)

        const dataByMonthMaintenance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const maintenances = await Maintenance.find();
        maintenances.forEach(maintenance => {
            const month = new Date(maintenance.createdAt).getMonth();
            dataByMonthMaintenance[month]++;
        });
        allArrayCount.push(dataByMonthMaintenance)


        const dataByMonthCleaning = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const cleanings = await Cleaning.find();
        cleanings.forEach(cleaning => {
            const month = new Date(cleaning.date).getMonth();
            dataByMonthCleaning[month]++;
        });
        allArrayCount.push(dataByMonthCleaning)


        res.status(200).json(allArrayCount);
    } catch (error) {
        res.status(500).json({ error: 'A server error occurred' });
    }
});

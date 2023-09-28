const asyncHandler = require('express-async-handler')
const { MaintenanceFilters } = require('../../models/Archives/Maintenance.js')
const { Maintenance } = require('../../models/Maintenance.js')

/**-------------------------------------------------------------
 * @desc    Get Maintenance Filters 
 * @route   /api/maintenance-filters 
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getAllMaintenanceFiltersCtrl = asyncHandler(async (req, res) => {
    const maintenanceFilters = await MaintenanceFilters.find({})
    res.status(200).json(maintenanceFilters)
})


/**-------------------------------------------------------------
 * @desc    Create New Maintenance Filters
 * @route   /api/maintenance-filters/
 * @method  POST
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.createTicketMaintenanceFiltersCtr1 = asyncHandler(async (req, res) => {
    const maintenanceID = await Maintenance.findById(req.params.id);
    if (!maintenanceID) {
        return res.status(404).json({ message: "Maintenance not found" });
    }

    // create a copy of the object without the "_id" field
    const maintenanceDataWithoutId = maintenanceID.toObject({ virtuals: true });
    delete maintenanceDataWithoutId._id;

    // Create a new object on the new data
    const maintenanceFilters = new MaintenanceFilters(maintenanceDataWithoutId);

    await maintenanceFilters.save();
    await Maintenance.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: "The ticket has been moved to filters" });
});


/**-------------------------------------------------------------
 * @desc    Update Maintenance Filters   
 * @route   /api/maintenance-filters/:id
 * @method  PUT
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.UpdateTicketMaintenanceFiltersCtrl = asyncHandler(async (req, res) => {
    const maintenanceFilters = await MaintenanceFilters.findById(req.params.id);
    if (!maintenanceFilters) {
        return res.status(404).json({ message: "Maintenance not found" });
    }

    if (req.body.priority) {
        maintenanceFilters.priority = req.body.priority;
    }
    if (req.body.assetName) {
        maintenanceFilters.assetName = req.body.assetName;
    }
    if (req.body.assetType) {
        maintenanceFilters.assetType = req.body.assetType;
    }
    if (req.body.assetSubType) {
        maintenanceFilters.assetSubType = req.body.assetSubType;
    }
    if (req.body.spareparts) {
        maintenanceFilters.spareparts = req.body.spareparts;
    }
    if (req.body.location) {
        maintenanceFilters.location = req.body.location;
    }
    if (req.body.note) {
        maintenanceFilters.note = req.body.note;
    }

    const updatedMaintenanceFilters = await maintenanceFilters.save();
    res.status(200).json(updatedMaintenanceFilters);
});



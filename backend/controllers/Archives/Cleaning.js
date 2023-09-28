const asyncHandler = require('express-async-handler')
const { CleaningFilters } = require('../../models/Archives/Cleaning')
const { Cleaning } = require('../../models/Cleaning')

/**-------------------------------------------------------------
 * @desc    Get Cleaning Filters 
 * @route   /api/cleaning-filters/:id
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getAllCleaningFiltersCtrl = asyncHandler(async (req, res) => {
    const cleaningFilters = await CleaningFilters.find({})
    res.status(200).json(cleaningFilters)
})


/**-------------------------------------------------------------
 * @desc    Create New Cleaning Filters
 * @route   /api/cleaning-filters/
 * @method  POST
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.createTicketCleaningFiltersCtr1 = asyncHandler(async (req, res) => {
    const cleaningID = await Cleaning.findById(req.params.id);
    if (!cleaningID) {
        return res.status(404).json({ message: "Cleaning not found" });
    }

    // create a copy of the object without the "_id" field
    const cleaningDataWithoutId = cleaningID.toObject({ virtuals: true });
    delete cleaningDataWithoutId._id;

    // Create a new object on the new data
    const cleaningFilters = new CleaningFilters(cleaningDataWithoutId);

    await cleaningFilters.save();
    await Cleaning.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: "The ticket has been moved to filters" });
});


/**-------------------------------------------------------------
 * @desc    Update Cleaning Filters   
 * @route   /api/cleaning-filters/:id
 * @method  PUT
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.UpdateTicketCleaningFiltersCtrl = asyncHandler(async (req, res) => {
    const cleaningFilters = await CleaningFilters.findById(req.params.id);
    if (!cleaningFilters) {
        return res.status(404).json({ message: "Cleaning not found" });
    }

    if (req.body.priority) {
        cleaningFilters.priority = req.body.priority;
    }
    if (req.body.assetName) {
        cleaningFilters.assetName = req.body.assetName;
    }
    if (req.body.assetType) {
        cleaningFilters.assetType = req.body.assetType;
    }
    if (req.body.assetSubType) {
        cleaningFilters.assetSubType = req.body.assetSubType;
    }
    if (req.body.spareparts) {
        cleaningFilters.spareparts = req.body.spareparts;
    }
    if (req.body.location) {
        cleaningFilters.location = req.body.location;
    }
    if (req.body.note) {
        cleaningFilters.note = req.body.note;
    }

    const updatedCleaningFilters = await cleaningFilters.save();
    res.status(200).json(updatedCleaningFilters);
});



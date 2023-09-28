const asyncHandler = require('express-async-handler')
const { AccidentFilters } = require('../../models/Archives/Accident')
const { Accident } = require('../../models/Accident')

/**-------------------------------------------------------------
 * @desc    Get Accident Filters 
 * @route   /api/accident-filters/:id
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getAllAccidentFiltersCtrl = asyncHandler(async (req, res) => {
    const accidentFilters = await AccidentFilters.find({})
    res.status(200).json(accidentFilters)
})


/**-------------------------------------------------------------
 * @desc    Create New Accident Filters
 * @route   /api/accident-filters/
 * @method  POST
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.createTicketAccidentFiltersCtr1 = asyncHandler(async (req, res) => {
    const accidentID = await Accident.findById(req.params.id);
    if (!accidentID) {
        return res.status(404).json({ message: "Accident not found" });
    }

    // create a copy of the object without the "_id" field
    const accidentDataWithoutId = accidentID.toObject({ virtuals: true });
    delete accidentDataWithoutId._id;

    // Create a new object on the new data
    const accidentFilters = new AccidentFilters(accidentDataWithoutId);

    await accidentFilters.save();
    await Accident.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: "The ticket has been moved to filters" });
});


/**-------------------------------------------------------------
 * @desc    Update Accident Filters   
 * @route   /api/accident-filters/:id
 * @method  PUT
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.UpdateTicketAccidentFiltersCtrl = asyncHandler(async (req, res) => {
    const accidentFilters = await AccidentFilters.findById(req.params.id);
    if (!accidentFilters) {
        return res.status(404).json({ message: "Accident not found" });
    }

    if (req.body.priority) {
        accidentFilters.priority = req.body.priority;
    }
    if (req.body.assetName) {
        accidentFilters.assetName = req.body.assetName;
    }
    if (req.body.assetType) {
        accidentFilters.assetType = req.body.assetType;
    }
    if (req.body.assetSubType) {
        accidentFilters.assetSubType = req.body.assetSubType;
    }
    if (req.body.spareparts) {
        accidentFilters.spareparts = req.body.spareparts;
    }
    if (req.body.location) {
        accidentFilters.location = req.body.location;
    }
    if (req.body.note) {
        accidentFilters.note = req.body.note;
    }

    const updatedAccidentFilters = await accidentFilters.save();
    res.status(200).json(updatedAccidentFilters);
});



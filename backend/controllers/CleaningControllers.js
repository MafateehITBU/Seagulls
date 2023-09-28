const asyncHandler = require('express-async-handler')
const { Cleaning, ValidateCreateCleaning } = require('../models/Cleaning')
const { Technician } = require('../models/Technician')
const { Asset } = require('../models/Asset')
/**-------------------------------------------------------------
 * @desc    Get Cleaning 
 * @route   /api/Cleaning 
 * @method  Get
 * @access  public 
---------------------------------------------------------------*/
module.exports.getAllCleaningCtrl = asyncHandler(async (req, res) => {
    const cleaning = await Cleaning.find({})
    res.status(200).json(cleaning)
})

/**-------------------------------------------------------------
 * @desc    Get Accident 
 * @route   /api/Cleaning/showCollect
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getCleaningReservations = asyncHandler(async (req, res) => {
    const cleaning = await Cleaning.find({ openedTo: "" });
    res.status(200).json(cleaning);
});

/**-------------------------------------------------------------
 * @desc    Create New Ticket Cleaning
 * @route   /api/Cleaning/
 * @method  POST
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.createTicketCleaningCtr1 = asyncHandler(async (req, res) => {
    const currentDate = new Date();
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    const formattedDate = currentDate.toLocaleString('en-US', options);

    const cleaningData = {
        openedBy: req.user.username,
        priority: req.body.priority,
        assetID: req.body.assetName,
        assetType: req.body.assetType,
        assetSubType: req.body.assetSubType,
        location: req.body.location,
        date: req.body.date,
        time: formattedDate,
        note: req.body.note,
    }
    console.log(req.body.note)

    if (req.body.assetName) { // asset Name is ID asset 
        const asset = await Asset.findById(req.body.assetName);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }
        cleaningData.assetName = asset.assetName;
    }

    if (req.body.openedTo && req.body.openedTo !== " ") {
        const technician = await Technician.findById(req.body.openedTo);
        if (!technician) {
            return res.status(404).json({ message: "Technician not found" });
        }

        cleaningData.openedTo = technician.username;
        cleaningData.openedToID = technician._id;
    }

    const cleaning = new Cleaning(cleaningData);
    await cleaning.save()
    res.status(200).json({ message: "The ticket has been created successfully" })
})


/**-------------------------------------------------------------
 * @desc    Update Ticket Cleaning   
 * @route   /api/Cleaning/:id
 * @method  PUT
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.UpdateTicketCleaningCtrl = asyncHandler(async (req, res) => {
    const cleaning = await Cleaning.findById(req.params.id);
    if (!cleaning) {
        return res.status(404).json({ message: "Cleaning not found" });
    }

    if (req.body.openedTo) {
        const openedToId = req.body.openedTo.trim();
        if (openedToId !== "") {
            const technician = await Technician.findById(openedToId);
            if (!technician) {
                return res.status(404).json({ message: "Technician not found" });
            }
            cleaning.openedTo = technician.username;
            cleaning.openedToID = technician._id;
        } else {
            cleaning.openedTo = "";
            cleaning.openedToID = "";
        }
    }

    if (req.body.priority) {
        cleaning.priority = req.body.priority;
    }

    if (req.body.assetName) {
        cleaning.assetID = req.body.assetName;

        const asset = await Asset.findById(req.body.assetName);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }
        cleaning.assetName = asset.assetName;
    }

    if (req.body.assetType) {
        cleaning.assetType = req.body.assetType;
    }
    if (req.body.assetSubType) {
        cleaning.assetSubType = req.body.assetSubType;
    }
    if (req.body.spareparts) {
        cleaning.spareparts = req.body.spareparts;
    }
    if (req.body.location) {
        cleaning.location = req.body.location;
    }
    if (req.body.date) {
        cleaning.date = req.body.date;
    }
    if (req.body.note) {
        cleaning.note = req.body.note;
    }

    const updatedAccident = await cleaning.save();
    res.status(200).json(updatedAccident);
});

/**-------------------------------------------------------------
 * @desc    Delete Ticket Cleaning  
 * @route   /api/Cleaning/:id
 * @method  Delete
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.DeleteTicketCleaningCtrl = asyncHandler(async (req, res) => {
    const cleaning = await Cleaning.findById(req.params.id)
    if (!cleaning) {
        res.status(404).json({ message: "Ticket Cleaning not found" })
    }

    if (cleaning.pictureBefore.publicId !== null) {
        await cloudinaryRemoveImage(cleaning.pictureBefore.publicId)
    }

    if (cleaning.pictureAfter.publicId !== null) {
        await cloudinaryRemoveImage(cleaning.pictureAfter.publicId)
    }

    await Cleaning.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "The ticket has been Deleted successfully" })
})


const asyncHandler = require('express-async-handler')
const { Accident } = require('../models/Accident')
const { AccidentFilters } = require('../models/Archives/Accident')
const fs = require('fs')
const path = require('path')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../utils/cloudinary')
const { Technician } = require('../models/Technician')
const { Asset } = require('../models/Asset')

/**-------------------------------------------------------------
 * @desc    Get Accident 
 * @route   /api/Accident 
 * @method  Get
 * @access  public  
---------------------------------------------------------------*/
module.exports.getAllAccidentCtrl = asyncHandler(async (req, res) => {
    const accident = await Accident.find({})
    res.status(200).json(accident)
})

/**-------------------------------------------------------------
 * @desc    Get Accident 
 * @route   /api/Accident/showCollect
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getAccidentReservations = asyncHandler(async (req, res) => {
    const accident = await Accident.find({ openedTo: " " });
    res.status(200).json(accident);
});


/**-------------------------------------------------------------
 * @desc    Create New Ticket Accident
 * @route   /api/Accident/
 * @method  POST
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.createTicketAccidentCtr1 = asyncHandler(async (req, res) => {
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);

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

    const accidentData = {
        openedBy: req.user.username,
        priority: req.body.priority,
        assetID: req.body.assetName,
        assetType: req.body.assetType,
        assetSubType: req.body.assetSubType,
        sparePartsName: req.body.sparePartsName,
        location: req.body.location,
        issueDiscrption: req.body.issue,
        time: formattedDate,
        sparePartsImage: {
            url: result.secure_url,
            publicId: result.public_id
        }
    };

    if (req.body.assetName) {
        const asset = await Asset.findById(req.body.assetName);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        accidentData.assetName = asset.assetName;
    }

    if (req.body.openedTo && req.body.openedTo !== " ") {
        const technician = await Technician.findById(req.body.openedTo);
        if (!technician) {
            return res.status(404).json({ message: "Technician not found" });
        }

        accidentData.openedTo = technician.username;
        accidentData.openedToID = technician._id;
        accidentData.openedTo = technician.username;

        // technician.assigned.push(Object.assign({}, accidentData));
        await technician.save();
    }

    fs.unlinkSync(imagePath);

    const accident = new Accident(accidentData);
    await accident.save();

    res.status(200).json({ message: "The ticket has been created successfully" });
});

/**-------------------------------------------------------------
 * @desc    Update Ticket Accident   
 * @route   /api/Accident/:id
 * @method  PUT
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.UpdateTicketAccidentCtrl = asyncHandler(async (req, res) => {
    const accident = await Accident.findById(req.params.id);
    if (!accident) {
        return res.status(404).json({ message: "Accident not found" });
    }

    if (req.file) {
        await cloudinaryRemoveImage(accident.sparePartsImage.publicId)

        const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
        const result = await cloudinaryUploadImage(imagePath)
        accident.set({ 'sparePartsImage.url': result.secure_url });
        accident.set({ 'sparePartsImage.publicId': result.public_id });
        fs.unlinkSync(imagePath);
    }
    if (req.body.openedTo) {
        const openedToId = req.body.openedTo.trim();
        if (openedToId !== "") {
            const technician = await Technician.findById(openedToId);
            if (!technician) {
                return res.status(404).json({ message: "Technician not found" });
            }
            accident.openedTo = technician.username;
            accident.openedToID = technician._id;
        } else {
            accident.openedTo = "";
            accident.openedToID = "";
        }
    }

    if (req.body.priority) {
        accident.priority = req.body.priority;
    }
    if (req.body.assetName) {
        accident.assetID = req.body.assetName;

        const asset = await Asset.findById(req.body.assetName);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }
        accident.assetName = asset.assetName;
    }
    if (req.body.assetType) {
        accident.assetType = req.body.assetType;
    }
    if (req.body.assetSubType) {
        accident.assetSubType = req.body.assetSubType;
    }
    if (req.body.spareparts) {
        accident.sparePartsName = req.body.spareparts;
    }
    if (req.body.location) {
        accident.location = req.body.location;
    }
    if (req.body.issue) {
        accident.issueDiscrption = req.body.issue;
    }

    const updatedAccident = await accident.save();
    res.status(200).json(updatedAccident);
});

/**-------------------------------------------------------------
 * @desc    Update Ticket Accident No one took it
 * @route   /api/Accident/no-took/:ticket-ID
 * @method  PUT
 * @access  private ( Token )
---------------------------------------------------------------*/
// module.exports.NoOneTookTicketCtrl = asyncHandler(async (req, res) => {
//     const accident = await Accident.findById(req.params.id);
//     if (!accident) {
//         return res.status(404).json({ message: "Accident not found" });
//     }
//     accident.openedTo = req.body.openedTo;

//     const updatedAccident = await accident.save();
//     res.status(200).json(updatedAccident);
// });


/**-------------------------------------------------------------
 * @desc    CLose Ticket Go to Fillters Accident 
 * @route   /api/Accident/close-ticket/:id
 * @method  PUT  
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getAccidentFillters = asyncHandler(async (req, res) => {
    const accident = await Accident.findById(req.params.id);
    if (!accident) {
        return res.status(404).json({ message: "Accident not found" });
    }
    accident.TicketID = req.params.id

    const accidentCopy = new AccidentFilters({
        ...accident.toObject(),
    });

    await Accident.findByIdAndDelete(req.params.id);

    const savedAccidentFilters = await accidentCopy.save();

    res.status(200).json(savedAccidentFilters);
});

/**-------------------------------------------------------------
 * @desc    Delete Ticket Accident  
 * @route   /api/Accident/:id
 * @method  Delete
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.DeleteTicketAccidentCtrl = asyncHandler(async (req, res) => {
    const accident = await Accident.findById(req.params.id)
    if (!accident) {
        return res.status(404).json({ message: "Ticket Accident not found" })
    }

    if (accident.pictureBefore.publicId !== null) {
        await cloudinaryRemoveImage(accident.pictureBefore.publicId)
    }

    if (accident.pictureAfter.publicId !== null) {
        await cloudinaryRemoveImage(accident.pictureAfter.publicId)
    }

    if (accident.sparePartsImage.publicId !== null) {
        await cloudinaryRemoveImage(accident.sparePartsImage.publicId)
    }

    if (accident.Croca.publicId !== null) {
        await cloudinaryRemoveImage(accident.Croca.publicId)
    }

    await Accident.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "The ticket has been Deleted successfully" })
})














const asyncHandler = require('express-async-handler')
const { Maintenance, ValidateCreateMaintenance } = require('../models/Maintenance')
const { MaintenanceFilters } = require('../models/Archives/Maintenance')
const fs = require('fs')
const path = require('path')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../utils/cloudinary')
const { Technician } = require('../models/Technician')
const { Asset } = require('../models/Asset')


/**-------------------------------------------------------------
 * @desc    Get Maintenance 
 * @route   /api/Maintenance 
 * @method  Get
 * @access  public 
---------------------------------------------------------------*/
module.exports.getAllMaintenanceCtrl = asyncHandler(async (req, res) => {
    const maintenance = await Maintenance.find({})
    res.status(200).json(maintenance)
})

/**-------------------------------------------------------------
 * @desc    Get Accident 
 * @route   /api/Maintenance/showCollect
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getMaintenanceReservations = asyncHandler(async (req, res) => {
    const maintenance = await Maintenance.find({ openedTo: "" });
    res.status(200).json(maintenance);
});

/**-------------------------------------------------------------
 * @desc    Create New Ticket Maintenance
 * @route   /api/Maintenance/
 * @method  POST
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.createTicketMaintenanceCtr1 = asyncHandler(async (req, res) => {
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

    const maintenanceData = {
        openedBy: req.user.username,
        priority: req.body.priority,
        assetID: req.body.assetName,
        assetName: req.body.assetName,
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

    if (req.body.assetName) { // asset NAme is ID asset 
        const asset = await Asset.findById(req.body.assetName);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }
        maintenanceData.assetName = asset.assetName;
    }

    if (req.body.openedTo && req.body.openedTo !== " ") {
        const technician = await Technician.findById(req.body.openedTo);
        if (!technician) {
            return res.status(404).json({ message: "Technician not found" });
        }

        maintenanceData.openedTo = technician.username;
        maintenanceData.openedToID = technician._id;
        maintenanceData.openedTo = technician.username;

        // technician.assigned.push(Object.assign({}, accidentData));
        await technician.save();
    }

    fs.unlinkSync(imagePath);

    const maintenance = new Maintenance(maintenanceData);
    await maintenance.save();

    res.status(200).json({ message: "The ticket has been created successfully" });
})

/**-------------------------------------------------------------
 * @desc    Update Ticket Maintenance   
 * @route   /api/Maintenance/:id
 * @method  PUT
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.UpdateTicketMaintenanceCtrl = asyncHandler(async (req, res) => {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
        return res.status(404).json({ message: "Msaintenance not found" });
    }

    if (req.file) {
        await cloudinaryRemoveImage(maintenance.sparePartsImage.publicId)

        const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
        const result = await cloudinaryUploadImage(imagePath)
        maintenance.set({ 'sparePartsImage.url': result.secure_url });
        maintenance.set({ 'sparePartsImage.publicId': result.public_id });
    }
    if (req.body.openedTo) {
        const openedToId = req.body.openedTo.trim();
        if (openedToId !== "") {
            const technician = await Technician.findById(openedToId);
            if (!technician) {
                return res.status(404).json({ message: "Technician not found" });
            }
            maintenance.openedTo = technician.username;
            maintenance.openedToID = technician._id;
        } else {
            maintenance.openedTo = "";
            maintenance.openedToID = "";
        }
    }

    if (req.body.priority) {
        maintenance.priority = req.body.priority;
    }
    if (req.body.assetName) {
        maintenance.assetID = req.body.assetName;

        const asset = await Asset.findById(req.body.assetName);
        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }
        maintenance.assetName = asset.assetName;
    }
    if (req.body.assetType) {
        maintenance.assetType = req.body.assetType;
    }
    if (req.body.assetSubType) {
        maintenance.assetSubType = req.body.assetSubType;
    }
    if (req.body.spareparts) {
        maintenance.spareparts = req.body.spareparts;
    }
    if (req.body.location) {
        maintenance.location = req.body.location;
    }
    if (req.body.issue) {
        maintenance.issueDiscrption = req.body.issue;
    }

    const updatedMaintenance = await maintenance.save();
    res.status(200).json(updatedMaintenance);
});

/**-------------------------------------------------------------
 * @desc    CLose Ticket Go to Fillters Accident 
 * @route   /api/Maintenance/close-ticket/:id
 * @method  PUT  
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getMaintenanceFillters = asyncHandler(async (req, res) => {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
    }

    maintenance.TicketID = req.params.id

    const maintenanceCopy = new MaintenanceFilters({
        ...maintenance.toObject(),
    });

    await Maintenance.findByIdAndDelete(req.params.id);

    const savedMaintenanceFilters = await maintenanceCopy.save();

    res.status(200).json(savedMaintenanceFilters);
});

/**-------------------------------------------------------------
 * @desc    Delete Ticket Maintenance  
 * @route   /api/Maintenance/:id
 * @method  Delete
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.DeleteTicketMaintenanceCtrl = asyncHandler(async (req, res) => {
    const maintenance = await Maintenance.findById(req.params.id)
    if (!maintenance) {
        return res.status(404).json({ message: "Ticket Maintenance not found" })
    }

    if (maintenance.pictureBefore.publicId !== null) {
        await cloudinaryRemoveImage(maintenance.pictureBefore.publicId)
    }

    if (maintenance.pictureAfter.publicId !== null) {
        await cloudinaryRemoveImage(maintenance.pictureAfter.publicId)
    }

    if (maintenance.sparePartsImage.publicId !== null) {
        await cloudinaryRemoveImage(maintenance.sparePartsImage.publicId)
    }

    await Maintenance.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "The ticket has been Deleted successfully" })
})





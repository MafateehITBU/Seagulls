const asyncHandler = require('express-async-handler')
const fs = require('fs')
const path = require('path')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../../utils/cloudinary')
const { Technician } = require('../../models/Technician')
const { Accident } = require('../../models/Accident')
const { Asset } = require('../../models/Asset')


/**-------------------------------------------------------------
 * @desc    Booking Technician
 * @route   /api/technician/start-working/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.startWorkingTechnicianTaskCtrl = asyncHandler(async (req, res) => {
    const accident = await Accident.findById(req.params.id);
    if (!accident) {
        return res.status(404).json({ message: "Accident not found" });
    }

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


    accident.startTime = formattedDate
    accident.status = "in progress"

    await accident.save();

    res.status(200).json(accident)
})


/**-------------------------------------------------------------
 * @desc    Booking Technician
 * @route   /api/technician/booking/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.bookingTechnicianTaskCtrl = asyncHandler(async (req, res) => {
    const technician = await Technician.findById(req.user.id).select('-password')
    if (!technician) {
        return res.status(404).json({ message: "Technician not found" });
    }

    const accident = await Accident.findById(req.params.id)
    if (!accident) {
        return res.status(404).json({ message: "Technician not found" });
    }

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

    accident.openedTo = technician.username
    accident.openedToID = technician._id
    accident.status = "in progress"
    // accident.startTime = formattedDate

    if (technician.task.length > 0) {
        return res.status(403).json({ message: "You cannot add more than one task" });
    }

    await accident.save();

    res.status(200).json(technician)
})


/**-------------------------------------------------------------
 * @desc    Booking Technician Searched by name
 * @route   /api/technician/booking/:id
 * @method  GET 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.collectByNameCtrl = asyncHandler(async (req, res) => {

    const accident = await Accident.find({
        openedToID: req.params.id,
        done: { $eq: "" }
    });

    if (!accident) {
        return res.status(404).json({ message: "Technician not found" });
    }

    res.status(200).json(accident)
})

/**-------------------------------------------------------------
 * @desc    Get Ticket By Id
 * @route   /api/technician/ticket/:id
 * @method  GET 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getTicketByID = asyncHandler(async (req, res) => {

    const accident = await Accident.findB(req.params.id);

    if (!accident) {
        return res.status(404).json({ message: "Technician not found" });
    }

    res.status(200).json(accident)
})



/**-------------------------------------------------------------
 * @desc    Booking Technician Set Croca 
 * @route   /api/technician/booking/croca/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.insertCrocaCtrl = asyncHandler(async (req, res) => {
    let imagePath;
    let result;

    if (req.file) {
        imagePath = path.join(__dirname, `../../images/${req.file.filename}`);
        result = await cloudinaryUploadImage(imagePath);
        fs.unlinkSync(imagePath);
    }

    const accident = await Accident.findById(req.params.id);
    if (!accident) {
        return res.status(404).json({ message: "Accident not found" });
    }

    accident.set({ 'Croca.typeCroca': req.body.accidentStatus });

    if (req.body.selectedCost) {
        accident.set({ 'Croca.Cost': req.body.selectedCost });
    }

    if (req.file) {
        accident.set({ 'Croca.url': result.secure_url });
        accident.set({ 'Croca.publicId': result.public_id });
    }

    await accident.save();

    res.status(200).json(accident);
})



/**-------------------------------------------------------------
 * @desc    Booking Technician Edit Ticket
 * @route   /api/technician/booking/edit-accident/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.editAccidentCtrl = asyncHandler(async (req, res) => {
    const accident = await Accident.findById(req.params.id);
    if (!accident) {
        return res.status(404).json({ message: "Accident not found" });
    }

    let imagePath1;
    let result1;
    let imagePath2;
    let result2;

    if (req.files.pictureBefore) {
        imagePath1 = path.join(__dirname, `../../images/${req.files.pictureBefore[0].filename}`);
        result1 = await cloudinaryUploadImage(imagePath1);
        fs.unlinkSync(imagePath1);

        if (accident.pictureBefore && accident.pictureBefore.publicId) {
            await cloudinaryRemoveImage(accident.pictureBefore.publicId);
        }

        accident.pictureBefore = {
            url: result1.secure_url,
            publicId: result1.public_id
        };
    }

    if (req.files.pictureAfter) {
        imagePath2 = path.join(__dirname, `../../images/${req.files.pictureAfter[0].filename}`);
        result2 = await cloudinaryUploadImage(imagePath2);
        fs.unlinkSync(imagePath2);

        if (accident.pictureAfter && accident.pictureAfter.publicId) {
            await cloudinaryRemoveImage(accident.pictureAfter.publicId);
        }

        accident.pictureAfter = {
            url: result2.secure_url,
            publicId: result2.public_id
        };
    }

    if (req.body.report) {
        accident.report = req.body.report
    }
    if (req.body.requiredSpareParts) {
        accident.requiredSpareParts = req.body.requiredSpareParts
    }

    await accident.save();

    res.status(200).json(accident);
});


/**-------------------------------------------------------------
 * @desc    Close Ticket 
 * @route   /api/technician/closed-ticket/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.closeAccidentCtrl = asyncHandler(async (req, res) => {
    const accident = await Accident.findById(req.params.id);
    if (!accident) {
        return res.status(404).json({ message: "Accident not found" });
    }

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
    accident.done = "done"
    accident.status = "close"
    accident.endTime = formattedDate

    const asset = await Asset.findById(accident.assetID.toString());
    if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
    }

    const maintenanceAsset = {
        IdTicket: accident._id,
        openedBy: accident.openedBy,
        openedTo: accident.openedTo,
        sparePartsName: accident.sparePartsName,
        Date: accident.time,
    }

    asset.maintenanceReports.push(maintenanceAsset)

    asset.save()
    accident.save()
    res.status(200).json(accident);
});


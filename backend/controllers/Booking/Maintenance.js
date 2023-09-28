const asyncHandler = require('express-async-handler')
const fs = require('fs')
const path = require('path')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../../utils/cloudinary')
const { Technician } = require('../../models/Technician')
const { Maintenance } = require('../../models/Maintenance')
const { Asset } = require('../../models/Asset')


/**-------------------------------------------------------------
 * @desc    Booking Technician
 * @route   /api/technician/maintenance-booking/start-working/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.startWorkingTechnicianTaskCtrl = asyncHandler(async (req, res) => {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
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


    maintenance.startTime = formattedDate
    maintenance.status = "in progress"

    await maintenance.save();

    res.status(200).json(maintenance)
})


/**-------------------------------------------------------------
 * @desc    Booking Technician
 * @route   /api/technician/maintenance-booking/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.bookingTechnicianTaskCtrl = asyncHandler(async (req, res) => {
    const technician = await Technician.findById(req.user.id).select('-password')
    if (!technician) {
        return res.status(404).json({ message: "Technician not found" });
    }

    const maintenance = await Maintenance.findById(req.params.id)
    if (!maintenance) {
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

    maintenance.openedTo = technician.username
    maintenance.openedToID = technician._id
    maintenance.status = "in progress"
    // maintenance.startTime = formattedDate

    if (technician.task.length > 0) {
        return res.status(403).json({ message: "You cannot add more than one task" });
    }

    await maintenance.save();

    res.status(200).json(technician)
})


/**-------------------------------------------------------------
 * @desc    Booking Technician Searched by name
 * @route   /api/technician/maintenance-booking/:id
 * @method  GET 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.collectByNameCtrl = asyncHandler(async (req, res) => {

    const maintenance = await Maintenance.find({
        openedToID: req.params.id,
        done: { $eq: "" }
    });

    if (!maintenance) {
        return res.status(404).json({ message: "Technician not found" });
    }

    res.status(200).json(maintenance)
})

/**-------------------------------------------------------------
 * @desc    Get Ticket By Id
 * @route   /api/technician/maintenance-booking/ticket/:id
 * @method  GET 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getTicketByID = asyncHandler(async (req, res) => {

    const maintenance = await Maintenance.findB(req.params.id);

    if (!maintenance) {
        return res.status(404).json({ message: "Technician not found" });
    }

    res.status(200).json(maintenance)
})


/**-------------------------------------------------------------
 * @desc    Booking Technician Edit Ticket
 * @route   /api/technician/maintenance-booking/edit-maintenance/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.editMaintenanceCtrl = asyncHandler(async (req, res) => {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
    }

    let imagePath1;
    let result1;
    let imagePath2;
    let result2;

    if (req.files.pictureBefore) {
        imagePath1 = path.join(__dirname, `../../images/${req.files.pictureBefore[0].filename}`);
        result1 = await cloudinaryUploadImage(imagePath1);
        fs.unlinkSync(imagePath1);

        if (maintenance.pictureBefore && maintenance.pictureBefore.publicId) {
            await cloudinaryRemoveImage(maintenance.pictureBefore.publicId);
        }

        if (result1 && result1.secure_url) {
            maintenance.pictureBefore = {
                url: result1.secure_url,
                publicId: result1.public_id
            };
        }
    }

    if (req.files.pictureAfter) {
        imagePath2 = path.join(__dirname, `../../images/${req.files.pictureAfter[0].filename}`);
        result2 = await cloudinaryUploadImage(imagePath2);
        fs.unlinkSync(imagePath2);

        if (maintenance.pictureAfter && maintenance.pictureAfter.publicId) {
            await cloudinaryRemoveImage(maintenance.pictureAfter.publicId);
        }

        if (result2 && result2.secure_url) {
            maintenance.pictureAfter = {
                url: result2.secure_url,
                publicId: result2.public_id
            };
        }
    }


    if (req.body.report) {
        maintenance.report = req.body.report
    }
    if (req.body.requiredSpareParts) {
        maintenance.requiredSpareParts = req.body.requiredSpareParts
    }

    await maintenance.save();

    res.status(200).json(maintenance);
});


/**-------------------------------------------------------------
 * @desc    Close Ticket 
 * @route   /api/technician/maintenance-booking/closed-ticket/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.closeMaintenanceCtrl = asyncHandler(async (req, res) => {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
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

    maintenance.done = "done"
    maintenance.status = "close"
    maintenance.endTime = formattedDate


    const asset = await Asset.findById(maintenance.assetID.toString());
    if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
    }

    const maintenanceAsset = {
        IdTicket: maintenance._id,
        openedBy: maintenance.openedBy,
        openedTo: maintenance.openedTo,
        sparePartsName: maintenance.sparePartsName,
        Date: maintenance.time,
    }

    asset.maintenanceReports.push(maintenanceAsset)

    asset.save()
    maintenance.save()
    res.status(200).json(maintenance);
});


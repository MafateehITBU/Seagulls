const asyncHandler = require('express-async-handler')
const fs = require('fs')
const path = require('path')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../../utils/cloudinary')
const { Technician } = require('../../models/Technician')
const { Cleaning } = require('../../models/Cleaning')
const { Asset } = require('../../models/Asset')
const { CleaningFilters } = require('../../models/Archives/Cleaning')

/**-------------------------------------------------------------
 * @desc    Booking Technician
 * @route   /api/technician/cleaning-booking/start-working/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.startWorkingTechnicianTaskCtrl = asyncHandler(async (req, res) => {
    const cleaning = await Cleaning.findById(req.params.id);
    if (!cleaning) {
        return res.status(404).json({ message: "Cleaning not found" });
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


    cleaning.startTime = formattedDate
    cleaning.status = "in progress"

    await cleaning.save();

    res.status(200).json(cleaning)
})


/**-------------------------------------------------------------
 * @desc    Booking Technician
 * @route   /api/technician/cleaning-booking/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.bookingTechnicianTaskCtrl = asyncHandler(async (req, res) => {
    const technician = await Technician.findById(req.user.id).select('-password')
    if (!technician) {
        return res.status(404).json({ message: "Technician not found" });
    }

    const cleaning = await Cleaning.findById(req.params.id)
    if (!cleaning) {
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

    cleaning.openedTo = technician.username
    cleaning.openedToID = technician._id
    cleaning.status = "in progress"
    cleaning.startTime = formattedDate

    if (technician.task.length > 0) {
        return res.status(403).json({ message: "You cannot add more than one task" });
    }

    await cleaning.save();

    res.status(200).json(technician)
})


/**-------------------------------------------------------------
 * @desc    Booking Technician Searched by name
 * @route   /api/technician/cleaning-booking/:id
 * @method  GET 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.collectByNameCtrl = asyncHandler(async (req, res) => {

    const cleaning = await Cleaning.find({
        openedToID: req.params.id,
        done: { $eq: "" }
    });

    if (!cleaning) {
        return res.status(404).json({ message: "Technician not found" });
    }

    res.status(200).json(cleaning)
})


/**-------------------------------------------------------------
 * @desc    Get Ticket By Id
 * @route   /api/technician/cleaning-booking/ticket/:id
 * @method  GET 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getTicketByID = asyncHandler(async (req, res) => {

    const cleaning = await Cleaning.findB(req.params.id);

    if (!cleaning) {
        return res.status(404).json({ message: "Technician not found" });
    }

    res.status(200).json(cleaning)
})


/**-------------------------------------------------------------
 * @desc    Booking Technician Edit Ticket
 * @route   /api/technician/cleaning-booking/edit-cleaning/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.editCleaningCtrl = asyncHandler(async (req, res) => {
    const cleaning = await Cleaning.findById(req.params.id);
    if (!cleaning) {
        return res.status(404).json({ message: "Cleaning not found" });
    }

    let imagePath1;
    let result1;
    let imagePath2;
    let result2;

    if (req.files.pictureBefore) {
        imagePath1 = path.join(__dirname, `../../images/${req.files.pictureBefore[0].filename}`);
        result1 = await cloudinaryUploadImage(imagePath1);
        fs.unlinkSync(imagePath1);

        if (cleaning.pictureBefore && cleaning.pictureBefore.publicId) {
            await cloudinaryRemoveImage(cleaning.pictureBefore.publicId);
        }

        if (result1 && result1.secure_url) {
            cleaning.pictureBefore = {
                url: result1.secure_url,
                publicId: result1.public_id
            };
        }
    }

    if (req.files.pictureAfter) {
        imagePath2 = path.join(__dirname, `../../images/${req.files.pictureAfter[0].filename}`);
        result2 = await cloudinaryUploadImage(imagePath2);
        fs.unlinkSync(imagePath2);

        if (cleaning.pictureAfter && cleaning.pictureAfter.publicId) {
            await cloudinaryRemoveImage(cleaning.pictureAfter.publicId);
        }

        if (result2 && result2.secure_url) {
            cleaning.pictureAfter = {
                url: result2.secure_url,
                publicId: result2.public_id
            };
        }
    }


    if (req.body.report) {
        cleaning.report = req.body.report
    }
    if (req.body.requiredSpareParts) {
        cleaning.requiredSpareParts = req.body.requiredSpareParts
    }

    await cleaning.save();

    res.status(200).json(cleaning);
});


/**-------------------------------------------------------------
 * @desc    Close Ticket 
 * @route   /api/technician/cleaning-booking/closed-ticket/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.closeCleaningCtrl = asyncHandler(async (req, res) => {
    const cleaning = await Cleaning.findById(req.params.id);
    if (!cleaning) {
        return res.status(404).json({ message: "Cleaning not found" });
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

    cleaning.done = "done"
    cleaning.status = "close"
    cleaning.endTime = formattedDate


    const asset = await Asset.findById(cleaning.assetID.toString());
    if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
    }

    const cleaningAsset = {
        IdTicket: cleaning._id,
        openedBy: cleaning.openedBy,
        openedTo: cleaning.openedTo,
        sparePartsName: "Cleaning",
        Date: cleaning.time,
    }

    asset.maintenanceReports.push(cleaningAsset)

    cleaning.TicketID = req.params.id

    const cleaningCopy = new CleaningFilters({
        ...cleaning.toObject(),
    });

    await Cleaning.findByIdAndDelete(req.params.id);
    await cleaningCopy.save();
    await asset.save();
    res.status(200).json(cleaning);
});


const asyncHandler = require('express-async-handler')
const { SpareParts } = require('../../models/SpareParts')
const fs = require('fs')
const path = require('path')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../../utils/cloudinary')

/**-------------------------------------------------------------
 * @desc    Get SpareParts 
 * @route   /api/SpareParts
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getSparePartstCtrl = asyncHandler(async (req, res) => {
    const spareParts = await SpareParts.find({})
    res.status(200).json(spareParts)
})

/**-------------------------------------------------------------
 * @desc    Create SpareParts
 * @route   /api/SpareParts/
 * @method  POST
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.createSparePartsCtr1 = asyncHandler(async (req, res) => {
    const partBarCode = await SpareParts.findOne({ partBarCode: req.body.partBarCode })

    if (partBarCode) {
        return res.status(400).json({ message: "Spare Parts already exist" })
    }

    const imagePath = path.join(__dirname, `../../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);

    const sparePartsData = {
        partNo: req.body.partNo,
        partBarCode: req.body.partBarCode,
        partName: req.body.partName,
        vendor: req.body.vendor,
        quantity: req.body.quantity,
        sparePartsImage: {
            url: result.secure_url,
            publicId: result.public_id
        },
        minimumStock: req.body.minimumStock,
        maximumStock: req.body.maximumStock,
        expiryData: req.body.expiryData,
        leadTime: req.body.leadTime,
        storageType: req.body.storageType,
    };

    fs.unlinkSync(imagePath);

    const spareParts = new SpareParts(sparePartsData);
    await spareParts.save();

    res.status(200).json({ message: "The Spare Parts has been created successfully" });
});


/**-------------------------------------------------------------
 * @desc    Update Spare Parts   
 * @route   /api/SpareParts/:id
 * @method  PUT
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.UpdateSparePartsCtrl = asyncHandler(async (req, res) => {

    const spareParts = await SpareParts.findById(req.params.id);
    if (!spareParts) {
        return res.status(404).json({ message: "Spare parts not found" });
    }

    if (req.file) {
        await cloudinaryRemoveImage(spareParts.sparePartsImage.publicId)
        const imagePath = path.join(__dirname, `../../images/${req.file.filename}`)
        const result = await cloudinaryUploadImage(imagePath)
        spareParts.set({ 'sparePartsImage.url': result.secure_url });
        spareParts.set({ 'sparePartsImage.publicId': result.public_id });
        fs.unlinkSync(imagePath);
    }

    if (req.body.partNo) {
        spareParts.partNo = req.body.partNo;
    }
    if (req.body.partBarCode) {
        spareParts.partBarCode = req.body.partBarCode;
    }
    if (req.body.partName) {
        spareParts.partName = req.body.partName;
    }
    if (req.body.vendor) {
        spareParts.vendor = req.body.vendor;
    }
    if (req.body.quantity) {
        spareParts.quantity = req.body.quantity;
    }
    if (req.body.minimumStock) {
        spareParts.minimumStock = req.body.minimumStock;
    }
    if (req.body.maximumStock) {
        spareParts.maximumStock = req.body.maximumStock;
    }
    if (req.body.expiryData) {
        spareParts.expiryData = req.body.expiryData;
    }
    if (req.body.leadTime) {
        spareParts.leadTime = req.body.leadTime;
    }
    if (req.body.storageType) {
        spareParts.storageType = req.body.storageType;
    }

    const updatedSpareParts = await spareParts.save();
    res.status(200).json(updatedSpareParts);
});


/**-------------------------------------------------------------
 * @desc    Delete Spare Parts  
 * @route   /api/SpareParts/:id
 * @method  Delete
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.deleteSparePartsCtrl = asyncHandler(async (req, res) => {
    const spareParts = await SpareParts.findById(req.params.id)
    if (!spareParts) {
        return res.status(404).json({ message: "Spare Parts not found" })
    }

    if (spareParts.sparePartsImage.publicId !== null) {
        await cloudinaryRemoveImage(spareParts.sparePartsImage.publicId)
    }

    await SpareParts.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "The Spare Parts has been Deleted successfully" })
})

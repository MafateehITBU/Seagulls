const asyncHandler = require('express-async-handler')
const { Asset } = require('../../models/Asset')
const fs = require('fs')
const path = require('path')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../../utils/cloudinary')

/**-------------------------------------------------------------
 * @desc    Get Asset 
 * @route   /api/Asset
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getAssetCtrl = asyncHandler(async (req, res) => {
    const asset = await Asset.find({})
    res.status(200).json(asset)
})

/**-------------------------------------------------------------
 * @desc    Get Asset By ID 
 * @route   /api/Asset/:id
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getAssetByIdCtrl = asyncHandler(async (req, res) => {
    const asset = await Asset.findById(req.params.id)
    if (!asset) {
        return res.status(400).json({ message: "Asset not found" })
    }

    res.status(200).json(asset)
})

/**-------------------------------------------------------------
 * @desc    Create Asset
 * @route   /api/Asset/
 * @method  POST
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.createAssetCtr1 = asyncHandler(async (req, res) => {
    const assetNumber = await Asset.findOne({ assetNo: req.body.assetNo })

    if (assetNumber) {
        return res.status(400).json({ message: "Asset not found" })
    }

    const imagePath = path.join(__dirname, `../../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);

    const assetData = {
        assetNo: req.body.assetNo,
        assetName: req.body.assetName,
        assetType: req.body.assetType,
        assetSubType: req.body.assetSubType,
        assetStatus: req.body.assetStatus,
        assetImage: {
            url: result.secure_url,
            publicId: result.public_id
        },
        assetLocation: req.body.assetLocation,
        instalationData: req.body.instalationData,
        quantity: req.body.quantity,
    };

    fs.unlinkSync(imagePath);

    const asset = new Asset(assetData);
    await asset.save();

    res.status(200).json({ message: "The Asset has been created successfully" });
});


/**-------------------------------------------------------------
 * @desc    Update Asset    
 * @route   /api/Asset/:id
 * @method  PUT
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.UpdateAssetCtrl = asyncHandler(async (req, res) => {

    const asset = await Asset.findById(req.params.id);
    if (!asset) {
        return res.status(404).json({ message: "Asset not found" });
    }

    if (req.file) {
        await cloudinaryRemoveImage(asset.assetImage.publicId)
        const imagePath = path.join(__dirname, `../../images/${req.file.filename}`)
        const result = await cloudinaryUploadImage(imagePath)
        asset.set({ 'assetImage.url': result.secure_url });
        asset.set({ 'assetImage.publicId': result.public_id });
        fs.unlinkSync(imagePath);
    }

    if (req.body.assetNo) {
        asset.assetNo = req.body.assetNo;
    }
    if (req.body.assetName) {
        asset.assetName = req.body.assetName;
    }
    if (req.body.assetType) {
        asset.assetType = req.body.assetType;
    }
    if (req.body.assetSubType) {
        asset.assetSubType = req.body.assetSubType;
    }
    if (req.body.assetStatus) {
        asset.assetStatus = req.body.assetStatus;
    }
    if (req.body.assetLocation) {
        asset.assetLocation = req.body.assetLocation;
    }
    if (req.body.instalationData) {
        asset.instalationData = req.body.instalationData;
    }


    const updatedAsset = await asset.save();
    res.status(200).json(updatedAsset);
});


/**-------------------------------------------------------------
 * @desc    Delete Asset  
 * @route   /api/Asset/:id
 * @method  Delete
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.deleteAssetCtrl = asyncHandler(async (req, res) => {
    const asset = await Asset.findById(req.params.id)
    if (!asset) {
        return res.status(404).json({ message: "Asset not found" })
    }

    if (asset.assetImage.publicId !== null) {
        await cloudinaryRemoveImage(asset.assetImage.publicId)
    }

    await Asset.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "The Asset has been Deleted successfully" })
})

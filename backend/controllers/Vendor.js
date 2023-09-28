const asyncHandler = require('express-async-handler')
const { Vendor } = require('../models/Vendor')

/**-------------------------------------------------------------
 * @desc    Get Vendor 
 * @route   /api/Vendor 
 * @method  Get
 * @access  public 
---------------------------------------------------------------*/
module.exports.getAllVendorCtrl = asyncHandler(async (req, res) => {
    const vendor = await Vendor.find({})
    res.status(200).json(vendor)
})


/**-------------------------------------------------------------
 * @desc    Create New Vendor
 * @route   /api/Vendor/
 * @method  POST
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.createVendorCtr1 = asyncHandler(async (req, res) => {
    let vendors = await Vendor.findOne({ email: req.body.email })
    if (vendors) {
        return res.status(400).json({ message: "Email already exist" })
    }
    let phone = await Vendor.findOne({ phone: req.body.phone })
    if (phone) {
        return res.status(400).json({ message: "phone already exist" })
    }

    const vendorData = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        sparePartsHeoffers: req.body.sparePartsOffered,
    };

    const vendor = new Vendor(vendorData);
    await vendor.save();

    res.status(200).json({ message: "The Vendor has been created successfully" });
});

/**-------------------------------------------------------------
 * @desc    Update Vendor   
 * @route   /api/Vendor/:id
 * @method  PUT
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.updateVendorCtrl = asyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
    }

    let vendors = await Vendor.findOne({ email: req.body.email })
    if (vendors) {
        return res.status(400).json({ message: "Email already exist" })
    }

    let phone = await Vendor.findOne({ phone: req.body.phone })
    if (phone) {
        return res.status(400).json({ message: "phone already exist" })
    }

    if (req.body.name) {
        vendor.name = req.body.name;
    }
    if (req.body.phone) {
        vendor.phone = req.body.phone;
    }
    if (req.body.email) {
        vendor.email = req.body.email;
    }
    if (req.body.sparePartsHeoffers) {
        vendor.sparePartsHeoffers = req.body.sparePartsHeoffers;
    }

    const updatedVendor = await vendor.save();
    res.status(200).json(updatedVendor);
});

/**-------------------------------------------------------------
 * @desc    Delete Vendor  
 * @route   /api/Vendor/:id
 * @method  Delete
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.deleteVendorCtrl = asyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id)
    if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" })
    }

    await Vendor.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "The Vendor has been Deleted successfully" })
})














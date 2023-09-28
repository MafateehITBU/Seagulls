const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const { Admin, ValidateRegisterAdmin, ValidateLoginAdmin } = require('../models/Admin')


/**-------------------------------------------------------------
 * @desc    Register New Admin
 * @route   /api/authAd/register
 * @method  POST
 * @access  public
---------------------------------------------------------------*/
module.exports.registerAdminCtr1 = asyncHandler(async (req, res) => {

    const { error } = ValidateRegisterAdmin(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    let admin = await Admin.findOne({ email: req.body.email })
    if (admin) {
        return res.status(400).json({ message: "Admin already exist" })
    }

    let phone = await Admin.findOne({ phone: req.body.phone })
    if (phone) {
        return res.status(400).json({ message: "Phone already exist" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    admin = new Admin({
        username: req.body.username,
        phone: req.body.phone,
        position: req.body.position,
        email: req.body.email,
        password: hashedPassword
    })

    await admin.save()
    res.status(201).json({ message: "you registered successfully, please log in" })
})


/**-------------------------------------------------------------
 * @desc    Login Admin
 * @route   /api/authAd/login
 * @method  POST
 * @access  public
---------------------------------------------------------------*/
module.exports.loginAdminCtrl = asyncHandler(async (req, res) => {
    const { error } = ValidateLoginAdmin(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const admin = await Admin.findOne({ email: req.body.email })
    if (!admin) {
        return res.status(400).json({ message: "nvalid email or password" })
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, admin.password)
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "nvalid email or password" })
    }

    const token = admin.generateAuthToken()

    res.status(200).json({
        _id: admin._id,
        isAdmin: admin.isAdmin,
        position: admin.position,
        // profilePhoto: admin.profilePhoto,
        token,
        username: admin.username
    })
})
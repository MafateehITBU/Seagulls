const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const { Technician, ValidateRegisterTechnician, ValidateLoginTechnician } = require('../models/Technician.js')


/**-------------------------------------------------------------
 * @desc    Register New User
 * @route   /api/authTe/register
 * @method  POST
 * @access  public
---------------------------------------------------------------*/
module.exports.registerUserCtr1 = asyncHandler(async (req, res) => {

    const { error } = ValidateRegisterTechnician(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    let technician = await Technician.findOne({ email: req.body.email })
    if (technician) {
        return res.status(400).json({ message: "User already exist" })
    }

    let username = await Technician.findOne({ username: req.body.email })
    if (technician) {
        return res.status(400).json({ message: "Username already exist" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    technician = new Technician({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword
    })

    await technician.save()
    res.status(201).json({ message: "you registered successfully, please log in" })
})



/**-------------------------------------------------------------
 * @desc    Log in
 * @route   /api/authTe/login
 * @method  POST
 * @access  public
---------------------------------------------------------------*/
module.exports.loginUsertrl = asyncHandler(async (req, res) => {
    const { error } = ValidateLoginTechnician(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const technician = await Technician.findOne({ email: req.body.email })
    if (!technician) {
        return res.status(400).json({ message: "nvalid email or password" })
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, technician.password)
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "nvalid email or password" })
    }

    const token = technician.generateAuthToken()

    res.status(200).json({
        _id: technician._id,
        isAdmin: technician.isAdmin,
        position: technician.position,
        // profilePhoto: admin.profilePhoto,
        isTechnician: technician.isTechnician,
        token,
        username: technician.username
    })
})
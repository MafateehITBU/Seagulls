const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const { Technician } = require('../models/Technician.js')


/**-------------------------------------------------------------
 * @desc    Get Technician 
 * @route   /api/technician/ 
 * @method  Get
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getAllTechnicianCtrl = asyncHandler(async (req, res) => {
    const technician = await Technician.find({}).select('-password')
    res.status(200).json(technician)
})



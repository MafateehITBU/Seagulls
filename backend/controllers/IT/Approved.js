const asyncHandler = require('express-async-handler')
const { Accident } = require('../../models/Accident')
const { SpareParts } = require('../../models/SpareParts')

/**-------------------------------------------------------------
 * @desc    Get All Approved 
 * @route   /api/Approved/
 * @method  GET 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getApprovedTicketCtrl = asyncHandler(async (req, res) => {
    try {
        const accidents = await Accident.find({
            $and: [
                { report: { $ne: "" } },
                { approvedIT: "" },
                { requiredSpareParts: { $ne: "Norequired" } },
            ]
        });

        if (!accidents || accidents.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(accidents);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/**-------------------------------------------------------------
 * @desc     Approved OR Rejected // Approved
 * @route   /api/Approved/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.approvedTicketCtrl = asyncHandler(async (req, res) => {
    const accidents = await Accident.findById(req.params.id);
    if (!accidents) {
        return res.status(404).json({ message: "Accident not found" });
    }

    const spareParts = await SpareParts.findOne({ partBarCode: accidents.requiredSpareParts })
    if (!spareParts) {
        return res.status(404).json({ message: "Spare Parts not found" });
    }

    spareParts.quantity -= 1;
    await spareParts.save();


    accidents.approvedIT = "approved"
    accidents.rejectedIT = "Modifications Approved"


    accidents.save()
    res.status(200).json(accidents);
});


/**-------------------------------------------------------------
 * @desc     Approved OR Rejected // Rejected
 * @route   /api/Approved/Rejected/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.rejectedTicketCtrl = asyncHandler(async (req, res) => {
    const accidents = await Accident.findById(req.params.id);
    if (!accidents) {
        return res.status(404).json({ message: "Accident not found" });
    }

    accidents.approvedIT = "rejected"
    accidents.rejectedIT = req.body.rejectedIT


    accidents.save()
    res.status(200).json(accidents);
});

const asyncHandler = require('express-async-handler')
const { Maintenance } = require('../../models/Maintenance')
const { SpareParts } = require('../../models/SpareParts')
/**-------------------------------------------------------------
 * @desc    Get All Approved 
 * @route   /api/Approved/Maintenance
 * @method  GET 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.getApprovedTicketCtrl = asyncHandler(async (req, res) => {
    try {
        const maintenance = await Maintenance.find({
            $and: [
                { report: { $ne: "" } },
                { approvedIT: "" },
                { requiredSpareParts: { $ne: "Norequired" } },
            ]
        });

        if (!maintenance || maintenance.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(maintenance);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/**-------------------------------------------------------------
 * @desc     Approved OR Rejected // Approved
 * @route   /api/Approved/Maintenance:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.approvedTicketCtrl = asyncHandler(async (req, res) => {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
    }

    const spareParts = await SpareParts.findOne({ partBarCode: maintenance.requiredSpareParts })
    if (!spareParts) {
        return res.status(404).json({ message: "Spare Parts not found" });
    }

    spareParts.quantity -= 1;
    await spareParts.save();

    maintenance.approvedIT = "approved"
    maintenance.rejectedIT = "Modifications Approved"

    await maintenance.save();

    res.status(200).json(maintenance);
});

/**-------------------------------------------------------------
 * @desc     Approved OR Rejected // Rejected
 * @route   /api/Approved/Maintenance/Rejected/:id
 * @method  PUT 
 * @access  private ( Token )
---------------------------------------------------------------*/
module.exports.rejectedTicketCtrl = asyncHandler(async (req, res) => {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
    }

    maintenance.approvedIT = "rejected"
    maintenance.rejectedIT = req.body.rejectedIT


    maintenance.save()
    res.status(200).json(maintenance);
});

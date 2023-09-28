const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SparePartsSchema = new Schema({
    partNo: {
        type: String,
        required: true,
        trim: true,
    },
    partBarCode: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    partName: {
        type: String,
        required: true,
        trim: true,
    },
    vendor: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    sparePartsImage: {
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    minimumStock: {
        type: String,
        required: true,
    },
    maximumStock: {
        type: String,
        required: true,
    },
    expiryData: {
        type: String,
        required: true,
        trim: true,
    },

    leadTime: {
        type: String,
        required: true,
        trim: true,
    },
    storageType: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
}
)

//Model SpareParts
const SpareParts = mongoose.model("SpareParts", SparePartsSchema)

module.exports = { SpareParts }



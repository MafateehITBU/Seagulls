const mongoose = require('mongoose')

const Schema = mongoose.Schema


const AssetSchema = new Schema({
    assetNo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    assetName: {
        type: String,
        required: true,
        trim: true,
    },
    assetType: {
        type: String,
        required: true,
        trim: true,
    },
    assetSubType: {
        type: String,
        required: true,
        trim: true,
    },
    assetStatus: {
        type: String,
        required: true,
        trim: true,
    },
    assetLocation: {
        type: String,
        required: true,
        trim: true,
    },
    instalationData: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: String,
        required: true,
        trim: true,
    },
    assetImage: {
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    Coordinates: {
        type: String,
        // required: true,
        trim: true,
    },
    maintenanceReports: {
        type: Array,
    }

}, {
    timestamps: true,
})




//Model Asset
const Asset = mongoose.model("Asset", AssetSchema)

module.exports = { Asset }



// const repeatedData = [];

// for (let i = 0; i < 100; i++) {
//     const newData = {
//         assetNo: `AST-${i + 1}`,
//         assetName: `AST-${i + 1}`,
//         assetType: `AST-${i + 1}`,
//         assetSubType: `AST-${i + 1}`,
//         assetStatus: `AST-${i + 1}`,
//         assetLocation: `AST-${i + 1}`,
//         assetImage: {
//             url: "https://example.com/printer.jpg",
//         },
//         instalationData: "2023-09-09",
//         quantity: "1"
//     };

//     repeatedData.push(newData);
// }

// Asset.insertMany(repeatedData)
//     .then((docs) => {
//         console.log('Data added successfully');
//     })
//     .catch((error) => {
//         console.error('An error occurred while adding data:', error);
//     })
//     .finally(() => {
//         mongoose.connection.close();
//     });


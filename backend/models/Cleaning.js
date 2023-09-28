const mongoose = require('mongoose')
const Joi = require('joi')


const Schema = mongoose.Schema

const CleaningSchema = new Schema({
    TicketID: {
        type: String,
        trim: true,
    },
    openedBy: {
        type: String,
        trim: true,
    },
    openedTo: {
        type: String,
        trim: true,
        default: '',
    },
    openedToID: {
        type: String,
        trim: true,
        default: '',
    },
    done: {
        type: String,
        trim: true,
        default: '',
    },
    priority: {
        type: String,
        required: true,
        trim: true,
        enum: ['High', 'Medium', 'Low', 'specific']
    },
    assetID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
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
    location: {
        type: String,
        required: true,
        trim: true,
    },
    pictureBefore: {
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    pictureAfter: {
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    note: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    date: {
        type: String,
        trim: true,
        default: "",
    },
    time: {
        type: String,
        trim: true,
        default: "",
    },
    startTime: {
        type: String,
        trim: true,
        default: "",
    },
    endTime: {
        type: String,
        trim: true,
        default: ""
    },
    timer: {
        type: String,
        trim: true,
        default: "",
    },
    status: {
        type: String,
        trim: true,
        default: 'pending',
    },
}, {
    timestamps: true,
}
)

//Model Cleaning
const Cleaning = mongoose.model("Cleaning", CleaningSchema)

//Validate Create Cleaning  
function ValidateCreateCleaning(obj) {
    const Schema = Joi.object({
        priority: Joi.string().valid('High', 'Medium', 'Low').required(),
        assetName: Joi.string().trim().required(),
        assetType: Joi.string().trim().required(),
        assetSubType: Joi.string().trim().required(),
        spareparts: Joi.string().trim().required(),
        location: Joi.string().trim().required(),
        note: Joi.string().trim().required(),
    })
    return Schema.validate(obj)
}



module.exports = { Cleaning, ValidateCreateCleaning }


// const repeatedData = [];

// for (let i = 0; i < 17; i++) {
//     const newData = {
//         openedBy: "specific",
//         priority: `specific`,
//         assetID: '64fd8eddabf31df0aaf19fbb',
//         assetName: `AST-${i + 1}`,
//         assetType: `AST-${i + 1}`,
//         assetSubType: `AST-${i + 1}`,
//         location: `AST-${i + 1}`,
//         note: "cleaing",
//         date: `2023-12-${i + 1}`,
//     };

//     repeatedData.push(newData);
// }

// Cleaning.insertMany(repeatedData)
//     .then((docs) => {
//         console.log('Data added successfully');
//     })
//     .catch((error) => {
//         console.error('An error occurred while adding data:', error);
//     })
//     .finally(() => {
//         mongoose.connection.close();
//     });
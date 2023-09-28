const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')


const Schema = mongoose.Schema


const AccidentSchema = new Schema({
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
    done: {
        type: String,
        trim: true,
        default: '',
    },
    openedToID: {
        type: String,
        trim: true,
        default: '',
    },
    priority: {
        type: String,
        required: true,
        trim: true,
        enum: ['High', 'Medium', 'Low']
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
    sparePartsName: {
        type: String,
        required: true,
        trim: true,
    },
    sparePartsImage: {
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    issueDiscrption: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    report: {
        type: String,
        maxlength: 2000,
        default: ""
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
    time: {
        type: String,
        trim: true,
    },
    Croca: {
        type: Object,
        default: {
            typeCroca: "",
            Cost: "",
            url: "",
            publicId: null
        }
    },
    startTime: {
        type: String,
        trim: true,
        default: ""
    },
    endTime: {
        type: String,
        trim: true,
        default: ""
    },
    timer: {
        type: String,
        trim: true,
        default: '',
    },
    requiredSpareParts: {
        type: String,
        trim: true,
        default: '',
    },
    approvedIT: {
        type: String,
        trim: true,
        default: '',
    },
    rejectedIT: {
        type: String,
        trim: true,
        default: '',
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

//Model Accident
const Accident = mongoose.model("Accident", AccidentSchema)


module.exports = { Accident }



// const data = [
//     {
//         "priority": "High",
//         "assetName": "Printer 01",
//         "assetType": "Office Equipment",
//         "assetSubType": "Printer",
//         "spareparts": "Ink Cartridge",
//         "location": "Office Room A",
//         "picture": "https://example.com/printer.jpg",
//         "note": "Paper jam issue",
//     },
//     {
//         "priority": "Medium",
//         "assetName": "Laptop 01",
//         "assetType": "IT Equipment",
//         "assetSubType": "Laptop",
//         "spareparts": "None",
//         "location": "Office Room B",
//         "picture": "https://example.com/laptop.jpg",
//         "note": "Software update required",
//     },
//     {
//         "priority": "Low",
//         "assetName": "Projector 01",
//         "assetType": "Presentation Equipment",
//         "assetSubType": "Projector",
//         "spareparts": "Bulb",
//         "location": "Conference Room A",
//         "picture": "https://example.com/projector.jpg",
//         "note": "Dim projection",
//     },
//     {
//         "priority": "High",
//         "assetName": "Desktop Computer 01",
//         "assetType": "IT Equipment",
//         "assetSubType": "Desktop",
//         "spareparts": "RAM Module",
//         "location": "IT Room",
//         "picture": "https://example.com/desktop.jpg",
//         "note": "Computer won't boot",
//     },
//     {
//         "priority": "Medium",
//         "assetName": "Phone 01",
//         "assetType": "Communication Device",
//         "assetSubType": "Phone",
//         "spareparts": "None",
//         "location": "Reception Area",
//         "picture": "https://example.com/phone.jpg",
//         "note": "No dial tone",
//     },
//     {
//         "priority": "Low",
//         "assetName": "Monitor 01",
//         "assetType": "IT Equipment",
//         "assetSubType": "Monitor",
//         "spareparts": "None",
//         "location": "Cubicle D",
//         "picture": "https://example.com/monitor.jpg",
//         "note": "Flickering screen",
//     },
//     {
//         "priority": "High",
//         "assetName": "Scanner 01",
//         "assetType": "Office Equipment",
//         "assetSubType": "Scanner",
//         "spareparts": "Scanner Glass",
//         "location": "Copy Room",
//         "picture": "https://example.com/scanner.jpg",
//         "note": "Lines on scanned images",
//     },
//     {
//         "priority": "Medium",
//         "assetName": "Keyboard 01",
//         "assetType": "Peripheral",
//         "assetSubType": "Keyboard",
//         "spareparts": "None",
//         "location": "Desk 25",
//         "picture": "https://example.com/keyboard.jpg",
//         "note": "Several keys not working",
//     },
//     {
//         "priority": "Low",
//         "assetName": "Mouse 01",
//         "assetType": "Peripheral",
//         "assetSubType": "Mouse",
//         "spareparts": "None",
//         "location": "Desk 17",
//         "picture": "https://example.com/mouse.jpg",
//         "note": "Cursor erratic movement",
//     },
//     {
//         "priority": "High",
//         "assetName": "Network Switch 01",
//         "assetType": "Networking Equipment",
//         "assetSubType": "Switch",
//         "spareparts": "None",
//         "location": "Server Room",
//         "picture": "https://example.com/switch.jpg",
//         "note": "Port connectivity issue",
//     }
// ]
// Accident.insertMany(data)
//     .then((docs) => {
//         console.log('done');
//     })
//     .catch((error) => {
//         console.error('error');
//     })
//     .finally(() => {
//         mongoose.connection.close();
//     });

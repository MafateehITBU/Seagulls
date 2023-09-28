const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CleaningFiltersSchema = new Schema({
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

//Model Cleaning Filters
const CleaningFilters = mongoose.model("CleaningFilters", CleaningFiltersSchema)


module.exports = { CleaningFilters }




// const data = [
//     {
//         "technicianName": "Ahmad",
//         "technicianPhone": "1459685737",
//         "priority": "High",
//         "assetName": "Printer 01",
//         "assetType": "Office Equipment",
//         "assetSubType": "Printer",
//         "spareparts": "Ink Cartridge",
//         "location": "Office Room A",
//         "pictureBefore": "https://example.com/printer.jpg",
//         "pictureAfter": "https://example.com/printer.jpg",
//         "note": "Paper jam issue",
//         "startTime": null,
//         "endTime": null,
//         "status": "close"
//     },
//     {
//         "technicianName": "John Doe",
//         "technicianPhone": "555-123-4567",
//         "priority": "Medium",
//         "assetName": "Asset 1",
//         "assetType": "Equipment",
//         "assetSubType": "Type 1",
//         "spareparts": "Part 1",
//         "location": "Location 1",
//         "pictureBefore": "https://example.com/asset1.jpg",
//         "pictureAfter": "https://example.com/printer.jpg",
//         "note": "Issue 1",
//         "startTime": null,
//         "endTime": null,
//         "status": "open"
//     },
//     {
//         "technicianName": "Jane Smith",
//         "technicianPhone": "555-987-6543",
//         "priority": "Low",
//         "assetName": "Asset 2",
//         "assetType": "Equipment",
//         "assetSubType": "Type 2",
//         "spareparts": "Part 2",
//         "location": "Location 2",
//         "pictureBefore": "https://example.com/asset2.jpg",
//         "pictureAfter": "https://example.com/printer.jpg",
//         "note": "Issue 2",
//         "startTime": null,
//         "endTime": null,
//         "status": "in-progress"
//     },
//     {
//         "technicianName": "David Johnson",
//         "technicianPhone": "555-555-5555",
//         "priority": "High",
//         "assetName": "Asset 3",
//         "assetType": "Furniture",
//         "assetSubType": "Chair",
//         "spareparts": "Cushion",
//         "location": "Location 3",
//         "pictureBefore": "https://example.com/asset3.jpg",
//         "pictureAfter": "https://example.com/printer.jpg",
//         "note": "Issue 3",
//         "startTime": null,
//         "endTime": null,
//         "status": "open"
//     },
//     {
//         "technicianName": "Emily Brown",
//         "technicianPhone": "555-789-1234",
//         "priority": "Medium",
//         "assetName": "Asset 4",
//         "assetType": "Furniture",
//         "assetSubType": "Table",
//         "spareparts": "Leg",
//         "location": "Location 4",
//         "pictureBefore": "https://example.com/asset4.jpg",
//         "pictureAfter": "https://example.com/printer.jpg",
//         "note": "Issue 4",
//         "startTime": null,
//         "endTime": null,
//         "status": "closed"
//     },
//     {
//         "technicianName": "Michael Wilson",
//         "technicianPhone": "555-222-3333",
//         "priority": "Low",
//         "assetName": "Asset 5",
//         "assetType": "IT Equipment",
//         "assetSubType": "Computer",
//         "spareparts": "Hard Drive",
//         "location": "Location 5",
//         "pictureBefore": "https://example.com/asset5.jpg",
//         "pictureAfter": "https://example.com/printer.jpg",
//         "note": "Issue 5",
//         "startTime": null,
//         "endTime": null,
//         "status": "in-progress"
//     },
//     {
//         "technicianName": "Sophia Lee",
//         "technicianPhone": "555-444-5555",
//         "priority": "High",
//         "assetName": "Asset 6",
//         "assetType": "Office Equipment",
//         "assetSubType": "Scanner",
//         "spareparts": "Scanner Glass",
//         "location": "Location 6",
//         "pictureBefore": "https://example.com/asset6.jpg",
//         "pictureAfter": "https://example.com/printer.jpg",
//         "note": "Issue 6",
//         "startTime": null,
//         "endTime": null,
//         "status": "open"
//     },
//     {
//         "technicianName": "William Anderson",
//         "technicianPhone": "555-987-6543",
//         "priority": "Medium",
//         "assetName": "Asset 7",
//         "assetType": "IT Equipment",
//         "assetSubType": "Laptop",
//         "spareparts": "Battery",
//         "location": "Location 7",
//         "pictureBefore": "https://example.com/asset7.jpg",
//         "pictureAfter": "https://example.com/printer.jpg",
//         "note": "Issue 7",
//         "startTime": null,
//         "endTime": null,
//         "status": "closed"
//     },
//     {
//         "technicianName": "Olivia Martinez",
//         "technicianPhone": "555-333-2222",
//         "priority": "Low",
//         "assetName": "Asset 8",
//         "assetType": "Office Equipment",
//         "assetSubType": "Fax Machine",
//         "spareparts": "Ink Cartridge",
//         "location": "Location 8",
//         "pictureBefore": "https://example.com/asset8.jpg",
//         "pictureAfter": "https://example.com/printer.jpg",
//         "note": "Issue 8",
//         "startTime": null,
//         "endTime": null,
//         "status": "in-progress"
//     },
//     {
//         "technicianName": "James Taylor",
//         "technicianPhone": "555-666-7777",
//         "priority": "High",
//         "assetName": "Asset 9",
//         "assetType": "Furniture",
//         "assetSubType": "Desk",
//         "spareparts": "Drawer Handle",
//         "location": "Location 9",
//         "pictureBefore": "https://example.com/asset9.jpg",
//         "pictureAfter": "https://example.com/printer.jpg",
//         "note": "Issue 9",
//         "startTime": null,
//         "endTime": null,
//         "status": "open"
//     },
//     {
//         "technicianName": "Ava Davis",
//         "technicianPhone": "555-111-9999",
//         "priority": "Medium",
//         "assetName": "Asset 10",
//         "assetType": "IT Equipment",
//         "assetSubType": "Printer",
//         "spareparts": "Toner Cartridge",
//         "location": "Location 10",
//         "pictureBefore": "https://example.com/asset10.jpg",
//         "pictureAfter": "https://example.com/printer.jpg",
//         "note": "Issue 10",
//         "startTime": null,
//         "endTime": null,
//         "status": "closed"
//     }
// ]



// CleaningFilters.insertMany(data)
//     .then((docs) => {
//         console.log('done');
//     })
//     .catch((error) => {
//         console.error('error');
//     })
//     .finally(() => {
//         mongoose.connection.close();
//     });


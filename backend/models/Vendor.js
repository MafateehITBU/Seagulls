const mongoose = require('mongoose')

const Schema = mongoose.Schema


const VendorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 14,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    sparePartsHeoffers: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    }
}, {
    timestamps: true,
})


//Model Vendor
const Vendor = mongoose.model("Vendor", VendorSchema)


module.exports = { Vendor }



// const originalData = [
//     {
//         "name": "Ibrahim Salem",
//         "phone": "0789468554",
//         "email": "ibrahim-salem@gmail.com",
//         "sparePartsHeoffers": "modal 1 / modal 2 / modal 3 / modal 4 / modal 5 / modal 6",
//     }
// ];

// function generateRandomName() {
//     const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "James", "Linda", "Robert", "Karen"];
//     const lastNames = ["Smith", "Johnson", "Brown", "Williams", "Jones", "Davis", "Miller", "Wilson", "Moore", "Taylor"];

//     const randomFirstName = firstNames[getRandomNumber(0, firstNames.length - 1)];
//     const randomLastName = lastNames[getRandomNumber(0, lastNames.length - 1)];

//     return `${randomFirstName} ${randomLastName}`;
// }

// function getRandomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function generateRandomEmail() {
//     const emailDomains = ["gmail.com", "yahoo.com", "hotmail.com"];
//     const randomDomain = emailDomains[getRandomNumber(0, emailDomains.length - 1)];
//     const randomUsername = Math.random().toString(36).substring(7);
//     return `${randomUsername}@${randomDomain}`;
// }

// function generateRandomPhone() {
//     const phoneNumber = `07${getRandomNumber(70000000, 79999999)}`;
//     return phoneNumber;
// }

// function generateRandomPerson() {
//     const randomData = {
//         "name": generateRandomName(),
//         "phone": generateRandomPhone(),
//         "email": generateRandomEmail(),
//         "sparePartsHeoffers": "Random Spare Parts",
//     };
//     return randomData;
// }



// const randomData = [];
// while (randomData.length < 20) {
//     const randomPerson = generateRandomPerson();
//     const isDuplicate = originalData.some(person => person.email === randomPerson.email || person.phone === randomPerson.phone);
//     if (!isDuplicate) {
//         randomData.push(randomPerson);
//     }
// }

// Vendor.insertMany(randomData)
//     .then((docs) => {
//         console.log('done');
//     })
//     .catch((error) => {
//         console.error('error');
//     })
//     .finally(() => {
//         mongoose.connection.close();
//     });

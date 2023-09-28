const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')


const Schema = mongoose.Schema


const TechnicianSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    isTechnician: {
        type: Boolean,
        default: true
    },
    position: {
        type: String,
        maxlength: 100,
        default: 'technician'
    },
    task: {
        type: [String]
    },
    assigned: {
        type: [Object]
    },
    Accident: {
        type: String,
        default: '0'
    }
    ,
    Maintenance: {
        type: String,
        default: '0'
    }
    ,
    Cleaning: {
        type: String,
        default: '0'
    }
}, {
    timestamps: true,
}
)

//Generate Auth Token 
TechnicianSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, isTechnician: this.isTechnician }, process.env.JWT_SECRET)
}


//Model User
const Technician = mongoose.model("Technician", TechnicianSchema)


//Validate Register Technician
function ValidateRegisterTechnician(obj) {
    const Schema = Joi.object({
        username: Joi.string().min(2).max(100).trim().required(),
        email: Joi.string().min(5).max(100).trim().required().email(),
        phone: Joi.string().required(),
        password: Joi.string()
            .min(8)
            .trim()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, a number and a special character.',
            }),
    })
    return Schema.validate(obj)
}

//Validate login Technician
function ValidateLoginTechnician(obj) {
    const Schema = Joi.object({
        email: Joi.string().min(5).max(100).trim().required().email(),
        password: Joi.string()
            .min(8)
            .trim()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, a number and a special character.',
            }),
    })
    return Schema.validate(obj)
}

module.exports = { Technician, ValidateRegisterTechnician, ValidateLoginTechnician }
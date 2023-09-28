const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')


const Schema = mongoose.Schema


const AdminSchema = new Schema({
    username: {
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
        minlength: 10,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicId: null
        }
    },
    bio: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    position: {
        type: String,
        maxlength: 100,
        enum: ['supervisor', 'admin']
    },
}, {
    timestamps: true,
}
)

//Generate Auth Token 
AdminSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin, username: this.username }, process.env.JWT_SECRET)
}


//Model Admin
const Admin = mongoose.model("Admin", AdminSchema)


//Validate Register Admin
function ValidateRegisterAdmin(obj) {
    const Schema = Joi.object({
        username: Joi.string().min(2).max(100).trim().required(),
        phone: Joi.string().max(10).trim().required(),
        email: Joi.string().min(5).max(100).trim().required().email(),
        position: Joi.string().valid('supervisor', 'admin').required(),
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


//Validate login Admin
function ValidateLoginAdmin(obj) {
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


//Validate Update Admin
function ValidateUpdateAdmin(obj) {
    const Schema = Joi.object({
        username: Joi.string().min(2).max(100).trim(),
        password: Joi.string()
            .min(8)
            .trim()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, a number and a special character.',
            }), bio: Joi.string()
    })
    return Schema.validate(obj)
}


module.exports = { Admin, ValidateRegisterAdmin, ValidateLoginAdmin }
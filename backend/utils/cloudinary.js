const cloudinary = require("cloudinary")


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_Key,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// Cloudinary Upload Image
const cloudinaryUploadImage = async (fileTOUpload) => {
    try {
        const data = await cloudinary.uploader.upload(fileTOUpload, {
            resource_type: 'auto'
        })
        return data
    } catch (error) {
        console.log(error)
    }
}




// Cloudinary Remove Image
const cloudinaryRemoveImage = async (imagePub1icId) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePub1icId)
        return result
    } catch (error) {
        console.log(error)
        throw new Error("Internal Server Error (cloudinary) ")
    }
}

// Cloudinary Remove Multiple Image
const cloudinaryRemoveMultipleImage = async (publicIds) => {
    try {
        const result = await cloudinary.v2.api.resource_types(publicIds)
        return result
    } catch (error) {
        throw new Error("Internal Server Error (cloudinary) ")
    }
}


module.exports = { cloudinaryUploadImage, cloudinaryRemoveImage, cloudinaryRemoveMultipleImage }

const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'events-gallery',
        format: (req, file) => {
            // You can also dynamically set the format based on the file extension
            const fileExtension = file.originalname.split('.').pop();
            return fileExtension === 'jpg' || fileExtension === 'jpeg' ? 'jpg' : fileExtension;
        },
        public_id: (req, file) => file.originalname.split('.')[0], // Use the file name without extension as the public ID
    },
});


const upload = multer({ storage });

module.exports = upload;
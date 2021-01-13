//configuration of Cloudinary object to be able to establish a connection and add/remove images
const cloudinary = require('cloudinary').v2;

require('dotenv').config({path: __dirname + '/../../.env'})

cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});

module.exports = { cloudinary };

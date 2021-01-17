const express = require('express');
const path = require('path');
const app = express();

require('dotenv').config({path: __dirname + '/../.env'})

const {cloudinary} = require('./utils/cloudinary')

const port = process.env.PORT || 5000;
const buildPath = path.join(__dirname, '..', 'build');

app.use(express.static(buildPath));

//allows for the parsing of request bodies 
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))


// a GET route to get all images
app.get("/api/images", async (req, res) => {

    //retrieves a max of 50 images from cloudinary 
    const { resources } = await cloudinary.search
    .expression(`folder:${process.env.REACT_APP_CLOUDINARY_IMAGE_PRESET}`)
    .sort_by('public_id', 'desc')
    .max_results(50)
    .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
});

//a POST route for uploading new image 
app.post("/api/upload", async (req, res) => {
    try {

        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: process.env.REACT_APP_CLOUDINARY_IMAGE_PRESET
        });
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
        res.status(200);
    } catch(err) {
        console.error(err);
        res.status(500).json({ err: 'Unable to upload image.' });
    } 

})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
});
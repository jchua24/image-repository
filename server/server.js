const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

// mongoose and mongo connection
const { mongoose } = require("../db/mongoose");

// import the mongoose model
const { Image } = require("../db/models/image");

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }))


// a GET route to get all images
app.get("/images", (req, res) => {
    Image.find().then(
        images => {
            res.send({ images }); 
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});




app.listen(process.env.PORT || 8080);
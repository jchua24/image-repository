
import axios from 'axios';
require('dotenv').config({path: __dirname + '/../../.env'})

const client = axios.create();

export const APIgetImages = async () => {
    try {

        const res = await client.get('api/images');
        return res.data; 
       
    } catch (err) {
        console.error(err);
    }
};

export const APIaddImage = async (base64EncodedImage) => {
    try {
      
        const res = await client.post('/api/upload/', {data: base64EncodedImage});

        if(res.status !==  200) {
            throw "Failed to upload image to Cloudinary."
        } 

        return res;
    
      } catch (err) {
        throw err; 
    }
} 
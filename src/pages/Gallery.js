import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import {APIgetImages} from "../api/imagesAPI"

export default function Gallery() {
    const [imageIds, setImageIds] = useState();

    const loadImages = async () => {
        try {
            let images = await APIgetImages(); 
            setImageIds(images); 
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        loadImages();
    }, []);
    
    return (
        <div>
            <h1 className="title">Gallery</h1>
            <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
    );
}

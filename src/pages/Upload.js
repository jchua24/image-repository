import React, { useState } from 'react';
import Alert from '../components/Alert';
import Loader from 'react-loader-spinner'

import {APIaddImage} from "../api/imagesAPI"

export default function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];

        if (!file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
            setErrMsg('Please upload an image file.');
        } else {
            previewFile(file);
            setSelectedFile(file);
            setFileInputState(e.target.value);
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); //encodes image as a string
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        setFileInputState('');
        setPreviewSource('');

        try {
            setLoading(true);
            await APIaddImage(base64EncodedImage); 
            setLoading(false);
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Unable to upload file. Please try again!');
        }
       
    };

    return (
        <div>
            <h1 className="title">Upload an Image</h1>
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>

            {isLoading && <Loader
                type="Rings"
                color="#90EE90"
                height={100}
                width={100}        
            />} 

            {previewSource && !isLoading &&  (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
    );
}

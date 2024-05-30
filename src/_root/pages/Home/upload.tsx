import React, { useState } from 'react';
import axios from 'axios';
import { http } from '@/app/http';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await http.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image uploaded successfully:', response.data);
      // Set the image URL in state to display it
      setImageUrl(response.data.filePath);
    } catch (error) {
      console.error('Error uploading image:', error.response.data);
      // Handle error and display message to user
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type='file' accept='image/*' onChange={handleFileChange} />
        <button type='submit'>Upload</button>
      </form>
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt='Uploaded' style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;

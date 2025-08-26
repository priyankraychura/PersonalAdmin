import React, { useState } from 'react';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Replace with your Cloudinary information
  const cloudName = 'dsy7gcbrj';
  const uploadPreset = 'profile';

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    // Create a preview URL for the selected image
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl('');
    }
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select an image to upload.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.secure_url;
        const publicId = data.public_id;
        setMessage(`Image uploaded successfully! URL: ${imageUrl}`);
        console.log('Image URL:', imageUrl, publicId);
      } else {
        setMessage('Upload failed. Please try again.');
        console.error('Upload failed:', await response.text());
      }
    } catch (error) {
      setMessage('An error occurred during upload.');
      console.error('API call error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Upload Image to Cloudinary</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload} disabled={isUploading || !file}>
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {previewUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Image Preview</h3>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </div>
      )}
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default ImageUploader;
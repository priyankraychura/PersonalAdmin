import React, { useState, useRef } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/user/userSlice';
import axios from 'axios';
import './ProfileEditForm.css'

// --- Mock Redux setup for demonstration ---
// This allows the component to run standalone.
// Replace this with your actual Redux implementation.
// const useDispatch = () => (action) => console.log('Dispatching Action:', action);
// const useSelector = (selector) => selector({
//   userReducer: {
//     userData: {
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       mobile: '123-456-7890',
//       dob: '1990-01-01',
//       gender: 'Male',
//       city: 'New York',
//       pincode: '10001',
//       designation: 'Software Engineer',
//       imageUrl: '' // Initially no image
//     }
//   }
// });
// const login = (userData) => ({ type: 'user/login', payload: userData });
// --- End Mock Redux setup ---


const ProfileEditForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const user = useSelector(state => state.userReducer.userData);
  const [formData, setFormData] = useState(user);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // This function now handles opening the modal and resetting the form state.
  // This prevents the infinite re-render loop.
  const handleOpenModal = () => {
    setFormData(user);
    setFile(null);
    setMessage('');
    setIsOpen(true);
  };

  const cloudName = 'dsy7gcbrj';
  const uploadPreset = 'profile';

  const config = {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  };

  const handleVerifyClick = () => {
    axios.post('http://localhost:1008/api/v1/admin/send-email', { email: formData.email }, config)
      .then((response) => {
        console.log(response);
        setMessage("Verification email sent!");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Could not send verification email.");
      })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create a temporary URL for previewing the image
      setFormData({ ...formData, profilePath: { imageUrl: URL.createObjectURL(selectedFile) } })
    }
  };

  // console.log(formData.profilePath)

  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) {
      // This case should ideally not be hit if called from handleSubmit correctly
      setMessage('Please select an image to upload.');
      return null;
    }

    setIsUploading(true);
    setMessage('Uploading image...');
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        const imageUrl = result.secure_url;
        const publicId = result.public_id;
        setMessage(`Image uploaded successfully!`);
        // console.log('Image URL:', imageUrl, publicId);
        return { imageUrl, publicId };
      } else {
        setMessage('Upload failed. Please try again.');
        console.error('Upload failed:', await response.text());
        return null;
      }
    } catch (error) {
      setMessage('An error occurred during upload.');
      console.error('API call error:', error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalUserData = { ...formData };

    // --- CORRECTED LOGIC ---
    // The key is to check the `file` state, not `formData.imageFile`.
    const originalImageExists = !!user.profilePath;
    const newImageWasSelected = !!file;

    // Determine action based on image state
    if (!originalImageExists && newImageWasSelected) {
      console.log("User had no image previously and has added one.");
    } else if (originalImageExists && newImageWasSelected) {
      console.log("User had an image and has changed it.");
    } else if (originalImageExists && !newImageWasSelected) {
      console.log("User had an image and has not changed it.");
    } else { // !originalImageExists && !newImageWasSelected
      console.log("User had no image previously and did not add one.");
    }

    // If a new image was selected, upload it and update the user data
    if (newImageWasSelected) {
      const uploadResult = await handleUpload();
      if (uploadResult && uploadResult.imageUrl) {
        // Update the profilePath to the permanent Cloudinary URL
        finalUserData.profilePath = uploadResult;
      } else {
        // If upload fails, stop the submission process
        console.error("Image upload failed. Profile update cancelled.");
        setMessage("Could not update profile because image upload failed.");
        return;
      }
    }

    console.log("Dispatching final user data:", finalUserData);

    await axios.post('http://localhost:1008/api/v1/admin/update-profile', finalUserData, config)
      .then((user) => {
        console.log("🚀 ~ handleSubmit ~ user:", user)
        dispatch(login(finalUserData));
      })
      .catch((err) => {
        console.log(err);
        setMessage("Could not update profile because of an error.");
      })

    setIsOpen(false); // Close modal on successful submission
  };

  // Main component render
  return (
    <>
      <button
        onClick={handleOpenModal}
        className="profile-edit-button"
      >
        Edit Profile
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Edit Profile</h2>
              <button onClick={() => setIsOpen(false)} className="close-button">
                <X size={24} />
              </button>
            </div>

            {/* We attach handleSubmit to the form itself */}
            <form onSubmit={handleSubmit} className="profile-edit-form">
              <div className="profile-header-section">
                <div className="profile-image-container">
                  <img src={formData?.profilePath?.imageUrl || 'https://placehold.co/100x100/EFEFEF/31343C?text=Profile'} alt="Profile" className="profile-image-preview" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <button type="button" onClick={handleImageButtonClick} className="change-image-button">
                    Change Image
                  </button>
                </div>
                <div className="profile-basic-details">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <div className="input-with-badge">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input has-badge"
                        required
                        disabled
                      />
                      {formData.isEmailVarified ? (
                        <div className="email-badge verified">
                          <CheckCircle size={16} /> Verified
                        </div>
                      ) : (
                        <div className="email-badge unverified">
                          <AlertCircle size={16} />
                          <button type="button" onClick={handleVerifyClick} className="verify-button">
                            Verify
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-details-section">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Message display for upload status or errors */}
              {message && <div className="form-message">{message}</div>}

              <div className="form-actions">
                {/* The submit button is now part of the form */}
                <button type="submit" className="save-button" disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => setIsOpen(false)} className="cancel-button">
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEditForm;

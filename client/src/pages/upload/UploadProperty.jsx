import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './uploadPropery.module.css';
import { commonAmenities } from '../../utils/amenities.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import ImageKit from 'imagekit-javascript';

const UploadProperty = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [hotelDetails, setHotelDetails] = useState({
    listedBy: user?._id || '',
    name: '',
    city: '',
    address: '',
    type: '',
    rating: '',
    price: '',
    amenities: [],
    featured: false,
    images: [],
    title: '',
    description: '',
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);



  const imagekitPublicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

  const imagekit = new ImageKit({
    publicKey: imagekitPublicKey,
    urlEndpoint: urlEndpoint,
    authenticationEndpoint: '/api/imagekitAuth',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHotelDetails((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setHotelDetails((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const uploadImage = async (file, hotelName) => {
    const folderName = `booking/${hotelName}`;

    try {
      const authResponse = await fetch('/api/imagekitAuth', {
        method: 'GET',
      });

      if (!authResponse.ok) {
        const errorData = await authResponse.json();
        console.error('Failed to get ImageKit authentication token:', errorData);
        throw new Error('Failed to get ImageKit authentication token');
      }

      const { token, signature, expire } = await authResponse.json();

      return new Promise((resolve, reject) => {
        imagekit.upload(
          {
            file: file,
            fileName: file.name,
            folder: folderName,
            token,
            signature,
            expire,
          },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.url);
            }
          }
        );
      });
    } catch (error) {
      console.error('Error during ImageKit upload:', error);
      throw error;
    }
  };

  const handleImageUpload = async () => {
    if (imageFiles.length === 0) {
      alert('Please select images first.');
      return;
    }

    const hotelName = hotelDetails.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    setUploadingImages(true);

    try {
      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadImage(file, hotelName))
      );

      setHotelDetails((prev) => ({
        ...prev,
        images: imageUrls,
      }));

      setUploadSuccess(true);

      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
      setImageFiles([]); // <-- 🛠️ Clear the selected files after upload
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploadingImages(false); // 🛠️ Now uploadingImages will become false correctly
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (hotelDetails.images.length === 0) {
      alert('Please upload images before submitting.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelDetails), // 🛠️ Only send hotelDetails, no new image upload here
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to upload hotel');
      }
    } catch (error) {
      console.error('Error uploading hotel:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={styles.container}>
      <h2>Upload Hotel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Hotel Name"
          value={hotelDetails.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={hotelDetails.city}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={hotelDetails.address}
          onChange={handleInputChange}
          required
        />
        <select name="type" value={hotelDetails.type} onChange={handleInputChange} required>
          <option value="">Select Type</option>
          <option value="hotel">Hotel</option>
          <option value="apartment">Apartment</option>
          <option value="resort">Resort</option>
          <option value="villa">Villa</option>
          <option value="cabin">Cabin</option>
        </select>
        <input
          type="number"
          name="rating"
          placeholder="Rating (0-5)"
          value={hotelDetails.rating}
          onChange={handleInputChange}
          min="0"
          max="5"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={hotelDetails.price}
          onChange={handleInputChange}
          required
        />
        <input type="file" multiple onChange={handleImageChange} />

        {imageFiles.length > 0 && (
          <div className={styles.imagePreviewContainer}>
            {imageFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="Preview"
                className={styles.previewImage}
              />
            ))}
          </div>
        )}

        {hotelDetails.images.length > 0 && (
          <div className={styles.uploadedImagesContainer}>
            {hotelDetails.images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Uploaded"
                className={styles.previewImage}
              />
            ))}
          </div>
        )}
        <button type="button" onClick={handleImageUpload} disabled={uploadingImages || loading}>
          {uploadingImages ? 'Uploading Images...' : 'Upload Images to ImageKit'}
        </button>

        {uploadSuccess && (
          <div className={styles.successPopup}>
            Images uploaded successfully!
          </div>
        )}

        <div className={styles.amenities}>
          {commonAmenities.map((amenity) => (
            <label key={amenity}>
              <input
                type="checkbox"
                value={amenity}
                checked={hotelDetails.amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>

        <label>
          Featured:
          <input
            type="checkbox"
            name="featured"
            checked={hotelDetails.featured}
            onChange={handleInputChange}
          />
        </label>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={hotelDetails.title}
          onChange={handleInputChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={hotelDetails.description}
          onChange={handleInputChange}
        />

        <button type="submit" disabled={uploadingImages || loading}>
          {loading ? 'Submitting Hotel...' : 'Upload Hotel'}
        </button>
      </form>
    </div>
  );
};

export default UploadProperty;

import React, { useContext, useState } from 'react';
import styles from './amenities.module.css';
import { SearchContext } from '../../context/SearchContext';

const Amenities = () => {
  const { hotels, setHotels, originalHotels } = useContext(SearchContext);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const commonAmenities = [
    'WiFi',
    'Free Parking',
    'Swimming Pool',
    'Fitness Center',
    'Restaurant',
    'Bar/Lounge',
    'Room Service',
    'Spa',
    'Breakfast Included',
    'Pet-Friendly',
  ];

  const handleAmenityChange = (amenity) => {
    const isSelected = selectedAmenities.includes(amenity);
    const newAmenities = isSelected
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    setSelectedAmenities(newAmenities);
  };

  const handleFilterClick = () => {
    console.log("Hotels:", hotels);
    console.log("Selected Amenities:", selectedAmenities);

    if (selectedAmenities.length === 0) {
        setHotels(originalHotels);
        return;
    }

    const filteredHotels = originalHotels.filter((hotel) => {
      return selectedAmenities.some((amenity) =>
        hotel.amenities.some((hotelAmenity) =>
          hotelAmenity.toLowerCase() === amenity.toLowerCase()
        )
      );
    });

    console.log("Filtered Hotels:", filteredHotels);
    setHotels(filteredHotels);
};

  return (
    <div className={styles.container}>
      <h3>Filter by Amenities:</h3>
      {commonAmenities.map((amenity) => (
        <label key={amenity} className={styles.amenityLabel}>
          <input
            type="checkbox"
            value={amenity}
            checked={selectedAmenities.includes(amenity)}
            onChange={() => handleAmenityChange(amenity)}
          />
          {amenity}
        </label>
      ))}
      <button onClick={handleFilterClick}>Filter</button>
    </div>
  );
};

export default Amenities;
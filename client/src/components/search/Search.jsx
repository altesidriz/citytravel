import React, { useState, useEffect, useRef, useContext } from 'react';
import styles from './search.module.css';
import { FaLocationDot } from 'react-icons/fa6';
import { RiCalendarEventFill } from 'react-icons/ri';
import { IoMdPerson } from 'react-icons/io';
import DateSelect from '../../components/datepicker/DateSelect';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

const Search = () => {
  const {
    location,
    setLocation,
    selectedDates,
    setSelectedDates,
    travelers,
    setTravelers,
    fetchHotelsByLocation, // Changed to fetchHotelsByLocation
  } = useContext(SearchContext);

  const [openL, setOpenL] = useState(false);
  const [openDates, setOpenDates] = useState(false);
  const [openTravelers, setOpenTravelers] = useState(false);
  const locationRef = useRef(null);
  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationClick = () => {
    setOpenL(true);
  };

  const handleClickOutsideLocation = (event) => {
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setOpenL(false);
    }
  };

  useEffect(() => {
    if (openL) {
      document.addEventListener('mousedown', handleClickOutsideLocation);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideLocation);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideLocation);
    };
  }, [openL]);

  const handleDatesClick = () => {
    setOpenDates(true);
  };

  const handleDoneClick = (e) => {
    e.stopPropagation();
    setOpenDates(false);
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const formatDateRange = () => {
    if (selectedDates && selectedDates.length === 2) {
      return `${selectedDates[0].format('YYYY-MM-DD')} - ${selectedDates[1].format('YYYY-MM-DD')}`;
    }
    return 'Dates Range';
  };

  const handleTravelersClick = () => {
    setOpenTravelers(true);
  };

  const handleTravelersChange = (type, value) => {
    setTravelers({ ...travelers, [type]: value });
  };

  const handleChildrenAgeChange = (index, age) => {
    const newAges = [...travelers.childrenAges];
    newAges[index] = age;
    setTravelers({ ...travelers, childrenAges: newAges });
  };

  const handleTravelersDoneClick = (e) => {
    e.stopPropagation();
    setOpenTravelers(false);
  };

  const handleSearchClick = () => {
    fetchHotelsByLocation(location); // Fetch hotels using location
    navigate('/hotels'); // Navigate to hotels page
  };

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <ul>
          <li>Stays</li>
          <li>Flights</li>
          <li>Cars</li>
          <li>Packages</li>
          <li>Things to do</li>
          <li>Cruises</li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.component} ref={locationRef} onClick={handleLocationClick}>
          <FaLocationDot size={'1.5rem'} />
          <p>{location}</p>
          {openL && (
            <div className={styles.location}>
              <label htmlFor="location">Type location:</label>
              <input
                type="text"
                name="location"
                id="location"
                onChange={handleLocationChange}
              />
            </div>
          )}
        </div>
        <div className={styles.component} onClick={handleDatesClick}>
          <RiCalendarEventFill size={'1.5rem'} />
          <div className={styles.input}>
            <span>Dates</span>
            <p>{formatDateRange()}</p>
          </div>
          {openDates && (
            <div className={styles.dates}>
              <DateSelect onDateChange={handleDateChange} />
              <button onClick={handleDoneClick}>Done</button>
            </div>
          )}
        </div>
        <div className={styles.component} onClick={handleTravelersClick}>
          <IoMdPerson size={'1.5rem'} />
          <div className={styles.input}>
            <span>Travelers</span>
            <p>{`${travelers.adults} adults, ${travelers.children} children, ${travelers.rooms} rooms`}</p>
          </div>
          {openTravelers && (
            <div className={styles.travelers}>
              <label>Adults:</label>
              <input
                type="number"
                value={travelers.adults}
                onChange={(e) => handleTravelersChange('adults', parseInt(e.target.value))}
              />
              <label>Children:</label>
              <input
                type="number"
                value={travelers.children}
                onChange={(e) => handleTravelersChange('children', parseInt(e.target.value))}
              />
              {Array.from({ length: travelers.children }).map((_, index) => (
                <div key={index}>
                  <label>Child {index + 1} age:</label>
                  <select
                    value={travelers.childrenAges[index] || ''}
                    onChange={(e) => handleChildrenAgeChange(index, parseInt(e.target.value))}
                  >
                    <option value="">Select age</option>
                    {Array.from({ length: 18 }, (_, age) => (
                      <option key={age} value={age + 1}>
                        {age + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <label>Rooms:</label>
              <input
                type="number"
                value={travelers.rooms}
                onChange={(e) => handleTravelersChange('rooms', parseInt(e.target.value))}
              />
              <button onClick={handleTravelersDoneClick}>Done</button>
            </div>
          )}
        </div>
        <button onClick={handleSearchClick}>Search</button>
      </div>
    </div>
  );
};

export default Search;
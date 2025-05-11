import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './room.module.css'; // Import your CSS file
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext'; // Import SearchContext

const Room = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const { selectedDates, travelers } = useContext(SearchContext); // Get selectedDates and travelers
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/rooms/${roomId}`);
        if (!response.ok) {
          const message = `HTTP error: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    if (room && selectedDates && selectedDates.length === 2) {
      const checkIn = selectedDates[0];
      const checkOut = selectedDates[1];
      const nights = calculateNights(checkIn, checkOut);
      setTotalPrice(room.price * nights);
    } else {
      setTotalPrice(0);
    }
  }, [room, selectedDates]);

  const handleBookNow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!selectedDates || selectedDates.length !== 2) {
      alert('Please select check-in and check-out dates.');
      return;
    }

    if (!room || !room.hotelId) {
      alert('Hotel information is missing. Cannot proceed with booking.');
      return;
    }

    const checkIn = selectedDates[0].format('YYYY-MM-DD'); // Format the dates
    const checkOut = selectedDates[1].format('YYYY-MM-DD');
    const numberOfGuests = travelers.adults + travelers.children; // Calculate total guests

    const bookingData = {
      userId: user._id.$oid,
      roomId: room._id.$oid,
      hotelId: room.hotelId, // Include the hotelId
      checkIn: checkIn,
      checkOut: checkOut,
      numberOfGuests: numberOfGuests,
      totalPrice: totalPrice, // Use the calculated totalPrice
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const bookingResult = await response.json();
        alert('Booking successful!');
        // Optionally redirect to a booking confirmation page
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error during booking:', error);
      alert('Booking failed due to a network error.');
    }
  };

  const calculateNights = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  if (loading) {
    return <div className={styles.loading}>Loading room details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading room: {error}</div>;
  }

  if (!room) {
    return <div className={styles.noRoom}>No room details available.</div>;
  }

  const { _id, type, price, amenities, description, images } = room;
  const formattedDates = selectedDates && selectedDates.length === 2
    ? `${selectedDates[0].format('YYYY-MM-DD')} - ${selectedDates[1].format('YYYY-MM-DD')}`
    : 'Not Selected';
  const totalGuests = travelers.adults + travelers.children;

  return (
    <div className={styles.roomContainer}>
      <h2 className={styles.roomTitle}>{type.charAt(0).toUpperCase() + type.slice(1)} Room</h2>
      <p className={styles.RoomId}>Room ID: {_id}</p>
      <p className={styles.roomPrice}>Price per night: ${price}</p>

      {images && images.length > 0 && (
        <div className={styles.roomImages}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`${type} room`} className={styles.roomImage} />
          ))}
        </div>
      )}

      <div className={styles.roomDetails}>
        <h3 className={styles.amenitiesTitle}>Amenities:</h3>
        <ul className={styles.amenitiesList}>
          {amenities && amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
        <p className={styles.roomDescription}>{description}</p>
      </div>

      <div className={styles.bookingConfirmation}>
        <h3>Confirm Your Booking</h3>
        <p>Dates: {formattedDates}</p>
        <p>Guests: {totalGuests}</p>
        <p className={styles.totalPrice}>Total Price: ${totalPrice}</p> {/* Display total price */}
        <button className={styles.bookButton} onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Room;
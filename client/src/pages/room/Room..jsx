import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './room.module.css'; // Import your CSS file

const Room = () => {
  const { roomId } = useParams(); // Get the roomId from the URL parameters
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, [roomId]); // Re-run the effect if the roomId in the URL changes

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

  return (
    <div className={styles.roomContainer}>
      <h2 className={styles.roomTitle}>{type.charAt(0).toUpperCase() + type.slice(1)} Room</h2>
      <p className={styles.RoomId}>Room ID: {_id}</p>
      <p className={styles.roomPrice}>Price: ${price}</p>

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

      <button className={styles.bookButton}>Book Now</button>
    </div>
  );
};

export default Room;
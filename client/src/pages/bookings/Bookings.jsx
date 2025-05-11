import styles from './bookings.module.css'; // Import CSS Modules

const Bookings = () => {
  // Dummy data for bookings
  const bookings = [
    {
      id: 'B123',
      hotel: 'Grand Hyatt Sofia',
      roomType: 'Double',
      checkIn: '2025-05-15',
      checkOut: '2025-05-18',
      totalPrice: 350,
    },
    {
      id: 'B456',
      hotel: 'Hilton Plovdiv',
      roomType: 'Single',
      checkIn: '2025-06-01',
      checkOut: '2025-06-05',
      totalPrice: 280,
    },
    {
      id: 'B789',
      hotel: 'Sense Hotel Sofia',
      roomType: 'Suite',
      checkIn: '2025-07-10',
      checkOut: '2025-07-12',
      totalPrice: 520,
    },
  ];

  return (
    <div className={styles.bookingsContainer}>
      <h2 className={styles.bookingsTitle}>My Bookings</h2>
      {bookings.length > 0 ? (
        <ul className={styles.bookingsList}>
          {bookings.map((booking) => (
            <li key={booking.id} className={styles.bookingCard}>
              <h3 className={styles.hotelName}>{booking.hotel}</h3>
              <p className={styles.roomInfo}>Room Type: {booking.roomType}</p>
              <p className={styles.bookingDates}>Check-in: {booking.checkIn}</p>
              <p className={styles.bookingDates}>Check-out: {booking.checkOut}</p>
              <p className={styles.totalPrice}>Total Price: ${booking.totalPrice}</p>
              <button className={styles.viewDetailsButton}>View Details</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noBookings}>No bookings found.</p>
      )}
    </div>
  );
};

export default Bookings;
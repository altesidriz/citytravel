import RoomCard from '../../components/rooms/RoomCard';
import styles from './rooms.module.css';


const Rooms = ({ rooms }) => {
  return (
    <div className={styles.roomsContainer}>
      <h2>Available Rooms</h2>
      <div className={styles.roomCards}>
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
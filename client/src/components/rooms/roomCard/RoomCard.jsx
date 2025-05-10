import { useNavigate } from 'react-router-dom';
import styles from './roomCard.module.css';

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleNavigate = ()=> {
    navigate(`/room/${room._id}`)
  }
  return (
    <div className={styles.roomCard} onClick={handleNavigate}>
      <h3>{room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room</h3>
      <p>Price: ${room.price}</p>
      <p>Amenities: {room.amenities.join(', ')}</p>
      {room.images.length > 0 && <img src={room.images[0]} alt={`${room.type} Room`} />}
      <p>{room.description}</p>
      {/* You might add a "Select Room" button here */}
    </div>
  );
};

export default RoomCard;
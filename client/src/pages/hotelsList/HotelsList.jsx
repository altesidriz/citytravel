// HotelsList.jsx
import { useContext } from 'react';
import styles from './hotelslist.module.css';
import Search from '../../components/search/Search';
import Amenities from '../../components/amenities/Amenities';
import HotelCard from './hotelCard/HotelCard';
import { SearchContext } from '../../context/SearchContext';

const HotelsList = () => {
  const { hotels, loading, error } = useContext(SearchContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <Search />
      <div className={styles.listContainer}>
        {/* Amenities Filter */}
        <Amenities />
        <div className={styles.hotelsList}>
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelsList;
import { useState, useEffect, useContext } from 'react';
import styles from './myProperties.module.css'; // Import CSS Modules
import { AuthContext } from '../../context/AuthContext';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        if (user && user._id) {
          const response = await fetch(`/api/hotels/user/${user._id}`);
          if (!response.ok) {
            const message = `HTTP error: ${response.status}`;
            throw new Error(message);
          }
          const data = await response.json();
          setProperties(data);
        } else {
          // Handle case where user is not logged in or _id is missing
          setProperties([]);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, [user]);

  if (loading) {
    return <div className={styles.loading}>Loading your properties...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading properties: {error}</div>;
  }


  return (
    <div className={styles.myPropertiesContainer}>
      <h2 className={styles.myPropertiesTitle}>My Properties</h2>
      {properties.length > 0 ? (
        <ul className={styles.propertiesList}>
          {properties.map((property) => (
            <li key={property._id.$oid} className={styles.propertyCard}>
              <h3 className={styles.propertyName}>{property.name}</h3>
              <p className={styles.propertyLocation}>Location: {property.city}, {property.address}</p>
              <p className={styles.propertyDetails}>Type: {property.type}</p>
              <p className={styles.propertyRating}>Rating: {property.rating}/5</p>
              <p className={styles.propertyPrice}>Price: ${property.price}</p>
              {property.amenities && property.amenities.length > 0 && (
                <p className={styles.propertyAmenities}>Amenities: {property.amenities.join(', ')}</p>
              )}
              <button className={styles.editButton}>Edit</button>
              <button className={styles.deleteButton}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noProperties}>You haven&apost listed any properties yet.</p>
      )}
    </div>
  );
};

export default MyProperties;
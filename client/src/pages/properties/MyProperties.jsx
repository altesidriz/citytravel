import styles from './myProperties.module.css'; // Import CSS Modules

const MyProperties = () => {
  // Dummy data for properties
  const properties = [
    {
      id: 'P101',
      name: 'Cozy Apartment in Sofia',
      location: 'Sofia, Bulgaria',
      rooms: 3,
      rating: 4.5,
    },
    {
      id: 'P202',
      name: 'Luxury Villa in Plovdiv',
      location: 'Plovdiv, Bulgaria',
      rooms: 5,
      rating: 4.8,
    },
    {
      id: 'P303',
      name: 'Seaside Studio in Varna',
      location: 'Varna, Bulgaria',
      rooms: 1,
      rating: 4.2,
    },
  ];

  return (
    <div className={styles.myPropertiesContainer}>
      <h2 className={styles.myPropertiesTitle}>My Properties</h2>
      {properties.length > 0 ? (
        <ul className={styles.propertiesList}>
          {properties.map((property) => (
            <li key={property.id} className={styles.propertyCard}>
              <h3 className={styles.propertyName}>{property.name}</h3>
              <p className={styles.propertyLocation}>Location: {property.location}</p>
              <p className={styles.propertyDetails}>Rooms: {property.rooms}</p>
              <p className={styles.propertyRating}>Rating: {property.rating}/5</p>
              <button className={styles.editButton}>Edit</button>
              <button className={styles.deleteButton}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noProperties}>No properties listed yet.</p>
      )}
    </div>
  );
};

export default MyProperties;
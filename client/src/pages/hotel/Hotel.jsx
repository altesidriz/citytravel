import React, { useEffect, useState } from 'react';
import styles from './hotel.module.css';
import { useParams } from 'react-router-dom';
import Gallery from '../../components/gallery/Gallery';

const Hotel = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showGallery, setShowGallery] = useState(false);

    useEffect(() => {
        const fetchHotel = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/hotels/find/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch hotel');
                }
                const data = await response.json();
                setHotel(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    const handleOpenGallery = () => {
        setShowGallery(true);
      };
    
      const handleCloseGallery = () => {
        setShowGallery(false);
      };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!hotel) return <p>Hotel not found</p>;

    return (
        <div className={styles.container}>
            {/* IMAGE GALERY */}
            <div className={styles.imageGallery}>
                {hotel.images.length > 0 && (
                    <div className={styles.mainImage}>
                        <img src={hotel.images[0]} alt="Main Hotel" />
                    </div>
                )}
                <div className={styles.sideImages}>
                    {hotel.images.slice(1, 5).map((image, index) => (
                        <div key={index} className={styles.sideImage}>
                            <img src={image} alt={`Side Hotel ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <button className={styles.galleryButon} onClick={handleOpenGallery}>More+</button>
            </div>
            {/* ABOUT PROPERTY */}
            <div className={styles.about}>
                <div className={styles.leftContent}>
                    <h1>{hotel.name}</h1>
                    <h3><span>{hotel.rating}</span>Wonderful</h3>
                    <h3>About this property</h3>
                    <p>{hotel.title}</p>
                    <div className={styles.amenities}>
                        {hotel.amenities.map((amenity, index) => (
                            <span key={index}>{amenity}</span>
                        ))}
                    </div>
                </div>
                <div className={styles.rightContent}>
                    MAP
                </div>
            </div>
            {/* SELECT ROOMS */}
            <div className={styles.roomsCard}>
            </div>
            {/* QUESTION SECTION */}
            <div className={styles.question}>
                <h1>Have a question?</h1>
                <textarea name="question" id="question"></textarea>
                <button>Send</button>
            </div>
            {showGallery && <Gallery images={hotel.images} onClose={handleCloseGallery} />}
        </div>
    )
}

export default Hotel
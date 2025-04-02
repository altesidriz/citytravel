import React from 'react';
import styles from './hotelCard.module.css';
import { useNavigate } from 'react-router-dom';


const HotelCard = ({ hotel }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/hotels/${hotel._id}`);
    };

    return (
        <div className={styles.container} onClick={handleCardClick}>
            <div className={styles.left}>
                <img src={hotel.images[0]} />
            </div>
            <div className={styles.right}>
                <h1>{hotel.name}</h1>
                <span>{hotel.city}</span>
                <h4>{hotel.title}</h4>
                <p>Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nobis accusamus fugit nulla harum! Sed pariatur inventore eum dolores perferendis architecto mollitia, qui distinctio consequatur nisi excepturi et ipsam explicabo.</p>
                <div className={styles.ratePrice}>
                    <div className={styles.rating}>
                        <h2>{hotel.rating.toFixed(2)}</h2>
                        <span>Wonderfull</span>
                    </div>
                    <div className={styles.price}>
                        <h2>${hotel.price}</h2>
                        <span>includes taxes and fees</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelCard
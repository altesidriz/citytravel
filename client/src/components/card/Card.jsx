import React from 'react';
import styles from './card.module.css'

const Card = ({img, city, country}) => {
  
  return (
    <div className={styles.card}>
        <div className={styles.image}>
        <img src={img} alt="" />
        </div>
        <div className={styles.desc}>
            <h3>{city}</h3>
            <p>{country}</p>
        </div>
    </div>
  )
}

export default Card
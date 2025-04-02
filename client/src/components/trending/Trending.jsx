import React, { useRef, useState, useEffect } from 'react';
import styles from './trending.module.css';
import locations from '../../utils/Places.js';

const Trending = () => {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth);
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 300;
    current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    currentRef.addEventListener('scroll', checkScrollPosition);

    return () => currentRef.removeEventListener('scroll', checkScrollPosition);
  }, []);



  return (
    <div className={styles.container}>
      <h3>Explore trending destinations</h3>
      <div className={styles.scrollContainer}>
        {showLeftButton && <button onClick={() => scroll('left')} className={styles.scrollButton}>◀</button>}
        <div ref={scrollRef} className={styles.horizontalScroll}>
          {locations.map((location, index) => (
            <div className={styles.item} key={index}>
              <div className={styles.image}>
                <img src={location.img} alt="" />
              </div>
              <div className={styles.desc}>
                <h3>{location.city}</h3>
                <p>{location.country}</p>
              </div>
            </div>
          ))}
        </div>
        {showRightButton && <button onClick={() => scroll('right')} className={styles.scrollButton}>▶</button>}
      </div>
    </div>
  );
};

export default Trending
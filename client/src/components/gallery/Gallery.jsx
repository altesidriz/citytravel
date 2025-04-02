// Gallery.jsx
import React, { useState } from 'react';
import styles from './gallery.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Gallery = ({ images, onClose }) => {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleImageClick = (index) => {
    setCarouselIndex(index);
    setCarouselOpen(true);
  };

  const handleCarouselClose = () => {
    setCarouselOpen(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modalContent}>
        <div className={styles.imagesContainer}>
          {images.map((image, index) => (
            <div key={index} className={styles.imageWrapper} onClick={() => handleImageClick(index)}>
              <img src={image} alt={`Gallery Image ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
        {carouselOpen && (
          <div className={styles.carouselModal}>
            <div className={styles.carouselOverlay} onClick={handleCarouselClose}></div>
            <div className={styles.carouselContent}>
              <Carousel selectedItem={carouselIndex} showThumbs={false}>
                {images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Carousel Image ${index + 1}`} />
                  </div>
                ))}
              </Carousel>
              <button className={styles.carouselCloseButton} onClick={handleCarouselClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
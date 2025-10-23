import React, { useState, useEffect } from 'react';
import './Banner.css';
import img112 from '../../assets/img/112.png';
import catImg from '../../assets/img/cat.png';
import groupImg from '../../assets/img/Group.svg';

export const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Array de imágenes del slider
  const images = [
    { src: img112, alt: "Banner 1" },
    { src: catImg, alt: "Banner 2" },
    { src: groupImg, alt: "Banner 3" }
  ];

  const totalSlides = images.length;

  // Función para cambiar slide
  const showSlide = (index) => {
    console.log('Mostrando slide:', index);
    const normalizedIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    setCurrentSlide(normalizedIndex);
  };

  // Función para ir al siguiente slide
  const nextSlide = (e) => {
    e?.stopPropagation();
    console.log('Click en next');
    showSlide(currentSlide + 1);
  };

  // Función para ir al slide anterior
  const prevSlide = (e) => {
    e?.stopPropagation();
    console.log('Click en prev');
    showSlide(currentSlide - 1);
  };

  // Función para ir a un slide específico
  const goToSlide = (index) => {
    console.log('Click en dot:', index);
    showSlide(index);
  };

  // Auto-play opcional (descomenta si quieres que cambie automáticamente)
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [currentSlide]);
  */

  useEffect(() => {
    console.log('Banner inicializado correctamente');
  }, []);

  return (
    <div className="hero-slider">
      <div className="slider-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={index === currentSlide ? 'active' : ''}
          />
        ))}
        
        <button className="prev" onClick={prevSlide}>
          &#10094;
        </button>
        
        <button className="next" onClick={nextSlide}>
          &#10095;
        </button>
        
        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// CarouselBanner.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../image/cimg1.png';
import img2 from '../image/cimg2.png';
import img3 from '../image/cimg3.png';
import './CarouselBanner.css';

const CarouselBanner = () => {
  const settings = {
    dots: true,           // Show navigation dots
    infinite: true,       // Loop through slides
    speed: 500,           // Transition speed
    slidesToShow: 1,      // Show one slide at a time
    slidesToScroll: 1,    // Scroll one slide at a time
    autoplay: true,       // Enable autoplay
    autoplaySpeed: 3000,  // Autoplay interval
  };

  const slides = [
    { id: 1, image: img1, alt: 'Slide 1' },
    { id: 2, image: img2, alt: 'Slide 2' },
    { id: 3, image: img3, alt: 'Slide 3' },
  ];

  return (
    <div className="carousel-banner">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <img src={slide.image} alt={slide.alt} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselBanner;
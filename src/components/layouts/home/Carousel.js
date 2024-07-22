import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComponent = () => {
  const imageProp = ['pizza', 'burger', 'sandwich'];
  return (
    <Carousel
      autoPlay
      infiniteLoop
      navButtonAlwaysVisible
      showStatus={false}
      emulateTouch
      showThumbs={false}
      axis='horizontal'
    >
      {imageProp.map((image, index) => (
        <div
          key={index}
          style={{ maxHeight: '36rem' }}
          className='object-center brightness-50'
        >
          <img src={`/pizza.jpg`} alt='pizza' key={index} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;

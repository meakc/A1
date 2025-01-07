// Home.js

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarouselBanner from './CarouselBanner';
import ClientsSection from './ClientsSection';
import CollectionNumbers from './CollectionNumbers';
import HistorySection from './HistorySection'; // Import the HistorySection component
import Footer from './Footer';

function Home() {
  return (
    <div className='home'>
      <div className='hero-section'>
        <HistorySection />
        <ClientsSection />
        {/* <CarouselBanner /> */}
        <CollectionNumbers />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
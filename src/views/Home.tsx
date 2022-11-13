import React from 'react';
import Carousel from '../components/Carousel';
import moda from '../assets/moda.jpg';
import moda2 from '../assets/moda2.jpg';

export default function Home() {
  const images = [moda, moda2];

  return <Carousel images={images} autoPlay showButtons />;
}

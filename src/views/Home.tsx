import React from 'react';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
import moda from '../assets/moda.jpg';
import moda2 from '../assets/moda2.jpg';

export default function Home() {
  const images = [moda, moda2];

  return (
    <>
      <Header />
      <Carousel images={images} autoPlay showButtons />
    </>
  );
}

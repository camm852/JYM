import React from 'react';
import Carousel from '../components/Carousel';
import { moda, moda2, product1, product2, product3, product4, product5 } from '../assets/assests';
import Information from '../components/Information';
import CarouselProducts from '../components/CarouselProducts';
import NavBar from '../components/navBar/NavBar';

export default function Home() {
  const imagesCarouselInfo: Array<string> = [moda, moda2];
  const imagesCarouselProducts: Array<string> = [product1, product2, product3, product4, product5];

  return (
    <div className="">
      <Carousel images={imagesCarouselInfo} autoPlay showButtons />
      <Information />
      <div className="mt-2 pt-7 h-screen justify-center">
        <h2 className="text-center mt-5 mb-16 text-4xl font-bold uppercase w-full">
          Últimos Productos
        </h2>
        <div className="ml-14 md:ml-16 lg:ml-16 overscroll-x-none">
          <CarouselProducts products={imagesCarouselProducts} />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Carousel from '../components/Carousel';
import {
  moda,
  moda2,
  moda3,
  product1,
  product2,
  product3,
  product4,
  product5
} from '../assets/assests';
import Information from '../components/Information';
import Footer from '../components/Footer';
import Spiner from '../components/Spinner/Spiner';

const CarouselProducts = React.lazy(() => import('../components/CarouselProducts'));

export default function Home() {
  const imagesCarouselInfo: Array<string> = [moda, moda2, moda3];
  const imagesCarouselProducts: Array<string> = [product1, product2, product3, product4, product5];

  return (
    <div className="-mt-1">
      <Carousel images={imagesCarouselInfo} autoPlay showButtons />
      <Information />
      <div className="my-2 pt-7 min-h-screen justify-center mb-10">
        <h2 className="text-center mt-5 mb-16 text-3xl font-bold uppercase w-full">
          Últimos Productos
        </h2>
        <React.Suspense fallback={<Spiner />}>
          <CarouselProducts products={imagesCarouselProducts} />
        </React.Suspense>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

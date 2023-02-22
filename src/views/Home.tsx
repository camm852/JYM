import React from 'react';
import { useQuery } from 'react-query';
import CarouselImages from '../components/CarouselImages';
import { moda, moda3 } from '../assets/assests';
import Information from '../components/Information';
import Footer from '../components/Footer';
import Spiner from '../components/SpinnerCircle/SpinerCircle';
import CardProduct from '../components/CardProduct';
import apiUrl, { getRandomProducts, getRecentlyProducts } from '../utils/api';
import { TProductTable } from '../vite-env';
import SpinnerDiamond from '../components/SpinnerDiamond/SpinnerDiamond';

const CarouselProducts = React.lazy(
  () => import('../components/CarouselProducts')
);

export default function Home() {
  const imagesCarouselInfo: Array<string> = [moda3, moda];

  const {
    isLoading: isLoadingRandom,
    isError: isErrorRandom,
    data: dataRandom
  } = useQuery({
    queryKey: ['randomProducts'],
    queryFn: getRandomProducts
  });

  const {
    isLoading: isLoadingRecently,
    isError: isErrorRecently,
    data: dataRecently
  } = useQuery({
    queryKey: ['recenltyProducts'],
    queryFn: getRecentlyProducts
  });

  if (isLoadingRandom && isLoadingRecently) return <div />;
  return (
    <div className="-mt-1">
      <CarouselImages images={imagesCarouselInfo} autoPlay showButtons />
      <Information />
      <div className="mt-20 justify-center">
        <h2 className="mb-10 relative text-center text-2xl font-bold uppercase w-full">
          Agregados Recientemente
        </h2>
        <React.Suspense fallback={<Spiner />}>
          {isLoadingRecently ? (
            <SpinnerDiamond />
          ) : (
            !isErrorRecently &&
            dataRecently && <CarouselProducts products={dataRecently} />
          )}
        </React.Suspense>
      </div>
      <div className="mt-16 justify-center">
        <h2 className="mb-6 relative text-center  text-2xl font-bold uppercase w-full">
          Los más vendidos
        </h2>
        <React.Suspense fallback={<Spiner />}>
          <div className="mb-16">
            <div className="hidden md:flex flex-row flex-wrap gap-10 p-5 justify-center">
              {isLoadingRandom ? (
                <SpinnerDiamond />
              ) : (
                !isErrorRandom &&
                dataRandom &&
                dataRandom.map((product: TProductTable) => (
                  <CardProduct product={product} key={product.id} />
                ))
              )}
            </div>
            <div className="md:hidden">
              <CarouselProducts products={dataRandom} />
            </div>
          </div>
        </React.Suspense>
      </div>
      <Footer />
    </div>
  );
}

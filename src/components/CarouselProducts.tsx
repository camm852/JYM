import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardProduct from './CardProduct';
import { IPropsCarouseProducts } from '../vite-env';

export default function CarouselProducts(
  props: IPropsCarouseProducts
): JSX.Element {
  const { products } = props;

  const [slider, setSlider] = React.useState<Slider | null>(null);

  const next = (): void => slider?.slickNext();

  const prev = (): void => slider?.slickPrev();

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    slidesToShow: 4,
    centerMode: true,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="overflow-x-hidden">
      <Slider
        ref={(c: Slider | null): void => {
          setSlider(c);
        }}
        {...settings}
      >
        {products.map((product, i) => (
          <CardProduct product={product} key={product.id} />
        ))}
      </Slider>
      <div className="flex gap-5 mt-8  justify-center">
        <button
          onClick={prev}
          className="p-1 border-2 border-gray-400 rounded-full bg-transparent"
          style={{
            WebkitTapHighlightColor: 'rgb(0,0,0,0)'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </button>
        <button
          onClick={next}
          className="p-1 border-2 border-gray-400 rounded-full bg-transparent"
          style={{
            WebkitTapHighlightColor: 'rgb(0,0,0,0)'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

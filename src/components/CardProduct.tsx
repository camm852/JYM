import React from 'react';
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from '../utils/currencyFormat';
import { IPropsCardProduct } from '../vite-env';

export default function CardProduct({
  product
}: IPropsCardProduct): JSX.Element {
  const navigate = useNavigate();

  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);

  return (
    <div
      className={`w-56 sm:w-48  md:w-64 ${
        !imageLoaded ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-300`}
    >
      <div className="h-96 sm:h-[350px]">
        <img
          src={product.image}
          alt={`${product.name}`}
          className="rounded-xl w-full h-[95%] md:h-full"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="w-full relative">
          <button
            className="group absolute bottom-2 right-4 w-9 pt-1  bg-white rounded-2xl overflow-hidden transition-all duration-300 ease-in-out hover:bg-sky-500  hover:text-white"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{
              WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            }}
          >
            <i className="inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </i>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap mt-3">
        <div className="md:w-3/4">
          <p className="capitalize font-semibold opacity-70 ">{product.name}</p>
        </div>
        <div className="md:w-1/4 pr-7">
          <p className="text-end font-semibold">
            {currencyFormat(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}

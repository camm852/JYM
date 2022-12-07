import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PropsCardProduct as Props } from '../vite-env';

export default function CardProduct(props: Props): JSX.Element {
  const { image } = props;

  const navigate = useNavigate();

  return (
    <div className="w-56 sm:w-48  md:w-52">
      <div className="relative h-96 sm:h-80">
        <img src={image} alt={`${image}`} className="rounded-xl" />
        <div className="absolute  w-full bottom-14 md:bottom-1 right-0 pr-2 text-right">
          <button
            className="group relative w-9 pt-1 bg-white rounded-2xl overflow-hidden transition-all duration-500 ease-in-out hover:w-32 hover:pt-2 hover:pr-4 hover:pl-4 hover:text-left"
            onClick={() => navigate('/product/1')}
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
            <span className="absolute right-2 top-5 opacity-0 group-hover:opacity-100  group-hover:top-2 group-hover:transition-all group-hover:duration-300 group-hover:delay-100 group-hover:ease-in capitalize font-semibold">
              Visualizar
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-nowrap -mt-3 md:mt-8">
        <div className="w-3/4">
          <p className="capitalize font-semibold opacity-70">Flamboyant Pink Top</p>
        </div>
        <div className="w-1/4">
          <p className="capitalize text-end font-bold">$40000</p>
        </div>
      </div>
    </div>
  );
}

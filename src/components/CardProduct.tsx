import React from 'react';
import { PropsCardProduct as Props } from '../vite-env';

export default function CardProduct(props: Props): JSX.Element {
  const { image } = props;

  return (
    <div className="w-56  md:w-64">
      <div className="relative h-96">
        <img src={image} alt={`${image}`} className="rounded-xl" />
        <div className="absolute w-full bottom-14 md:bottom-1 right-0 pr-4 text-right">
          <button className="group relative w-9 pt-1 bg-white rounded-2xl overflow-hidden transition-all duration-500 ease-in-out hover:w-48 hover:pt-2 hover:pr-4 hover:pl-4 hover:text-left">
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
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </i>
            <span className="absolute right-2 top-5 opacity-0 group-hover:opacity-100  group-hover:top-2 group-hover:transition-all group-hover:duration-300 group-hover:delay-100 group-hover:ease-in capitalize font-semibold">
              Agregar al carrito
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

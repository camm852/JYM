/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import { man, mastercard, medida, moda3, product1, visa, woman } from '../assets/assests';
import { useAppDispatch } from '../redux/store/Hooks';
import { add } from '../redux/slices/CartSlice';
import { CartProduct } from '../vite-env';

export default function Product(): JSX.Element {
  const [sizeSelected, setSizeSelected] = React.useState<string>('S');
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => setLoaded(true), []);

  const dispatch = useAppDispatch();

  const sizes = [
    {
      size: 'XS',
      active: false
    },
    {
      size: 'S',
      active: false
    },
    {
      size: 'M',
      active: false
    },
    {
      size: 'L',
      active: false
    },
    {
      size: 'XL',
      active: false
    },
    {
      size: 'XXL',
      active: false
    }
  ];

  const product: CartProduct = {
    image: product1,
    name: 'Cool Flufy Clothing without Stripes',
    description: 'aditional info',
    price: 35000,
    color: 'ROSA',
    size: 'L',
    mount: 1
  };

  return (
    <div
      className={`w-full absolute -left-full transition-all duration-500 ${
        loaded ? '-left-1' : ''
      }`}
    >
      <div className="flex flex-row flex-wrap lg:flex-nowrap gap-8 justify-center mt-10 h-full px-4 xl:pr-32 xl:pl-28">
        <div className="w-full lg:w-1/2">
          <img src={moda3} alt="producto" className="w-full h-full rounded-md object-cover" />
        </div>
        <div className="w-full lg:w-1/2 pb-5">
          <div>
            <h2 className="text-3xl font-semibold">Cool Clothing with Brown Stripes</h2>
          </div>
          <div className="mt-6">
            <p className="text-5xl font-normal">$3.99</p>
          </div>
          <div className="mt-4">
            <p className="text-xl font-semibold">Seleccione la talla:</p>
          </div>
          <div className="flex gap-3 flex-row mt-2">
            {sizes.map((size, i) => (
              <button
                key={i}
                className={`${
                  size.size !== 'XXL' ? 'w-9' : 'w-11'
                } h-9 text-center  p-2 border-2 rounded-md ${
                  size.size === sizeSelected ? 'border-blue-500 text-blue-500' : 'border-gray-600'
                } text-sm font-semibold text-center`}
                onClick={() => setSizeSelected(size.size)}
              >
                {size.size}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nobis sit quidem
              similique ut reiciendis quaerat reprehenderit labore exercitationem deserunt modi et
              qui ullam, impedit sint repudiandae. Quis, magni libero?
            </p>
          </div>
          <div className="flex flex-row mt-3">
            <button className="group border border-l-0 w-1/2 p-2 hover:bg-blue-500 transition-all duration-200 ease-linear">
              <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                <span className="relative flex w-10 m-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-1 w-8 h-8 lg:mt-0 bg-transparent  group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>

                  <span className="absolute right-0  -top-1 lg:top-0 rounded-full bg-blue-500 w-4 h-4 p-0 m-0 text-white font-mono text-sm  leading-tight text-center scroll">
                    <p className="leading-4">+</p>
                  </span>
                </span>
              </li>
            </button>
            <button
              className="group border border-r-0 w-1/2 p-2 hover:bg-blue-500 transition-all duration-200 ease-linear"
              onClick={() => dispatch(add(product))}
            >
              <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                <span className="relative flex w-10 m-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-1 w-8 h-8 lg:mt-0 bg-transparent group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  <span className="absolute right-0 -top-1  lg:top-0 rounded-full bg-blue-500 w-4 h-4  m-0 text-white font-mono text-sm  leading-tight text-center scroll ">
                    <p className="leading-4">+</p>
                  </span>
                </span>
              </li>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row flex-wrap mt-7 w-full bg-blue-50 py-9">
        {/*  Pagos */}
        <div className="flex flex-row justify-center gap-20 w-full lg:w-1/2 ">
          <div className="flex flex-col gap-6">
            <img src={mastercard} alt="" className="w-24" />
            <img src={visa} alt="" className="w-24" />
          </div>
          <div className="w-1/2">
            <div className="flex gap-2 flex-nowrap text-gray-600 items-center">
              <h4 className="block font-semibold text-3xl ">Medios de Pago</h4>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
              </p>
            </div>
            <p className="block mt-3 text-md text-gray-500 text-justify">
              Los medios de pago incluyen tarjetas de crédito y débito, puedes contactarte a nuestro
              whatsApp si deseas adquirir tu producto por otro medio de pago.
            </p>
          </div>
        </div>
        {/* Medidas */}
        <div className="flex flex-row justify-center gap-20 w-full lg:w-1/2 px-3 lg:px-0">
          <div className="flex flex-col gap-6">
            <img src={medida} alt="" className="w-24 h-32" />
          </div>
          <div className="w-1/2">
            <div className="flex gap-2 flex-nowrap text-gray-600 items-center">
              <h4 className="block font-semibold text-3xl ">Guía de medidas</h4>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              </p>
            </div>
            <p className="block mt-3 text-md text-gray-500 text-justify">
              Asegurate de elegir la talla correcta. Puedes consultar tu en los siguientes enlaces:
            </p>
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-7">
              <div className="mt-1">
                <Link
                  to="https://www.zalando-prive.es/sizehelper/women/measure/#/"
                  className="text-gray-500 hover:text-gray-700 transition-all duration-150 ease-linear"
                >
                  <div className="flex items-center gap-3">
                    <img src={woman} alt="" className="w-10" />
                    <p>Mujer</p>
                  </div>
                </Link>
              </div>
              <Link
                to="https://www2.hm.com/es_mx/customer-service/sizeguide/hombre.html"
                className="text-gray-500 hover:text-gray-700 transition-all duration-150 ease-linear"
              >
                <div className="flex items-center gap-3">
                  <img src={man} alt="" className="w-10" />
                  <p>Hombre</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

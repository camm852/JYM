import React from 'react';
import { man, mastercard, medida, visa, woman } from '../assets/assests';

export default function ProductBannerInformation() {
  return (
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
            Los medios de pago incluyen tarjetas de crédito y débito, puedes
            contactarte a nuestro whatsApp si deseas adquirir tu producto por
            otro medio de pago.
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
            Asegurate de elegir la talla correcta. Puedes consultar tu en los
            siguientes enlaces:
          </p>
          <div className="flex flex-wrap lg:flex-nowrap justify-center gap-7">
            <div className="mt-1">
              <a
                href="https://www.zalando-prive.es/sizehelper/women/measure/"
                target="_blank"
                className="text-gray-500 hover:text-gray-700 transition-all duration-150 ease-linear"
                rel="noreferrer"
              >
                <div className="flex items-center gap-3">
                  <img src={woman} alt="" className="w-10" />
                  <p>Mujer</p>
                </div>
              </a>
            </div>
            <a
              href="https://www2.hm.com/es_mx/customer-service/sizeguide/hombre.html"
              className="text-gray-500 hover:text-gray-700 transition-all duration-150 ease-linear"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center gap-3">
                <img src={man} alt="" className="w-10" />
                <p>Hombre</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

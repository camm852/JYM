import React from 'react';
import { useNavigate } from 'react-router-dom';
import { notFound } from '../assets/assests';

export default function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
      <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
        <div className="w-full md:w-1/2">
          <div className="mb-10 lg:mb-20">
            <p className="text-3xl font-bold text-gray-800">SHOPJYM</p>
          </div>
          <div className="mb-10 md:mb-20 text-gray-600 font-light">
            <h1 className="font-black uppercase text-3xl lg:text-5xl text-blue-500 mb-10">
              ¡Parece que estás perdido!
            </h1>
            <p className="text-lg ">La página que buscas no esta disponible.</p>
          </div>
          <div className="mb-20 md:mb-0">
            <button
              className="flex flex-nowrap text-lg  transform transition-all hover:scale-110 text-blue-300 hover:text-blue-500"
              onClick={() => navigate('..')}
            >
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
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Volver
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 text-center">
          <img src={notFound} alt="404.png" className="w-full max-w-lg mx-auto" />
        </div>
      </div>
    </div>
  );
}

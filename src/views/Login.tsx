import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/JYMLOGO.png';
import moda3 from '../assets/moda3.jpg';

export default function Login() {
  return (
    <div className="block lg:flex ">
      <div className="w-full lg:w-2/6 px-4 md:mt-3 lg:mt-4">
        <img src={logo} alt="logo" className="m-auto mt-4 sm:mt-0 w-56" />
        <form action="" className="p-4 flex flex-col justify-center items-center">
          <h2 className="font-semibold">Entra a tu cuenta para continuar</h2>
          <input
            type="text"
            name="email"
            id="email"
            className="w-full  sm:w-4/6 lg:w-full border-b text-slate-700 border-gray-300 focus:outline-none mt-8 focus:border-orange-200 bg-transparent "
            placeholder="ejemplo@gmail.com"
          />
          <input
            type="password"
            name="password"
            id="password"
            className="w-full sm:w-4/6  lg:w-full border-b border-gray-300 text-slate-700  focus:outline-none mt-3 focus:border-orange-200 bg-transparent "
            placeholder="**********************"
          />
          <button className="w-full sm:w-4/6 lg:w-full mt-8 p-2 border rounded-md bg-orange-200 hover:bg-orange-300 font-medium hover:text-white transition-all duration-300">
            Entrar
          </button>
          <div className="flex justify-end mt-3">
            <p className="mr-2">¿Aun no tienes una cuenta?</p>
            <Link to="/signup" className="underline">
              Registrarse
            </Link>
          </div>
        </form>
      </div>
      <div className="w-4/6 hidden lg:block lg:h-screen lg:overflow-y-hidden ">
        <img src={moda3} alt="" className="lg:h-screen" />
      </div>
    </div>
  );
}

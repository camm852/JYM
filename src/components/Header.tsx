import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { LOGO } from '../assets/assests';
import ButtonMenu from './ButtonMenu';
import NavBar from './navBar/NavBar';

export default function Header() {
  const [navBar, setNavBar] = React.useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col">
        {/* Button menu */}
        <div className="md:hidden">
          <ButtonMenu setNavBar={setNavBar} navBar={navBar} />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center content-center p-2 gap-2 h-30">
          {/*  Logo */}
          <div className="w-full lg:w-1/3 bg-white flex items-center justify-center">
            <button onClick={() => navigate('/')}>
              <img src={LOGO} className="w-16 md:w-20 mb-1 " alt="" />
            </button>
          </div>
          {/* barra de busqueda */}
          <div className="w-full lg:w-1/3  flex items-center justify-center">
            <form className="w-full md:w-2/3 lg:w-full flex items-center">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              >
                Buscar...
              </label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full bg-slate-100 rounded-xl outline-none border-none"
                  placeholder="Search Mockups, Logos..."
                  required
                />
                <button type="button" className="flex absolute inset-y-0 right-0 items-center pr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-slate-400 hover:text-slate-500 transition-all duration-150"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          {/* Login - carrito */}
          <div className="w-full lg:w-1/3 bg-white  flex items-center justify-center">
            {/* Login Registro */}
            <div className="flex flex-nowrap">
              <Link to="/login">
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </Link>
              <p className="inline-block font-medium ml-2">Entra o Registrate</p>
            </div>
            {/** Carrito */}
            <div className="ml-4 lg:mt-0">
              <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                <a href="#" role="button" className="relative flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-1 w-8 h-8 lg:mt-0 bg-transparent"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span className="absolute right-0 lg:top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center scroll -top-2">
                    5
                  </span>
                </a>
              </li>
            </div>
            <p className="inline-block font-medium ml-2">Carrito</p>
            <div />
          </div>
        </div>
      </div>
      {/* NavBar */}
      <NavBar openNavBar={navBar} />
      <div className="bg-neutral-100">
        <Outlet />
      </div>
    </>
  );
}

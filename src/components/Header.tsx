import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { LOGO } from '../assets/assests';
import ButtonMenu from './ButtonMenu';
import Cart from './Cart/Cart';
import NavBar from './NavBar';
import { useAppSelector } from '../redux/store/Hooks';

export default function Header() {
  const [navBar, setNavBar] = React.useState<boolean>(false);
  const [activeCart, setActiveCart] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);

  return (
    <div className="bg-white overflow-y-hidden">
      <div className="flex relative flex-col shadow-lg md:shadow-none">
        {/* Boton menu responsive */}
        <div className="md:hidden">
          <ButtonMenu setNavBar={setNavBar} navBar={navBar} />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center content-center p-2 gap-2 h-30">
          {/*  LOGO */}
          <div className="w-full lg:w-1/3 flex items-center justify-center">
            <button onClick={() => navigate('/')}>
              <img src={LOGO} className="w-28 md:w-32 mb-1 " alt="" />
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
                  className="block p-4 pl-10 w-full bg-gray-100 rounded-xl outline-none border-none"
                  placeholder="Search Mockups, LOGOs..."
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
          <div className="w-full lg:w-1/3 bg-white  flex items-center justify-center">
            {/* Login Registro */}
            <div className="flex flex-col lg:flex-row lg:flex-nowrap items-center mt-4 lg:mt-0">
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
            <button className="ml-4 lg:mt-0" onClick={() => setActiveCart(!activeCart)}>
              <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                <span className="relative flex">
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  <span className="absolute right-2 lg:-right-2  lg:top-0 rounded-full bg-blue-500 w-4 h-4 p-0 m-0 text-white text-center">
                    <p className="text-sm">{items.length}</p>
                  </span>
                </span>
              </li>
              <p className="inline-block font-medium ml-2">Carrito</p>
            </button>
            <div />
          </div>
        </div>
      </div>
      <Cart setActiveCart={setActiveCart} activeCart={activeCart} products={items} />
      {/* NavBar */}
      <NavBar openNavBar={navBar} />
      <Outlet />
    </div>
  );
}

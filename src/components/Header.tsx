import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGO } from '../assets/assests';
import ButtonMenu from './ButtonMenu';
import Cart from './Cart/Cart';
import NavBar from './NavBar';
import { useAppSelector } from '../redux/store/Hooks';
import { showCart } from '../redux/slices/CartSlice';

export default function Header() {
  const [navBar, setNavBar] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const { items, visible } = useAppSelector((state) => state.cart);
  const { rol } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

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
            <button
              onClick={() => navigate('/')}
              style={{
                WebkitTapHighlightColor: 'rgb(0,0,0,0)'
              }}
            >
              <img src={LOGO} className="w-28 md:w-32 mb-1 " alt="" />
            </button>
          </div>
          {/* barra de busqueda */}
          <div className="w-full lg:w-1/3  flex items-center justify-center">
            <form className="w-full md:w-2/3 lg:w-full flex items-center">
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full bg-gray-100 rounded-xl outline-none border-none"
                  placeholder="Encuentra tu prenda..."
                />
                <button
                  className="flex absolute inset-y-0 right-0 items-center pr-3"
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
            {rol === 'user' ? (
              <Link
                to="/dashboard"
                className="flex flex-col lg:flex-row lg:flex-nowrap items-center mt-4 lg:mt-0"
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
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <p className="inline-block font-medium ml-2">Ir al perfil</p>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex flex-col lg:flex-row lg:flex-nowrap items-center mt-4 lg:mt-0"
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
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
                <p className="inline-block font-medium ml-2">
                  Entra o Registrate
                </p>
              </Link>
            )}
            {/** Carrito */}
            {window.location.pathname !== '/checkout' ? (
              <button
                className="ml-4 lg:mt-0"
                // onClick={() => setActiveCart(!activeCart)}
                onClick={() => dispatch(showCart(!visible))}
                style={{
                  WebkitTapHighlightColor: 'rgb(0,0,0,0)'
                }}
              >
                <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                  <span className="relative flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="flex-1 w-7 h-7 lg:mt-0 bg-transparent"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    <span className="absolute right-2 lg:-right-1  lg:top-0 rounded-full bg-blue-500 w-4 h-4 p-0 m-0 text-white text-center">
                      <p className="text-xs leading-[15px]">{items.length}</p>
                    </span>
                  </span>
                </li>
                <p className="inline-block font-medium ml-2">Carrito</p>
              </button>
            ) : null}
            <div />
          </div>
        </div>
      </div>
      <Cart activeCart={visible} products={items} />
      <NavBar openNavBar={navBar} setNavBar={setNavBar} />
      <div
        className={`${!visible ? 'block' : 'hidden'} ${
          !navBar ? 'block' : 'hidden'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

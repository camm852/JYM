import React from 'react';
import { Link } from 'react-router-dom';
import { PropsNavBar as Props, LinksNavBar } from '../vite-env';

export default function NavBar(props: Props): JSX.Element {
  const { openNavBar } = props;

  const [categories, setCategories] = React.useState<boolean>(false);

  const links: Array<LinksNavBar> = [
    {
      id: 2,
      to: '/men',
      name: 'hombres'
    },
    {
      id: 3,
      to: '/women',
      name: 'mujeres'
    },
    {
      id: 1,
      to: '/about-us',
      name: '¿quienes somos?'
    }
  ];

  return (
    <div className="shadow-l py-1">
      <div className="hidden md:block bg-blue-400">
        <div className="w-full flex gap-10 justify-center h-10">
          {/* Categoriass */}
          <div className="group flex items-center gap-1 rounded-md p-2  text-left font-semibold text-white cursor-pointer transition-all duration-75 ease-linear  ">
            <div className="group-hover:text-lg">Categorias</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 transition-transform duration-300  group-hover:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            {/* sub Categorias */}
            <div className="absolute w-48 hidden group-hover:block sm:mt-1  lg:-mt-1  z-0 group-hover:z-10 top-60 lg:top-28 transition-opacity duration-200 text-black">
              <div className="bg-blue-400 p-2 rounded-lg">
                {links.map((link) => (
                  <div
                    key={link?.id}
                    className="rounded-xl text-white hover:text-lg p-2 transition-all duration-100 ease-linear mb-4"
                  >
                    <Link to={link.to} className="font-semibold capitalize">
                      {link.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {links.map((link) => (
            <div
              key={link?.id}
              className="rounded-md p-2 text-white hover:text-lg  transition-all duration-75 ease-linear"
            >
              <Link to={link.to} className="font-semibold capitalize">
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <div
        className={`absolute  md:hidden bg-white top-11 w-full h-screen z-10 pt-5 px-4 duration-500 ${
          openNavBar ? 'left-0' : 'left-[-100%]'
        }`}
      >
        <button
          className="flex rounded-xl mb-4 w-full p-2 active:bg-blue-400 active:text-white cursor-pointer transition-all duration-75 ease-linear text-left font-semibold "
          onClick={() => setCategories(!categories)}
          style={{
            WebkitTapHighlightColor: 'rgb(0,0,0,0)'
          }}
        >
          <div className="flex-1">Categorias</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 transition-all duration-200 ${categories ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </button>
        {/* sub categorias */}
        {categories ? (
          <div className="pl-5 duration-1000">
            {links.map((link) => (
              <div
                key={link?.id}
                className="rounded-xl active:bg-blue-400 active:text-white transition-all duration-100 p-2  mb-4"
              >
                <Link to={link.to} className="font-semibold capitalize">
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        ) : null}
        {links.map((link) => (
          <div
            key={link?.id}
            className="rounded-xl active:bg-blue-400 active:text-white p-2 transition-all duration-100 ease-linear mb-4"
          >
            <Link to={link.to} className="font-semibold capitalize">
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { IPropsNavBar as Props, ILinksNavBar } from '../vite-env';

export default function NavBar(props: Props): JSX.Element {
  const { openNavBar, setNavBar } = props;

  const [showSubCategories, setShowSubCategories] = React.useState({
    state: false,
    index: 0
  });

  const links: Array<ILinksNavBar> = [
    {
      title: 'Categorias',
      subMenu: [
        {
          id: 1,
          to: '/men',
          name: 'Casual'
        },
        {
          id: 2,
          to: '/women',
          name: 'Elegante'
        },
        {
          id: 3,
          to: '#',
          name: 'Deportivo'
        }
      ]
    },
    {
      title: 'Productos',
      subMenu: [
        {
          id: 4,
          to: '/men',
          name: 'Ropa'
        },
        {
          id: 5,
          to: '/women',
          name: 'Bolzos'
        }
      ]
    },
    {
      title: 'Género',
      subMenu: [
        {
          id: 7,
          to: '/men',
          name: 'Hombre'
        },
        {
          id: 8,
          to: '/women',
          name: 'Mujer'
        },
        {
          id: 9,
          to: '#',
          name: 'Unisex'
        }
      ]
    }
  ];

  return (
    <div className="shadow-l py-1">
      <div className="hidden md:block bg-blue-400">
        <div className="w-full flex gap-10 justify-center h-10">
          {/* Categoriass */}
          {links.map((link: ILinksNavBar, i) => (
            <div
              key={i}
              className="group flex items-center gap-1 rounded-md p-2  text-left font-semibold text-white cursor-pointer transition-all duration-75 ease-linear  "
            >
              <div className="group-hover:text-lg">{link.title}</div>
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
              <div className="absolute w-36 hidden group-hover:block sm:mt-1  lg:-mt-1  z-0 group-hover:z-10 top-60 lg:top-28 transition-opacity duration-200 text-black">
                <div className="bg-blue-400 p-2 rounded-lg">
                  {link.subMenu.map((linksSubmenu) => (
                    <div
                      key={linksSubmenu?.id}
                      className="rounded-xl text-white hover:text-lg p-2 transition-all duration-100 ease-linear mb-4"
                    >
                      <Link to={linksSubmenu.to} className="font-semibold capitalize">
                        {linksSubmenu.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="rounded-md p-2 text-white hover:text-lg  transition-all duration-75 ease-linear">
            <Link
              to="#"
              className="font-semibold capitalize"
              onClick={() => window.scroll({ top: 10000, behavior: 'smooth' })}
            >
              Acerca de
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <div
        className={`absolute  md:hidden bg-white top-11 w-full h-screen z-10 pt-5 px-4 duration-500 ${
          openNavBar ? 'left-0' : 'left-[-100%]'
        }`}
      >
        {links.map((link: ILinksNavBar, i) => (
          <div key={i}>
            <button
              className="flex rounded-xl mb-4 w-full p-2 active:bg-blue-400 active:text-white cursor-pointer transition-all duration-75 ease-linear text-left font-semibold "
              onClick={() =>
                setShowSubCategories({
                  state: !(showSubCategories.state && showSubCategories.index === i),
                  index: i
                })
              }
              style={{
                WebkitTapHighlightColor: 'rgb(0,0,0,0)'
              }}
            >
              <div className="flex-1">{link.title}</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 transition-all duration-200 ${
                    !(showSubCategories.state && showSubCategories.index === i) ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </button>
            {showSubCategories.index === i && showSubCategories.state && (
              <div className=" group-focus:block pl-5 duration-1000">
                {link.subMenu.map((linkSubmenu) => (
                  <div
                    key={linkSubmenu?.id}
                    className="rounded-xl active:bg-blue-400 active:text-white transition-all duration-100 p-2  mb-4"
                  >
                    <Link to={linkSubmenu.to} className="font-semibold capitalize">
                      {linkSubmenu.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mb-4 w-full p-2 active:bg-blue-400 rounded-md active:text-white cursor-pointer transition-all duration-75 ease-linear text-left font-semibold ">
          <Link
            to="#"
            className="font-semibold capitalize"
            onClick={() => {
              window.scroll({ top: 10000, behavior: 'smooth' });
              setNavBar(!openNavBar);
            }}
          >
            Acerca de
          </Link>
        </div>
      </div>
    </div>
  );
}

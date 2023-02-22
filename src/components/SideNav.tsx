import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/UserSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/Hooks';
import { routesLayaoutAdmin, routesLayaoutUser } from '../utils/routes';

interface IProps {
  openSideNav: boolean;
}

export default function SideNav({ openSideNav }: IProps): JSX.Element {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { rol } = useAppSelector((state) => state.user);

  return (
    <aside
      className={`${
        openSideNav ? 'translate-x-0' : ' -translate-x-96'
      } fixed inset-0 z-10 my-4 ml-4 h-[calc(100vh-32px)] w-80 rounded-xl transition-transform duration-300 xl:translate-x-0 bg-white shadow-lg shadow-gray-400 `}
    >
      <div className="relative border-b border-">
        <Link to="/dashboard" className="flex items-center gap-10 py-6 px-8">
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
              d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
            />
          </svg>
          <h6 className="text-2xl font-bold">Shop J&M</h6>
        </Link>
      </div>
      <div className="m-4">
        {rol === 'admin' &&
          routesLayaoutAdmin.map(({ icon, name, path }, key) => (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              <li key={name}>
                <NavLink to={`/dashboard${path}`}>
                  {({ isActive }) => {
                    const active: boolean = window.location.href.includes(path);
                    return (
                      <button
                        className={`flex items-center gap-4 px-4 py-3 w-full capitalize ${
                          isActive || active
                            ? 'text-white bg-sky-500 shadow-sm shadow-sky-300 hover:shadow-lg hover:shadow-sky-200'
                            : 'hover:bg-slate-200 text-slate-600'
                        }  rounded-lg text-lg transition-all duration-200`}
                        style={{
                          WebkitTapHighlightColor: 'rgb(0,0,0,0)'
                        }}
                      >
                        {icon}
                        <p className="font-medium capitalize">{name}</p>
                      </button>
                    );
                  }}
                </NavLink>
              </li>
            </ul>
          ))}
        {rol === 'user' && (
          <>
            {routesLayaoutUser.map(({ icon, name, path }, key) => (
              <ul key={key} className="mb-4 flex flex-col gap-1">
                <li key={name}>
                  <NavLink to={`/dashboard${path}`}>
                    {({ isActive }) => (
                      <button
                        className={`flex items-center gap-4 px-4 py-3 w-full capitalize ${
                          isActive
                            ? 'text-white bg-sky-500 shadow-sm shadow-sky-300 hover:shadow-lg hover:shadow-sky-200'
                            : 'hover:bg-slate-200 text-slate-600'
                        }  rounded-lg text-lg transition-all duration-200`}
                        style={{
                          WebkitTapHighlightColor: 'rgb(0,0,0,0)'
                        }}
                      >
                        {icon}
                        <p className="font-medium capitalize">{name}</p>
                      </button>
                    )}
                  </NavLink>
                </li>
              </ul>
            ))}
            <button
              className="group absolute bottom-12 left-5 hover:text-sky-500  transition-all duration-200 text-slate-400"
              onClick={() => navigate('/')}
              style={{
                WebkitTapHighlightColor: 'rgb(0,0,0,0)'
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </>
        )}
        <button
          className="group absolute bottom-12 right-5 hover:text-sky-500  transition-all duration-200 text-slate-400"
          onClick={() => dispatch(logout())}
          style={{
            WebkitTapHighlightColor: 'rgb(0,0,0,0)'
          }}
        >
          <p className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Cerrar Sesión
          </p>
        </button>
      </div>
    </aside>
  );
}

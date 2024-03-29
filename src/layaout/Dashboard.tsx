import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';

export default function Dashboard(): JSX.Element {
  const [openSideNav, setOpenSideNav] = React.useState<boolean>(false);

  return (
    <div className="min-h-screen  bg-gray-100">
      <SideNav openSideNav={openSideNav} />
      <div className="px-6 py-4 xl:ml-80">
        <div className="w-full mb-3 h-9 flex items-center justify-end ">
          <button
            className="block xl:hidden z-20"
            onClick={() => setOpenSideNav(!openSideNav)}
            style={{
              WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

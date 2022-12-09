import React from 'react';
import { PropsButtonMenu as Props } from '../vite-env';

export default function ButtonMenu(props: Props): JSX.Element {
  const { setNavBar, navBar } = props;

  return (
    <div className="absolute top-1 left-5 sm:left-10 transition-all duration-200 ease-out  rounded-full  p-1">
      <button
        onClick={() => setNavBar(!navBar)}
        style={{
          WebkitTapHighlightColor: 'rgb(0,0,0,0)'
        }}
      >
        {navBar ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

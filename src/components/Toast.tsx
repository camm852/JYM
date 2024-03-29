import React from 'react';
import { IPropsToast } from '../vite-env';

export default function Toast({ stateToast, openToast, text, error }: IPropsToast): JSX.Element {
  React.useEffect(() => {
    if (stateToast) setTimeout(() => openToast(false), 2500);
  }, [stateToast, openToast]);

  return (
    <div
      id="toast-success"
      className="flex items-center p-3 mb-4 w-full max-w-xs bg-white rounded-lg shadow dark:text-gray-800 dark:bg-white border border-gray-300"
      role="alert"
    >
      <div
        className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8  bg-green-100 rounded-2xl ${
          error ? 'dark:bg-red-500 dark:text-red-200' : 'dark:bg-green-500 dark:text-green-200'
        } `}
      >
        {!error ? (
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div className="ml-3 text-xs sm:text-sm sm:font-normal">{text}</div>
      <button
        type="button"
        className="ml-2 -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 active:text-gray-900  p-1.5 inline-flex h-8 w-8 dark:text-gray-500"
        data-dismiss-target="#toast-success"
        aria-label="Close"
        style={{
          WebkitTapHighlightColor: 'rgb(0,0,0,0)'
        }}
        onClick={() => openToast(false)}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

Toast.defaultProps = {
  error: false
};

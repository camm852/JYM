import React from 'react';
import Chart, { Props as IApexCharts } from 'react-apexcharts';

export default function ChartStatistics({ chart }: IApexCharts) {
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6">
        <div style={{ minHeight: '235px' }}>
          <Chart {...chart} />
        </div>
      </div>
      <div className="p-6">
        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
          Website View
        </h6>
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
          Last Campaign Performance
        </p>
      </div>
      <div className="p-6 border-t border-blue-gray-50 px-6 py-5">
        <p className="antialiased font-sans text-sm leading-normal flex items-center font-normal text-blue-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4 text-inherit"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          &nbsp;campaign sent 2 days ago
        </p>
      </div>
    </div>
  );
}

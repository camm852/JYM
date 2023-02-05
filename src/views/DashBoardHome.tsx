import React from 'react';
import CardStatistics from '../components/CardStatistics';
import ChartStatistics from '../components/ChartStatistics';
import { chartsConfig } from '../utils/chartsConfig';
import { ICardStatistics } from '../vite-env';

export default function DashBoardHome() {
  const statisticsCards: ICardStatistics[] = [
    {
      title: 'Dinero de hoy',
      value: 53000,
      percent: 20,
      footer: 'Ultima semana',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      title: 'Usuarios registrados',
      value: 2000,
      percent: 5,
      footer: 'Ultimo mes',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      )
    },
    {
      title: 'Nuevos clientes',
      value: 400,
      percent: -7,
      footer: 'Que ayer',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
        </svg>
      )
    },
    {
      title: 'Ventas',
      value: 53000,
      percent: 5,
      footer: 'Que ayer',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
            clipRule="evenodd"
          />
        </svg>
      )
    }
  ];

  const optionsChart = {
    type: 'bar',
    height: 220,
    series: [
      {
        name: 'Views',
        data: [50, 20, 10, 22, 50, 10, 40]
      }
    ],
    options: {
      ...chartsConfig,
      colors: '#fff',
      plotOptions: {
        bar: {
          columnWidth: '16%',
          borderRadius: 5
        }
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
      }
    }
  };

  return (
    <div>
      <div className="xl:pl-5 mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCards.map((card: ICardStatistics, i) => (
          <CardStatistics
            key={i}
            title={card.title}
            value={card.value}
            icon={card.icon}
            footer={card.footer}
            percent={card.percent}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 ">
        <ChartStatistics chart={optionsChart} />
        <ChartStatistics chart={optionsChart} />
      </div>
    </div>
  );
}

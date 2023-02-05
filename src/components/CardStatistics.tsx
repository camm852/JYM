import { ICardStatistics } from '../vite-env';

export default function CardStatistics(props: ICardStatistics): JSX.Element {
  const { icon, value, footer, percent, title } = props;
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-sky-600 to-sky-400 text-white shadow-sky-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
        {icon}
      </div>
      <div className="p-4 text-right">
        <p className="block antialiased font-sans  text-sm leading-normal font-medium text-blue-gray-600">
          {title}
        </p>
        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
          {value}
        </h4>
      </div>
      <div className="border-t border-blue-gray-50 p-4">
        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
          <strong className={`${percent < 0 ? 'text-red-500' : ' text-green-500'} `}>
            {percent < 0 ? `-${percent * -1}` : `+${percent}`}%
          </strong>{' '}
          {footer}
        </p>
      </div>
    </div>
  );
}

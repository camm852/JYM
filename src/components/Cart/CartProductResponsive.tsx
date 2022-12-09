/* eslint-disable react/jsx-one-expression-per-line */
import { decrease, increase, remove } from '../../redux/slices/CartSlice';
import { useAppDispatch } from '../../redux/store/Hooks';
import { PropsCartProduct } from '../../vite-env';

export default function CartProductResponsive(props: PropsCartProduct) {
  const { product, indexProduct } = props;
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-3 mb-2 border-b pb-2">
      <img src={product.image} alt="" className="w-28 h-44 sm:w-36 sm:h-56 rounded-md" />
      <div className="flex flex-col gap-1 sm:gap-3 w-full">
        <p className="text-xs md:text-lg font-semibold">{product.name}</p>
        <p className="text-sm md:text-base font-light">
          Color: <span className="uppercase">{product.color}</span>
        </p>
        <p className="text-sm md:text-base font-light">
          Talla: <span className="uppercase">{product.size}</span>
        </p>
        <p className="text-sm md:text-base font-light">Precio:${product.price}</p>
        <div className="flex flex-row items-center rounded-lg gap-1">
          <button
            className="w-9 bg-gray-200 text-gray-600  active:bg-gray-300   rounded-l"
            onClick={() => dispatch(decrease(indexProduct))}
            style={{
              WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            }}
          >
            <span className="m-auto text-2xl font-thin">−</span>
          </button>
          <p>{product.mount}</p>
          <button
            className="w-9   bg-blue-300 active:bg-sky-500  rounded-r"
            onClick={() => dispatch(increase(indexProduct))}
            style={{
              WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            }}
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
        <p className="text-sm md:text-base font-normal mt-1 sm:mt-3">
          Total: ${product.mount * product.price}
        </p>
      </div>
      <div>
        <button
          onClick={() => dispatch(remove(indexProduct))}
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
            className="w-4 h-4 font-bold"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

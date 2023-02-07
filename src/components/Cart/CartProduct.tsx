/* eslint-disable react/jsx-one-expression-per-line */
import { decrease, increase, remove } from '../../redux/slices/CartSlice';
import { useAppDispatch } from '../../redux/store/Hooks';
import { currencyFormat } from '../../utils/currencyFormat';
import { IPropsCartProduct } from '../../vite-env';

export default function CartProduct(props: IPropsCartProduct): JSX.Element {
  const { indexProduct, product } = props;

  const dispatch = useAppDispatch();

  return (
    <tr>
      <td className="text-center">
        <p>{indexProduct + 1}</p>
      </td>
      <td className="pt-4 pl-4 pr-12">
        <div className="flex items-center gap-10">
          <img src={product.image} alt="" className="w-16 h-20 rounded-sm" />
          <div className="flex flex-col gap-2">
            <p className="lg:text-sm xl:text-lg font-semibold">
              {product.name}
            </p>
            <p className="font-light">{product.description}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="text-center font-light uppercase">{product.color}</p>
      </td>
      <td>
        <p className="text-center font-light uppercase">{product.size}</p>
      </td>
      <td>
        <p className="text-center font-light">
          {currencyFormat(product.price * product.mount)}
        </p>
      </td>
      <td>
        <div className="flex flex-row justify-center items-center rounded-lg gap-2">
          <button
            className="w-9 bg-gray-200 text-gray-600  hover:bg-gray-300   rounded-l"
            onClick={() => dispatch(decrease(indexProduct))}
            style={{
              WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            }}
          >
            <span className="m-auto text-2xl font-light">−</span>
          </button>
          <p>{product.mount}</p>
          <button
            className="w-9  bg-blue-300 hover:bg-sky-500  rounded-r"
            onClick={() => dispatch(increase(indexProduct))}
            style={{
              WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            }}
          >
            <span className="m-auto text-2xl font-light">+</span>
          </button>
        </div>
      </td>
      <td>
        <p className="text-center">
          {currencyFormat(product.mount * product.price)}
        </p>
      </td>
      <td>
        <div className="flex flex-row justify-center items-center lg:pr-3 xl:pr-0">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

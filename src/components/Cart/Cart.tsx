import React from 'react';
import { clear } from '../../redux/slices/CartSlice';
import { useAppDispatch } from '../../redux/store/Hooks';
import { PropsCart } from '../../vite-env';
import CartProduct from './CartProduct';
import CartProductResponsive from './CartProductResponsive';

export default function Cart(props: PropsCart): JSX.Element {
  const { setActiveCart, activeCart, products } = props;

  const dispatch = useAppDispatch();

  return (
    <aside
      className={`absolute z-10 h-96 w-full   transition-all duration-300 shadow-xl shadow-slate-300 ${
        activeCart ? 'left-0 ' : '-left-full'
      } bg-slate-200`}
    >
      <div className="relative">
        <div className="h-1 w-full">
          {/* Boton de cerrar el carrito */}
          <button className="group float-right p-1" onClick={() => setActiveCart(!activeCart)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mt-3 px-7 bg-slate-200 h-[540px] 2xl:h-[85vh]">
          <div className="flex flex-col h-full">
            {/* Productos del carrito */}
            <div className="w-full flex-grow bg-white overflow-y-auto rounded-md">
              {/* Normal */}
              <table className="hidden lg:table m-auto">
                <thead className="border-b ">
                  <tr className="text-left">
                    <th scope="col" className="px-6 py-4 text-left font-normal text-lg">
                      Producto
                    </th>
                    <th className="text-transparent px-6 py-4">imagen</th>
                    <th className="px-6 py-4 text-left font-normal text-lg">Color</th>
                    <th className="px-6 py-4 text-left font-normal text-lg">Talla</th>
                    <th className="px-6 py-4 text-left font-normal text-lg">Precio</th>
                    <th className="px-6 py-4 text-left font-normal text-lg">Cantidad</th>
                    <th className="px-6 py-4 text-left font-normal text-lg">Total</th>
                  </tr>
                </thead>
                <tbody className="hidden lg:table-row-group">
                  {products.map((product, i) => (
                    <CartProduct key={i} indexProduct={i} product={product} />
                  ))}
                </tbody>
              </table>
              {/* responsive */}
              <div className="block lg:hidden p-2">
                {products.map((product, i) => (
                  <CartProductResponsive key={i} indexProduct={i} product={product} />
                ))}
              </div>
            </div>
            {/* Botones del carrito */}
            <div className="flex flex-grow-0 p-2 justify-end gap-3">
              <button
                className="w-32 p-3 uppercase font-bold border rounded-xl text-white bg-gray-400 hover:bg-black hover:text-white transition-all duration-200 ease-linear hover:opacity-70"
                onClick={() => dispatch(clear())}
              >
                Limpiar
              </button>
              <button className="w-32 p-3 uppercase font-bold border rounded-xl text-white bg-blue-400 hover:bg-sky-600 transition-all duration-200 ease-linear">
                Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

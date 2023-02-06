import React from 'react';
import { ICartProduct, IPropsShoppingProducts } from '../vite-env';

export default function ShoppingProducts({
  items
}: IPropsShoppingProducts): JSX.Element {
  return (
    <div className="px-4 py-5">
      <p className="text-xl font-medium">Resumen de los productos</p>
      <div className="mt-8 space-y-3 rounded-lg  bg-white px-2 py-4 sm:px-6 max-h-[31rem] overflow-y-auto">
        {items.map((item: ICartProduct, i: number) => (
          <div
            key={i}
            className="flex flex-col rounded-lg bg-white sm:flex-row"
          >
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src={item.image}
              alt={item.name}
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">{item.name}</span>
              <div className="flex gap-2">
                <span className="float-right text-gray-400 mt-1 block">
                  Cantidad: {item.mount}
                </span>
              </div>
              <p className="text-lg font-semibold mt-2">
                ${item.price * item.mount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

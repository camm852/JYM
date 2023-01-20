import React from 'react';
import md5 from 'md5';
import { useAppSelector, useAppDispatch } from '../redux/store/Hooks';
import { ICartProduct, ICartState, IFormCheckout } from '../vite-env';
import { decrease, increase, remove } from '../redux/slices/CartSlice';
import { flagcol, city } from '../assets/assests';

export default function Checkout(): JSX.Element {
  const date = new Date();

  const [subTotal, setSubTotal] = React.useState<number>(0);
  const [form, setForm] = React.useState<IFormCheckout>({
    buyerEmail: '',
    buyerFullName: '',
    shippingAddress: '',
    shippingCity: '',
    payerPhone: '',
    payerDocument: ''
  });
  const [elementsSignature, setElementsSignature] = React.useState({
    referenceCode: `PAGO${date.getDate()}${
      date.getMonth() + 1
    }${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
    amount: 0,
    currency: 'COP'
  });
  const [signature, setSignature] = React.useState<string>('');
  const { items }: ICartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const subtotal = items.reduce(
      (accumulator: number, currentValue: ICartProduct) =>
        accumulator + currentValue.price * currentValue.mount,
      0
    );
    setSubTotal(subtotal + 8000);
    setElementsSignature({ ...elementsSignature, amount: subtotal + 8000 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  React.useEffect(() => {
    const elementsForSignature = {
      ApiKey: import.meta.env.VITE_API_KEY,
      merchantId: import.meta.env.VITE_MERCHANT_ID,
      ...elementsSignature
    };
    const buildSignature = Object.values(elementsForSignature)
      .map((element) => element)
      .join('~');
    setSignature(md5(buildSignature));
  }, [elementsSignature]);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <p className="text-2xl font-bold text-gray-800">SHOPJYM</p>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <p className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </p>
                <span className="font-semibold text-gray-900">Seleccionar</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">
                  2
                </p>
                <span className="font-semibold text-gray-900">Pagar</span>
              </li>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                  3
                </p>
                <span className="font-semibold text-gray-500">Finalizar compra</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Productos */}
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Resumen de los productos seleccionados</p>
          <p className="text-gray-400">Revisa los productos.</p>
          {items.length > 0 ? (
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 max-h-[31rem] overflow-y-auto">
              {items.map((item: ICartProduct, i: number) => (
                <div key={i} className="flex flex-col rounded-lg bg-white sm:flex-row">
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
                      {/* Decrease */}
                      <button
                        className="px-2 bg-slate-100 rounded-md"
                        onClick={() => dispatch(decrease(i))}
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
                          className="w-3 h-6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                      </button>
                      {/* Increase */}
                      <button
                        className="px-2 bg-slate-100 rounded-md"
                        onClick={() => dispatch(increase(i))}
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
                          className="w-3 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                      {/* Delete */}
                      <button
                        className="px-2 bg-slate-100 rounded-md"
                        onClick={() => dispatch(remove(i))}
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
                          className="w-3 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-lg font-semibold mt-2">${item.price * item.mount}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex flex-wrap items-center justify-center">
              <div>
                <h2 className="w-full text-xl font-semibold block">No se han agregado Productos</h2>
                <p className="ml-[41%] mt-3 text-center color text-sky-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                    />
                  </svg>
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Formulario de compra */}
        <form
          className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0"
          method="post"
          action={import.meta.env.VITE_PAYMENT_URL}
        >
          <p className="text-xl font-medium">Detalles del pago</p>
          <p className="text-gray-400">Complete su pedido proporcionando sus datos de pago.</p>
          <div className="">
            <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                name="buyerEmail"
                value={form.buyerEmail}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                onChange={handleForm}
                required
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">
              Titular de la compra
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-5/12">
                <input
                  type="text"
                  name="buyerFullName"
                  value={form.buyerFullName}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-xs uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Nombre completo"
                  onChange={handleForm}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative flex-shrink-0 sm:w-4/12">
                <input
                  type="text"
                  name="payerDocument"
                  value={form.payerDocument}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Documento"
                  onChange={handleForm}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative flex-shrink-0 sm:w-3/12">
                <input
                  type="text"
                  name="payerPhone"
                  value={form.payerPhone}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="telefono"
                  onChange={handleForm}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-slate-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <label htmlFor="shippingAddress" className="mt-4 mb-2 block text-sm font-medium">
              Dirección de envio
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="shippingAddress"
                  name="shippingAddress"
                  value={form.shippingAddress}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Dirección"
                  onChange={handleForm}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img className="h-4 w-4 object-contain" src={flagcol} alt="" />
                </div>
              </div>
              <div className="relative flex-shrink-0 sm:w-5/12">
                <input
                  type="text"
                  name="shippingCity"
                  value={form.shippingCity}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ciudad"
                  onChange={handleForm}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img className="h-4 w-4 object-contain" src={city} alt="" />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  $
                  {items.reduce(
                    (accumulator: number, currentValue: ICartProduct) =>
                      accumulator + currentValue.price * currentValue.mount,
                    0
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Envio</p>
                <p className="font-semibold text-gray-900">$8000</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">${subTotal}</p>
            </div>
          </div>
          <input name="merchantId" type="hidden" value={import.meta.env.VITE_MERCHANT_ID} />
          <input name="referenceCode" type="hidden" value={elementsSignature.referenceCode} />
          <input name="accountId" type="hidden" value={import.meta.env.VITE_ACCOUNT_ID} />
          <input name="description" type="hidden" value="Venta de Ropa Y bolzos" />
          <input name="currency" type="hidden" value="COP" />
          <input name="amount" type="hidden" value={subTotal} />
          <input name="tax" type="hidden" value="0" />
          <input name="taxReturnBase" type="hidden" value="0" />
          <input name="signature" type="hidden" value={signature} />
          <input name="test" type="hidden" value={import.meta.env.VITE_MODE === '1' ? '1' : '0'} />
          <input
            name="responseUrl"
            type="hidden"
            value={`${import.meta.env.VITE_DOMAIN}/payment-response`}
          />
          <input name="shippingCountry" type="hidden" value="CO" />
          <input name="payerFullName" type="hidden" value={form.buyerFullName} />
          <button
            className={`mt-4 mb-8 w-full rounded-md ${
              items.length > 0 ? 'bg-sky-500' : 'bg-sky-700'
            }  px-6 py-3 font-medium text-white`}
            type="submit"
            disabled={items.length === 0}
          >
            Realizar Orden
          </button>
        </form>
      </div>
    </>
  );
}

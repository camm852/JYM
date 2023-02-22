import React from 'react';
import { useNavigate } from 'react-router-dom';
import Spiner from '../components/SpinnerCircle/SpinerCircle';
import Toast from '../components/Toast';
import { addMany, clear } from '../redux/slices/CartSlice';
import { login } from '../redux/slices/UserSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/Hooks';
import apiUrl from '../utils/api';
import { currencyFormat } from '../utils/currencyFormat';
import {
  ICartProduct,
  ICartState,
  IConfirmPurchase,
  IUserState
} from '../vite-env';

export default function PaymentResponse(): JSX.Element {
  const [paymentResponse, setPaymentResponse] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openToast, setOpenToast] = React.useState<boolean>(false);
  const [messageToast, setMessageToast] = React.useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const cart: ICartState = useAppSelector((state) => state.cart);
  const user: IUserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      cart.items.length === 0 &&
      window.localStorage.getItem('cart') !== null
    ) {
      const products: ICartProduct[] = JSON.parse(
        window.localStorage.getItem('cart') ?? ''
      );
      dispatch(addMany(products));
      window.localStorage.removeItem('cart');
    }
    if (
      Object.values(user).includes('') &&
      window.localStorage.getItem('user') !== null
    ) {
      const userStorage: IUserState = JSON.parse(
        window.localStorage.getItem('user') ?? ''
      );
      dispatch(login(userStorage));
      window.localStorage.removeItem('user');
    }
  }, [cart.items, user, dispatch]);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let paymentresponse = {};
    for (const [key, value] of urlParams.entries()) {
      paymentresponse = { ...paymentresponse, [key]: value };
    }
    if (Object.entries(paymentresponse).length < 43) navigate('/checkout');
    else setPaymentResponse(paymentresponse);
  }, [navigate]);

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    if (paymentResponse.lapTransactionState !== 'APPROVED') {
      navigate('/');
    } else {
      const body: IConfirmPurchase = {
        products: cart.items,
        purchaseRef: paymentResponse.referenceCode,
        paymentRef: paymentResponse.reference_pol,
        total: paymentResponse.TX_VALUE,
        buyerEmail: paymentResponse.buyerEmail,
        buyerPhone: user.phone,
        processingDate: paymentResponse.processingDate,
        shippingAddress: window.localStorage.getItem('shippingAddress') ?? '',
        city: window.localStorage.getItem('city') ?? '',
        department: 'meta'
      };
      window.localStorage.removeItem('city');
      window.localStorage.removeItem('shippingAddress');
      try {
        // await apiUrl.post('/venta/', body);
        //  {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`
        //   }
        // });

        setTimeout(() => {
          setLoading(false);
          navigate('/dashboard/user-shopping/1');
          dispatch(clear());
        }, 1000);
      } catch (error) {
        console.log(error);
        setMessageToast({
          error: true,
          message: 'Algo ha salido mal'
        });
        setLoading(false);
        setOpenToast(true);
      }
    }
  };
  if (!paymentResponse) return <div />;
  return (
    <>
      <div
        className={`fixed  ${
          !openToast ? '-right-full' : 'right-8'
        } bottom-1 transition-all duration-150 ease-in-out z-50`}
      >
        {openToast && (
          <Toast
            openToast={setOpenToast}
            stateToast={openToast}
            error={messageToast.error}
            text={messageToast.message}
          />
        )}
      </div>
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </p>
                <span className="font-semibold text-gray-900">Pagar</span>
              </li>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">
                  3
                </p>
                <span className="font-semibold text-gray-900">
                  Finalizar Compra
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        {/* Productos */}
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Resumen de compra</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 max-h-[31rem] overflow-y-auto">
            {cart.items.map((item: ICartProduct, i: number) => (
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
                    {currencyFormat(item.price * item.mount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Detalles de la compra */}
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Detalles de la compra</p>
          <div className="flex flex-col  border-t py-2">
            <div className="mt-6 flex items-center">
              <p className="text-md font-medium flex-1">
                Estado de la transaccion:{' '}
              </p>
              <span
                className={`border px-1 ${
                  paymentResponse.lapTransactionState === 'APPROVED'
                    ? 'bg-green-300 text-gray-900'
                    : 'bg-red-500 text-slate-50'
                }  text-gray-800 rounded-md`}
              >
                {paymentResponse.lapTransactionState === 'APPROVED'
                  ? 'Aprobada'
                  : 'Reachazada'}
              </span>
            </div>
            <div className="mt-4 flex items-center">
              <p className="text-md font-medium flex-1">
                Referencia de la compra:{' '}
              </p>
              <span className="text-sm">{paymentResponse?.referenceCode}</span>
            </div>
            <div className="mt-4 flex items-center">
              <p className="text-md font-medium flex-1">
                Referencia del pago:{' '}
              </p>
              <span className="text-sm">{paymentResponse?.reference_pol}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-md font-medium">Fecha de envío:</p>
              <span className="text-md">Maximo 4 días habiles</span>
            </div>
          </div>
          <div className="mt-2 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">
                $
                {currencyFormat(
                  cart.items.reduce(
                    (accumulator: number, currentValue: ICartProduct) =>
                      accumulator + currentValue.price * currentValue.mount,
                    0
                  )
                )}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Envio</p>
              <p className="font-semibold text-gray-900">$12000</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              {currencyFormat(paymentResponse?.TX_VALUE)}
            </p>
          </div>

          <button
            className={`mt-4 mb-8 w-full rounded-md ${
              cart.items.length > 0 ? 'bg-sky-500' : 'bg-sky-700'
            }  px-6 py-3 font-medium text-white`}
            onClick={() => {
              handleClick();
            }}
          >
            {paymentResponse?.lapTransactionState === 'APPROVED' ? (
              !loading ? (
                'Finalizar Compra'
              ) : (
                <Spiner />
              )
            ) : (
              'Volver al inicio'
            )}
          </button>
        </div>
      </div>
    </>
  );
}

import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import ShoppingProducts from '../components/ShoppingProducts';
import SpinnerGestion from '../components/SpinnerGestion/SpinnerGestion';
import Toast from '../components/Toast';
import { useAppSelector } from '../redux/store/Hooks';
import { ICartProduct, IPropsModal } from '../vite-env';

function FormModal(props: IPropsModal): JSX.Element {
  const { isOpenModal, setIsOpenModal, children } = props;

  return (
    <Transition appear show={isOpenModal} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={() => setIsOpenModal(false)}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function Shopping(): JSX.Element {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [openToast, setOpenToast] = React.useState<boolean>(false);

  const { items } = useAppSelector((state) => state.cart);

  React.useEffect(() => {
    if (items.length === 0) setOpenToast(true);
  }, [items.length]);

  if (items.length === 0) {
    return (
      <>
        <SpinnerGestion />;
        <div
          className={`fixed  ${
            !openToast ? '-right-full' : 'right-8'
          } bottom-1 transition-all duration-150 ease-in-out z-50`}
        >
          {openToast && (
            <Toast
              openToast={setOpenToast}
              stateToast={openToast}
              error
              text="Servidor no disponible"
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <FormModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <ShoppingProducts items={items} />
      </FormModal>
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mt-10">
        <div className="relative flex bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr bg-sky-500 text-white shadow-sky-300 shadow-md  -mt-6 mb-8 p-6">
          <p className="text-base md:text-xl font-semibold">
            Compras realizadas
          </p>
        </div>
        <div className="p-6 overflow-x-auto px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Referencia de la compra
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Referencia del pago
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Subtotal
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Estado
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Total
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Productos
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <div className="flex items-center gap-4">
                    {/* <img
                          src={productTable.image}
                          alt="Producto1"
                          className="inline-block relative object-contain object-center w-20 h-16 rounded-md"
                        /> */}
                    <div>
                      <p className="block antialiased font-sans text-sm leading-normal text-gray-600 font-semibold">
                        {/* {productTable.name} */}
                      </p>
                      <p className="block w-5/6 antialiased font-sans text-xs font-normal text-justify text-blue-gray-500">
                        {/* {productTable.description} */}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-xs font-semibold text-gray-600">
                    {/* {productTable.slug} */}
                  </p>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50" />
                {/* <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div
                      className="relative inline-block align-baseline font-sans uppercase center whitespace-nowrap rounded-lg select-none bg-gradient-to-tr from-sky-500 to-sky-400 text-white py-0.5 px-2 text-[11px] font-medium"
                    >
                      <div className="flex flex-row flex-nowrap gap-3">
                        {product.sizes.length > 0 ? product.sizes.map((size) => (
                        <div className="mt-px" key={size + 1}>S</div>
                        )) :
                        <div className="mt-px">Bolso</div>
                        }
                      </div>
                    </div>
                  </td> */}
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <div className="block antialiased font-sans text-sm font-semibold text-blue-gray-600">
                    <div
                      className={`relative inline-block align-baseline font-sans uppercase center whitespace-nowrap rounded-lg select-none bg-gradient-to-tr ${
                        1
                          ? 'from-green-600 to-green-400'
                          : 'from-red-600 to-red-400'
                      }  text-white py-0.5 px-2 text-[11px] font-medium`}
                    >
                      <div className="mt-px">
                        {1 ? 'Enviado' : 'No enviado'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm font-semibold text-blue-gray-600">
                    {/* ${productTable.price} */}
                  </p>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <button
                    onClick={() => {
                      setIsOpenModal(true);
                      // setProduct(productTable);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-9 h-9 text-slate-400"
                    >
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <div
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
      </div> */}
      {/* <div className=" sm:float-right mt-3 py-2">
        <nav aria-label="flex justify-center">
          <ul className="flex list-style-none gap-2">
            <li className="page-item disabled">
              <button
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                onClick={() => {
                  navigate(
                    `/dashboard/gestion/products/${
                      page !== undefined ? +page - 1 : 1
                    }`
                  );
                }}
                disabled={!paginator.previous}
              >
                Previous
              </button>
            </li>
            {countProducts.map((count) => (
              <li key={count}>
                <button
                  className={`relative block py-1 px-3.5 border-0 ${
                    page !== undefined
                      ? +page === count
                        ? 'bg-sky-500 text-white'
                        : 'bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
                      : ''
                  } outline-none transition-all duration-300 rounded-full `}
                  onClick={() => {
                    navigate(`/dashboard/gestion/products/${count}`);
                  }}
                >
                  {count}
                </button>
              </li>
            ))}
            <li>
              <button
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                onClick={() => {
                  navigate(
                    `/dashboard/gestion/products/${
                      page !== undefined ? +page + 1 : 1
                    }`
                  );
                }}
                disabled={!paginator.next}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div> */}
    </>
  );
}

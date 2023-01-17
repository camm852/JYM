/* eslint-disable max-len */
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { product1 } from '../assets/assests';
import FormAddProduct from '../components/FormAddProduct';

interface PropsModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}

function FormModal(props: PropsModal): JSX.Element {
  const { isOpen, setIsOpen, children } = props;
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-20" onClose={() => setIsOpen(false)}>
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
              <Dialog.Panel className="w-full  md:w-4/5 transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent
                    you an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Got it, thanks!
                  </button>
                </div> */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default function Gestion() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <FormAddProduct />
      </FormModal>
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mt-10">
        <div className="relative flex bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr bg-sky-500 text-white shadow-sky-300 shadow-md  -mt-6 mb-8 p-6">
          <div className="flex-1">
            <p className="text-base md:text-xl font-semibold">
              Ropa Almacenada
            </p>
          </div>
          <div>
            <button className="flex flex-row flex-nowrap gap-2" onClick={() => setIsOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>
                Agregar
              </p>
            </button>
          </div>
        </div>
        <div className="p-6 overflow-x-auto px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Nombre</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Slug</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Estado</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Tallas</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Precio</p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400" />
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((id) => (
                <tr key={id}>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="flex items-center gap-4">
                      <img src={product1} alt="Producto1" className="inline-block relative object-cover object-center w-9 h-9 rounded-md" />
                      <div>
                        <p className="block antialiased font-sans text-sm leading-normal text-gray-600 font-semibold">Flamboyak Pink Top</p>
                        {/* <p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">john@creative-tim.com</p> */}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-xs font-semibold text-gray-600">Flank-top</p>
                    {/* <p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">Organization</p> */}
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div
                      className="relative inline-block align-baseline font-sans uppercase center whitespace-nowrap rounded-lg select-none bg-gradient-to-tr from-green-600 to-green-400 text-white py-0.5 px-2 text-[11px] font-medium"
                    >
                      <div className="mt-px">Disponible</div>
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div
                      className="relative inline-block align-baseline font-sans uppercase center whitespace-nowrap rounded-lg select-none bg-gradient-to-tr from-sky-500 to-sky-400 text-white py-0.5 px-2 text-[11px] font-medium"
                    >
                      <div className="flex flex-row flex-nowrap gap-3">
                        <div className="mt-px">S</div>
                        <div className="mt-px">M</div>
                        <div className="mt-px">L</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm font-semibold text-blue-gray-600">$50000</p>
                    {/* <p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">Organization</p> */}
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>

                    </button>
                  </td>
                </tr>
            ))}

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

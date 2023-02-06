/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider
// } from 'react-query';
import Swal from 'sweetalert2';
import FormAddProduct from '../components/FormProduct';
import Toast from '../components/Toast';
import apiUrl from '../utils/baseUrl';
import { IPropsModal, TProductTable } from '../vite-env';
import SpinnerGestion from '../components/SpinnerGestion/SpinnerGestion';

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

const initialState: TProductTable = {
  id: 0,
  name: '',
  slug: '',
  price: 0,
  gender: '',
  description: '',
  colors: [],
  sizes: [],
  categories: [],
  type: 'bag',
  image: '',
  state: true
};

export default function Gestion() {
  const [openToast, setOpenToast] = React.useState<boolean>(false);
  const [messageToast, setMessageToast] = React.useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });
  const [paginator, setPaginator] = React.useState<{
    previous: string | null;
    next: string | null;
  }>({
    previous: null,
    next: null
  });
  const [product, setProduct] = React.useState<TProductTable>(initialState);
  const [totalProducts, setTotalProducts] = React.useState<number>(0);
  const [countProducts, setCountProducts] = React.useState<number[]>([]);
  const [products, setProducts] = React.useState<Array<TProductTable>>([]);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const navigate = useNavigate();
  const { page } = useParams();

  // TODO implementar react-query
  // const queryClient = useQueryClient();

  React.useEffect(() => {
    if (totalProducts === 0) return;

    const count: number[] = [
      ...Array(Math.ceil(totalProducts / 10)).keys()
    ].map((x, i) => i + 1);

    setCountProducts(count);
  }, [totalProducts]);

  React.useEffect(() => {
    if (page === '0') navigate('/dashboard/gestion/products/1');
  }, []);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await apiUrl.get(
          `/productos/?page=${page === '0' ? '1' : page}`
        );
        const { count, previous, next, results } = response.data;
        if (response.status !== 200) throw Error(`${response.status}`);
        setProducts(results);
        setPaginator({
          previous,
          next
        });
        setTotalProducts(count);
      } catch (error: any) {
        if (error?.request?.status === 404) {
          setTimeout(() => {
            navigate('/dashboard/gestion/products/1');
            window.location.reload();
          }, 1000);
          return;
        }
        if (error?.request?.status === 0 || error?.request?.status === 0) {
          setMessageToast({
            error: true,
            message: 'Servidor no disponible'
          });
          setOpenToast(true);
        }
        if (error?.message === '204') {
          setMessageToast({
            error: true,
            message: 'No hay productos disponibles'
          });
          setOpenToast(true);
        }
      }
    };

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    getProducts();
  }, []);

  const stateProduct = (id: number, state: boolean) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'p-2 rounded-md text-white bg-sky-500',
        cancelButton: 'p-2 rounded-md text-white bg-red-500 m-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas segur@?',
        // text: 'Los cambios no se podran revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: state ? 'Si, desactivar' : 'Si, activar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await apiUrl.delete(`/producto/${id}/`);
            const newProducts = products.map((productTable) => {
              if (productTable.id === id) {
                if (state) productTable.state = false;
                else productTable.state = true;
                return productTable;
              }
              return productTable;
            });
            setProducts(newProducts);
            swalWithBootstrapButtons.fire(
              state ? 'Desactivado!' : 'Activado!',
              state
                ? 'El producto ha sido desactivado!'
                : 'El producto ha sido activado',
              'success'
            );
          } catch (error) {
            swalWithBootstrapButtons.fire(
              'Hubo un error',
              'El producto no se pudo eliminar',
              'error'
            );
          }
        }
      });
  };

  if (loading) {
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
              error={messageToast.error}
              text={messageToast.message}
            />
          )}
        </div>
      </>
    );
  }
  return (
    <>
      <FormModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <FormAddProduct
          setOpenToast={setOpenToast}
          setMessageToast={setMessageToast}
          product={product}
        />
      </FormModal>
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md mt-10">
        <div className="relative flex bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr bg-sky-500 text-white shadow-sky-300 shadow-md  -mt-6 mb-8 p-6">
          <div className="flex-1">
            <p className="text-base md:text-xl font-semibold">
              Productos Almacenados
            </p>
          </div>
          <div>
            <button
              className="flex flex-row flex-nowrap gap-2"
              onClick={() => {
                setIsOpenModal(true);
                setProduct(initialState);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Agregar</p>
            </button>
          </div>
        </div>
        <div className="p-6 overflow-x-auto px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Nombre
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Slug
                  </p>
                </th>

                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Precio
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                    Estado
                  </p>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400" />
                </th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((productTable: TProductTable) => (
                  <tr key={productTable.id}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex items-center gap-4">
                        <img
                          src={productTable.image}
                          alt="Producto1"
                          className="inline-block relative object-contain object-center w-20 h-16 rounded-md"
                        />
                        <div>
                          <p className="block antialiased font-sans text-sm leading-normal text-gray-600 font-semibold">
                            {productTable.name}
                          </p>
                          <p className="block w-5/6 antialiased font-sans text-xs font-normal text-justify text-blue-gray-500">
                            {productTable.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-xs font-semibold text-gray-600">
                        {productTable.slug}
                      </p>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm font-semibold text-blue-gray-600">
                        ${productTable.price}
                      </p>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <button
                        className={`relative inline-block align-baseline font-sans uppercase center whitespace-nowrap rounded-lg select-none bg-gradient-to-tr ${
                          productTable.state
                            ? 'from-green-600 to-green-400'
                            : 'from-red-600 to-red-400'
                        }  text-white py-0.5 px-2 text-[11px] font-medium`}
                        onClick={() =>
                          stateProduct(productTable.id, productTable.state)
                        }
                      >
                        <div className="mt-px">
                          {productTable.state ? 'Disponible' : 'No disponible'}
                        </div>
                      </button>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <div className="flex flex-nowrap gap-2">
                        <button
                          onClick={() => {
                            setIsOpenModal(true);
                            setProduct(productTable);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
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
      <div className=" sm:float-right mt-3 py-2">
        <nav className="flex justify-center">
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
                  window.location.reload();
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
                    window.location.reload();
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
                  window.location.reload();
                }}
                disabled={!paginator.next}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

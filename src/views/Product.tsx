/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  man,
  mastercard,
  medida,
  moda3,
  product1,
  visa,
  woman
} from '../assets/assests';
import { useAppDispatch } from '../redux/store/Hooks';
import { add } from '../redux/slices/CartSlice';
import { ICartProduct, TProductTable } from '../vite-env';
import Toast from '../components/Toast';
import Footer from '../components/Footer';
import apiUrl from '../utils/baseUrl';
import SpinnerGestion from '../components/SpinnerGestion/SpinnerGestion';

export default function Product(): JSX.Element {
  const [sizeSelected, setSizeSelected] = React.useState<string>('');
  const [colorSelected, setColorSelected] = React.useState<string>('');
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [openToast, setOpenToast] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<TProductTable>({
    name: '',
    slug: '',
    price: 0,
    gender: '',
    description: '',
    colors: [],
    sizes: [],
    categories: [],
    type: '',
    image: '',
    state: true,
    id: 0
  });
  const [messageToast, setMessageToast] = React.useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await apiUrl(`/producto/${id}/`);
        if (response.status !== 200) throw Error(`${response.status}`);
        setProduct(response.data);
      } catch (error: any) {
        if (error?.request?.status === 404) {
          setMessageToast({
            error: true,
            message: 'No existe el producto'
          });
          setOpenToast(true);
          return;
        }
        if (error?.request?.status === 0 || error?.request?.status === 500) {
          setMessageToast({
            error: true,
            message: 'Servidor no disponible'
          });
          setOpenToast(true);
        }
      }
    };
    getProduct();
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, [id, navigate]);

  const dispatch = useAppDispatch();

  const sizes = [
    {
      size: 'XS',
      active: false
    },
    {
      size: 'S',
      active: false
    },
    {
      size: 'M',
      active: false
    },
    {
      size: 'L',
      active: false
    },
    {
      size: 'XL',
      active: false
    },
    {
      size: 'XXL',
      active: false
    }
  ];

  const toCartProduct = () => {
    const { image, name, description, price, id: idProduct } = product;

    return {
      id: idProduct,
      image,
      name,
      description,
      price,
      color: colorSelected,
      size: sizeSelected,
      mount: 1
    };
  };

  // const product: ICartProduct = {
  //   image: product1,
  //   name: 'Cool Flufy Clothing without Stripes',
  //   description: 'aditional info',
  //   price: 35000,
  //   color: 'ROSA',
  //   size: 'L',
  //   mount: 1
  // };

  const handleAddProduct = () => {
    const error: { size: boolean; color: boolean } = {
      size: product.type === 'wear' ? !sizeSelected : false,
      color: !!(product.colors.length > 0 && !colorSelected)
    };

    if (Object.values(error).includes(true)) {
      setMessageToast({
        error: true,
        message: 'Debes elegir al menos un color y/o talla'
      });
    } else {
      setMessageToast({
        error: false,
        message: 'Item agregado correctamente'
      });
      dispatch(add(toCartProduct()));
    }
    setOpenToast(true);
  };

  if (product.id === 0) {
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
    <div
      className={`w-full absolute -left-full transition-all duration-500 ${
        loaded ? '-left-0' : ''
      }`}
    >
      <div className="flex flex-row flex-wrap lg:flex-nowrap gap-8 justify-center mt-10 h-full px-4 xl:pr-32 xl:pl-28">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt="producto"
            className="w-[450px] h-96 rounded-md"
          />
        </div>
        <div className="w-full lg:w-1/2 pb-5">
          <div>
            <h2 className="text-3xl font-semibold">{product.name}</h2>
          </div>
          <div className="mt-6">
            <p className="text-5xl font-normal">${product.price}</p>
          </div>
          {product.sizes.length > 0 && (
            <>
              <div className="mt-4">
                <p className="text-xl font-semibold">Seleccione la talla:</p>
              </div>
              <div className="flex gap-3 flex-row mt-2">
                {product.sizes.map((size, i) => (
                  <button
                    key={i}
                    className={`${
                      size !== 'XXL' ? 'w-9' : 'w-11'
                    } h-9 text-center  p-2 border-2 rounded-md ${
                      size === sizeSelected
                        ? 'border-blue-500 text-blue-500'
                        : 'border-gray-600'
                    } text-sm font-semibold text-center`}
                    onClick={() => setSizeSelected(size)}
                    style={{
                      WebkitTapHighlightColor: 'rgb(0,0,0,0)'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </>
          )}
          {product.colors.length > 0 && (
            <>
              <div className="mt-4">
                <p className="text-xl font-semibold">Seleccione un color:</p>
              </div>
              <div className="flex gap-3 flex-row mt-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`
                      h-9 text-center  p-2 border-2 rounded-md ${
                        color === colorSelected
                          ? 'border-blue-500 text-blue-500'
                          : 'border-gray-600'
                      } text-sm font-semibold text-center capitalize`}
                    onClick={() => setColorSelected(color)}
                    style={{
                      WebkitTapHighlightColor: 'rgb(0,0,0,0)'
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </>
          )}
          <div className="my-4">
            <p className="text-xl font-semibold mb-2">Descripción:</p>
            <p>{product.description}</p>
          </div>
          <div className="flex flex-row mt-3">
            <button
              className="group border border-l-0 w-1/2 p-2 hover:bg-blue-500 transition-all duration-200 ease-linear"
              style={{
                WebkitTapHighlightColor: 'rgb(0,0,0,0)'
              }}
            >
              <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                <span className="relative flex w-10 m-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-1 w-8 h-8 lg:mt-0 bg-transparent  group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>

                  <span className="absolute right-0  -top-1 lg:top-0 rounded-full bg-blue-500 w-4 h-4 p-0 m-0 text-white font-mono text-sm  leading-tight text-center scroll">
                    <p className="leading-4">+</p>
                  </span>
                </span>
              </li>
            </button>
            {/* agregar producto */}
            <button
              className="group border border-r-0 w-1/2 p-2 hover:bg-blue-500 transition-all duration-200 ease-linear"
              onClick={() => {
                handleAddProduct();
              }}
              style={{
                WebkitTapHighlightColor: 'rgb(0,0,0,0)'
              }}
            >
              <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                <span className="relative flex w-10 m-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex-1 w-8 h-8 lg:mt-0 bg-transparent group-hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  <span className="absolute right-0 -top-1  lg:top-0 rounded-full bg-blue-500 w-4 h-4  m-0 text-white font-mono text-sm  leading-tight text-center scroll ">
                    <p className="leading-4">+</p>
                  </span>
                </span>
              </li>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row flex-wrap mt-7 w-full bg-blue-50 py-9">
        {/*  Pagos */}
        <div className="flex flex-row justify-center gap-20 w-full lg:w-1/2 ">
          <div className="flex flex-col gap-6">
            <img src={mastercard} alt="" className="w-24" />
            <img src={visa} alt="" className="w-24" />
          </div>
          <div className="w-1/2">
            <div className="flex gap-2 flex-nowrap text-gray-600 items-center">
              <h4 className="block font-semibold text-3xl ">Medios de Pago</h4>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
              </p>
            </div>
            <p className="block mt-3 text-md text-gray-500 text-justify">
              Los medios de pago incluyen tarjetas de crédito y débito, puedes
              contactarte a nuestro whatsApp si deseas adquirir tu producto por
              otro medio de pago.
            </p>
          </div>
        </div>
        {/* Medidas */}
        <div className="flex flex-row justify-center gap-20 w-full lg:w-1/2 px-3 lg:px-0">
          <div className="flex flex-col gap-6">
            <img src={medida} alt="" className="w-24 h-32" />
          </div>
          <div className="w-1/2">
            <div className="flex gap-2 flex-nowrap text-gray-600 items-center">
              <h4 className="block font-semibold text-3xl ">Guía de medidas</h4>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              </p>
            </div>
            <p className="block mt-3 text-md text-gray-500 text-justify">
              Asegurate de elegir la talla correcta. Puedes consultar tu en los
              siguientes enlaces:
            </p>
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-7">
              <div className="mt-1">
                <a
                  href="https://www.zalando-prive.es/sizehelper/women/measure/"
                  target="_blank"
                  className="text-gray-500 hover:text-gray-700 transition-all duration-150 ease-linear"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-3">
                    <img src={woman} alt="" className="w-10" />
                    <p>Mujer</p>
                  </div>
                </a>
              </div>
              <a
                href="https://www2.hm.com/es_mx/customer-service/sizeguide/hombre.html"
                className="text-gray-500 hover:text-gray-700 transition-all duration-150 ease-linear"
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-3">
                  <img src={man} alt="" className="w-10" />
                  <p>Hombre</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed  ${
          !openToast ? '-right-full' : 'right-8'
        } bottom-1 transition-all duration-150 ease-in-out z-50`}
      >
        <Toast
          stateToast={openToast}
          openToast={setOpenToast}
          text={messageToast.message}
          error={messageToast.error}
        />
      </div>
      <Footer />
    </div>
  );
}

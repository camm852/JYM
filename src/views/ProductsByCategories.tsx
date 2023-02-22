import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardProduct from '../components/CardProduct';
import SpinnerGestion from '../components/SpinnerDiamond/SpinnerDiamond';
import Toast from '../components/Toast';
import apiUrl from '../utils/api';
import { TProductTable } from '../vite-env';

export default function ProductsByCategories(): JSX.Element {
  // products
  const [products, setProducts] = React.useState<TProductTable[]>([]);
  const [countProducts, setCountProducts] = React.useState<number[]>([]);
  const [totalProducts, setTotalProducts] = React.useState<number>(0);
  const [paginator, setPaginator] = React.useState<{
    previous: string | null;
    next: string | null;
  }>({
    previous: null,
    next: null
  });
  // toast
  const [openToast, setOpenToast] = React.useState<boolean>(false);
  const [messageToast, setMessageToast] = React.useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: ''
  });

  const [loading, setLoading] = React.useState<boolean>(true);
  const { page, category } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (page === '0') navigate(`/category/${category}/1`);
  }, [page, category, navigate]);

  React.useEffect(() => {
    if (totalProducts === 0) return;

    const count: number[] = [
      ...Array(Math.ceil(totalProducts / 10)).keys()
    ].map((x, i) => i + 1);

    setCountProducts(count);
  }, [totalProducts]);

  React.useEffect(() => {
    if (
      category !== 'casual' &&
      category !== 'elegant' &&
      category !== 'sport'
    ) {
      navigate('/');
    }
  }, [navigate, category]);

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await apiUrl(
          `/productos/categoria/${category}/?page=${page}`
        );
        if (response.status !== 200) throw Error(`${response.status}`);
        const { count, previous, next, results } = response.data;
        setTotalProducts(count);
        setProducts(results);
        setPaginator({
          previous,
          next
        });
      } catch (error: any) {
        if (error?.request?.status === 404) {
          setTimeout(() => {
            navigate(`/category/${category}/1`);
            window.location.reload();
          }, 1000);
          return;
        }
        if (error?.request?.status === 0 || error?.request?.status === 500) {
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
    getProduct();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [category, page, navigate]);

  if (loading) return <SpinnerGestion />;
  return (
    <>
      <h2 className="text-center my-14 text-xl font-bold uppercase w-full ">
        Productos{' '}
        {category === 'casual'
          ? 'Casuales'
          : category === 'sport'
          ? 'Deportivos'
          : 'Elegantes'}
      </h2>
      <div className="min-h-[70vh] mb-7">
        <div className="flex flex-wrap px-16 gap-16 justify-center">
          {products.map((product) => (
            <CardProduct product={product} key={product.id} />
          ))}
        </div>
        {products.length > 0 && (
          <nav className="mt-10 flex justify-center">
            <ul className="flex list-style-none gap-2">
              <li className="page-item disabled">
                <button
                  className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                  onClick={() => {
                    navigate(
                      `/category/${category}/?page=${
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
                      `/category/${category}/?page=${
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
        )}
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
    </>
  );
}

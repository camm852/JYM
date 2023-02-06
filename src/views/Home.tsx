import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Carousel from '../components/Carousel';
import {
  moda,
  moda2,
  moda3,
  product1,
  product2,
  product3,
  product4,
  product5
} from '../assets/assests';
import Information from '../components/Information';
import Footer from '../components/Footer';
import Spiner from '../components/Spinner/Spiner';
import MailChip from '../components/MailChip';
import CardProduct from '../components/CardProduct';
import apiUrl from '../utils/baseUrl';
import { TProductTable } from '../vite-env';

const CarouselProducts = React.lazy(
  () => import('../components/CarouselProducts')
);

interface IPropsModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}

function Modal(props: IPropsModal): JSX.Element {
  const { isOpen, setIsOpen, children } = props;

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={() => setIsOpen(false)}
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function Home() {
  const imagesCarouselInfo: Array<string> = [moda3, moda];
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [productsRecently, setProductsRecently] = React.useState<
    TProductTable[]
  >([]);

  const [randomProducts, setRandomProducts] = React.useState<TProductTable[]>(
    []
  );

  React.useEffect(() => {
    if (window.localStorage.getItem('mailchip')) return;
    setTimeout(() => {
      setOpenModal(true);
    }, 1000);
  }, []);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await apiUrl('/productos/recientes/');
        setProductsRecently(response.data.results);
        // if (response.status !== 200) throw Error(`${response.status}`);
      } catch (error: any) {
        console.log(error);
        // if (error?.request?.status === 404) {
        //   setTimeout(() => {
        //     navigate(`/type/${type}/1`);
        //     window.location.reload();
        //   }, 1000);
        //   return;
        // }
        // if (error?.request?.status === 0 || error?.request?.status === 500) {
        //   setMessageToast({
        //     error: true,
        //     message: 'Servidor no disponible'
        //   });
        //   setOpenToast(true);
        // }
        // if (error?.message === '204') {
        //   setMessageToast({
        //     error: true,
        //     message: 'No hay productos disponibles'
        //   });
        //   setOpenToast(true);
        // }
      }
    };
    getProducts();
  }, []);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await apiUrl('/productos/random/');
        setRandomProducts(response.data.results);
        // if (response.status !== 200) throw Error(`${response.status}`);
      } catch (error: any) {
        console.log(error);
        // if (error?.request?.status === 404) {
        //   setTimeout(() => {
        //     navigate(`/type/${type}/1`);
        //     window.location.reload();
        //   }, 1000);
        //   return;
        // }
        // if (error?.request?.status === 0 || error?.request?.status === 500) {
        //   setMessageToast({
        //     error: true,
        //     message: 'Servidor no disponible'
        //   });
        //   setOpenToast(true);
        // }
        // if (error?.message === '204') {
        //   setMessageToast({
        //     error: true,
        //     message: 'No hay productos disponibles'
        //   });
        //   setOpenToast(true);
        // }
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <Modal isOpen={openModal} setIsOpen={setOpenModal}>
        <MailChip closeModal={setOpenModal} />
      </Modal>
      <div className="-mt-1">
        <Carousel images={imagesCarouselInfo} autoPlay showButtons />
        <Information />
        <div className="mt-20 justify-center">
          <h2 className="mb-10 relative text-center text-2xl font-bold uppercase w-full">
            Agregados Recientemente
          </h2>
          <React.Suspense fallback={<Spiner />}>
            <CarouselProducts products={productsRecently} />
          </React.Suspense>
        </div>
        <div className="mt-16 justify-center">
          <h2 className="mb-6 relative text-center  text-2xl font-bold uppercase w-full">
            Los más vendidos
          </h2>
          <React.Suspense fallback={<Spiner />}>
            <div className="mb-16">
              <div className="hidden md:flex flex-row flex-wrap gap-10 p-5 justify-center">
                {/* {imagesCarouselProducts.map((image: string, i) => (
                  <CardProduct image={image} key={i} />
                ))} */}
                {randomProducts.length > 0 &&
                  randomProducts.map((product: TProductTable, i) => (
                    <CardProduct product={product} key={product.id} />
                  ))}
              </div>
              <div className="md:hidden">
                <CarouselProducts products={randomProducts} />
              </div>
            </div>
          </React.Suspense>
        </div>
        <Footer />
      </div>
    </>
  );
}

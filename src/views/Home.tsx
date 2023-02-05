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
  const imagesCarouselInfo: Array<string> = [moda, moda2, moda3];
  const imagesCarouselProducts: Array<string> = [
    product1,
    product2,
    product3,
    product4,
    product5
  ];
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (window.localStorage.getItem('mailchip')) return;
    setTimeout(() => {
      setOpenModal(true);
    }, 1000);
  }, []);

  return (
    <>
      <Modal isOpen={openModal} setIsOpen={setOpenModal}>
        <MailChip closeModal={setOpenModal} />
      </Modal>
      <div className="-mt-1">
        <Carousel images={imagesCarouselInfo} autoPlay showButtons />
        <Information />
        <div className="my-2 pt-7 min-h-screen justify-center mb-5">
          <h2 className="relative text-center mt-5 mb-16 text-2xl font-bold uppercase w-full">
            Agregados Recientemente
          </h2>
          <React.Suspense fallback={<Spiner />}>
            <CarouselProducts products={imagesCarouselProducts} />
          </React.Suspense>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

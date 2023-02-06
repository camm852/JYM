import { useNavigate } from 'react-router-dom';
import FacebookIcon from './IconsSocial/FacebookIcon';
import InstagramIcon from './IconsSocial/InstagramIcon';
import WhatsAppIcon from './IconsSocial/WhatsAppIcon';
import { LOGOBLANCO } from '../assets/assests';

export default function Footer(): JSX.Element {
  const navigate = useNavigate();

  const style = {
    anchor:
      'inline-block relative pl-7 text-lg mb-2 hover:text-white after:absolute after:content-[""] after:w-1 after:h-1 after:left-0  after:top-3  after:border after:border-red-500 after:rounded-full  after:transition-all after:duration-200 after:hover:w-2 after:hover:h-2 after:hover:top-2 after:hover:bg-red-500'
  };

  return (
    <footer className="min-h-screen bg-black opacity-90 py-10 text-zinc-500 text-sm w-full">
      <div className="w-full">
        <img src={LOGOBLANCO} alt="" className="w-40 m-auto" />
      </div>
      <div className="flex flex-wrap mt-3 px-16 py-16 border-b border-gray-800 justify-between">
        <div className="flex flex-col w-full lg:w-1/3 px-7 mb-8 lg:mb-0">
          <div>
            <h2 className="text-xl text-white uppercase font-bold">
              Sobre nosotros
            </h2>
          </div>
          <div className="mt-8">
            <p className="text-justify">
              Somos una tienda online dedicada a vender ropa y bolsos, con
              amplia gama de estilos y Colores. Estamos para satisfacerte y
              brindarte productos de la mejor calidad y al mejor precio, no
              dudes en comprar en ShopJym.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/3 px-7 lg:px-0 lg:pl-20 mb-8 md:mb-0">
          <div>
            <h2 className="text-xl text-white uppercase font-bold">
              Preguntas
            </h2>
          </div>
          <div className="mt-8">
            <ul className="list-none float-left mr-9">
              <li>
                <button
                  onClick={() => navigate('/dashboard/profile')}
                  className={style.anchor}
                >
                  Ir al perfil
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/checkout')}
                  className={style.anchor}
                >
                  Terminar la compra
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/dashboard/user-shopping')}
                  className={style.anchor}
                >
                  Mis compras
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col  md:w-1/3 px-7 lg:px-0 ">
          <div>
            <h2 className="text-xl text-white uppercase font-bold">
              Contactanos
            </h2>
          </div>
          <div className="mt-8">
            <div className="flex gap-6 items-center">
              <p className="text-xl text-red-500">U</p>
              <div>
                <p>Puedes contactarnos a tráves de cualquiera de</p>
                <p>nuestras redes sociales mencionadas a continuación.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col" />
      </div>
      <div className="flex flex-col pt-10">
        <div className="flex flex-wrap gap-10 justify-center">
          <a
            className="group flex items-center gap-2 "
            href="https://wa.me/3165334337"
            // style={{
            //   WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            // }}
          >
            <WhatsAppIcon className="w-7 h-7 text-white group-hover:text-green-400 fill-current transition-all duration-300" />
            <p className="uppercase font-semibold text-md group-hover:text-white transition-all duration-300">
              whatsapp
            </p>
          </a>
          <button
            className="group flex items-center gap-2 "
            style={{
              WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            }}
          >
            <FacebookIcon className="w-7 h-7 text-white group-hover:text-blue-600 fill-current transition-all duration-300" />
            <p className="uppercase font-semibold text-md group-hover:text-white transition-all duration-300">
              whatsapp
            </p>
          </button>
          <button
            className="group flex items-center gap-2 "
            style={{
              WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            }}
          >
            <InstagramIcon className="w-7 h-7 text-white group-hover:text-red-500 fill-current transition-all duration-300" />
            <p className="uppercase font-semibold text-md group-hover:text-white transition-all duration-300">
              whatsapp
            </p>
          </button>
        </div>
        <div className="text-center">
          <p className="text-white mt-14">
            Copyright ©2022 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

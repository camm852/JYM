import FacebookIcon from './IconsSocial/FacebookIcon';
import InstagramIcon from './IconsSocial/InstagramIcon';
import WhatsAppIcon from './IconsSocial/WhatsAppIcon';
import { LOGOBLANCO } from '../assets/assests';

export default function Footer(): JSX.Element {
  const style = {
    anchor:
      'inline-block relative pl-7 text-lg mb-2 hover:text-white after:absolute after:content-[""] after:w-1 after:h-1 after:left-0  after:top-3  after:border after:border-red-500 after:rounded-full  after:transition-all after:duration-200 after:hover:w-2 after:hover:h-2 after:hover:top-2 after:hover:bg-red-500'
  };

  return (
    <footer className="min-h-screen bg-black opacity-90 py-10 text-zinc-600 text-sm w-full">
      <div className="w-full">
        {/* <h2 className="text-center font-bold text-3xl text-white">SHOPJYM</h2>
         */}
        <img src={LOGOBLANCO} alt="" className="w-40 m-auto" />
      </div>
      <div className="flex flex-wrap mt-3 px-16 py-16 border-b border-gray-800 justify-between">
        <div className="flex flex-col w-full lg:w-1/3 px-7 mb-8 lg:mb-0">
          <div>
            <h2 className="text-xl text-white uppercase font-bold">Sobre nosotros</h2>
          </div>
          <div className="mt-8">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, rerum. Deserunt
              recusandae sapiente quibusdam aperiam numquam molestiae ab repellendus doloremque ea
              natus eum minima reiciendis tenetur, nam illum impedit illo!
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/3 px-7 lg:px-0 lg:pl-20 mb-8 md:mb-0">
          <div>
            <h2 className="text-xl text-white uppercase font-bold">Questions</h2>
          </div>
          <div className="mt-8">
            <ul className="list-none float-left mr-9">
              <li>
                <a href="" className={style.anchor}>
                  about
                </a>
              </li>
              <li>
                <a href="" className={style.anchor}>
                  about
                </a>
              </li>
              <li>
                <a href="" className={style.anchor}>
                  about
                </a>
              </li>
              <li>
                <a href="" className={style.anchor}>
                  about
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col  md:w-1/3 px-7 lg:px-0 ">
          <div>
            <h2 className="text-xl text-white uppercase font-bold">Contactanos</h2>
          </div>
          <div className="mt-8">
            <div className="flex gap-6 items-center">
              <p className="text-xl text-red-500">U</p>
              <p>Calle 15 Bogota</p>
            </div>
            <div className="flex gap-6 mt-2">
              <p className="text-xl text-red-500">U</p>

              <p>Calle 15 Bogota</p>
            </div>
            <div className="flex gap-6 mt-2">
              <p className="text-xl text-red-500">U</p>
              <p>Calle 15 Bogota</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col" />
      </div>
      <div className="flex flex-col pt-10">
        <div className="flex flex-wrap gap-10 justify-center">
          <button
            className="group flex items-center gap-2 "
            style={{
              WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            }}
          >
            <WhatsAppIcon className="w-8 h-8 text-white group-hover:text-green-400 fill-current transition-all duration-300" />
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
            <FacebookIcon className="w-8 h-8 text-white group-hover:text-blue-600 fill-current transition-all duration-300" />
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
            <InstagramIcon className="w-8 h-8 text-white group-hover:text-red-500 fill-current transition-all duration-300" />
            <p className="uppercase font-semibold text-md group-hover:text-white transition-all duration-300">
              whatsapp
            </p>
          </button>
        </div>
        <div className="text-center">
          <p className="text-white mt-14">Copyright ©2022 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

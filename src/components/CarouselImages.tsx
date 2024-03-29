import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IPropsCarousel } from '../vite-env';

export default function CarouselImages(props: IPropsCarousel) {
  const { images, showButtons, autoPlay } = props;

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [selectedImage, setSelectedImage] = React.useState<string>(images[0]);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const keyInformation = React.useId();

  const setNewImage = (next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next
        ? selectedIndex < images.length - 1
        : selectedIndex > 0;
      const nextIndex = next
        ? condition
          ? selectedIndex + 1
          : 0
        : condition
        ? selectedIndex - 1
        : images.length - 1;

      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  React.useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setNewImage();
      }, 5000);
      return () => clearInterval(interval);
    }
    return () => {};
  });

  const previousIndex = (): void => {
    setNewImage(false);
  };

  const nextIndex = (): void => {
    setNewImage();
  };

  const informationImages = [
    {
      inform: (
        <div
          className={`opacity-0  ${loaded ? 'opacity-100' : 'none'} `}
          key={keyInformation}
        >
          <h2
            className={`font-semibold text-white text-xl md:text-2xl  transition-all duration-[1.5s]
              ${loaded ? 'translate-y-0' : '-translate-y-10'}
            }`}
          >
            ¿Te gustan los bolsos?
          </h2>
          <h2
            className={`font-bold text-white text-xl md:text-4xl 2xl:w-full  mb-3 transition-all duration-[1.5s]
            ${loaded ? 'translate-x-0' : 'translate-x-10'}

          `}
          >
            Contamos con gran variedad de bolsos
          </h2>
          <p
            className={`w-2/3 2xl:w-full  text-justify md:leading-7 text-white  transition-all duration-[1.5s]
              ${loaded ? 'translate-y-0' : 'translate-y-10'}
            `}
          >
            ¡Lleve todo lo que necesita en estilo con nuestros bolsos de alta
            calidad! Confeccionados con materiales duraderos y diseños modernos,
            nuestros bolsos se adaptan a cualquier ocasión.
          </p>
          <div
            className={`flex gap-3 transtion-all duration-[1.8s]
          ${loaded ? 'translate-y-0' : 'translate-y-10'}
          `}
          >
            <button
              className="w-40 md:w-1/3 p-2 mt-4 md:mt-10 border rounded-lg text-white"
              style={{
                WebkitTapHighlightColor: 'rgb(0,0,0,0)'
              }}
              onClick={() => {
                navigate('/type/bag/1');
              }}
            >
              Revisar
            </button>
          </div>
        </div>
      )
    },
    {
      inform: (
        <div
          className={`opacity-0  ${loaded ? 'opacity-100' : 'none'} `}
          key={keyInformation}
        >
          <h2
            className={`font-semibold text-white text-xl md:text-2xl 2xl:w-full  transition-all duration-[1.5s]
              ${loaded ? 'translate-y-0' : '-translate-y-10'}
            }`}
          >
            ¿Te gusta la moda?
          </h2>
          <h2
            className={`font-bold text-white text-2xl md:text-4xl mb-3 transition-all duration-[1.5s]
            ${loaded ? 'translate-x-0' : 'translate-x-10'}

          `}
          >
            Estas en el lugar correcto
          </h2>
          <p
            className={`w-2/3 2xl:w-full text-justify md:leading-7 text-white  transition-all duration-[1.5s]
              ${loaded ? 'translate-y-0' : 'translate-y-10'}
            `}
          >
            Vista con confianza y estilo con la ropa de moda de nuestra
            colección. Ofrecemos prendas únicas y atemporales para que se sienta
            y luzca fabulosa en cualquier ocasión.
          </p>
          <div
            className={`flex gap-3 transtion-all duration-[1.8s]
          ${loaded ? 'translate-y-0' : 'translate-y-10'}
          `}
          >
            <button
              className="w-40 md:w-1/3 p-2 mt-4 md:mt-10 border rounded-lg text-white"
              style={{
                WebkitTapHighlightColor: 'rgb(0,0,0,0)'
              }}
              onClick={() => {
                navigate('/type/wear/1');
              }}
            >
              Revisar
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative bg-gray-200">
      {/*
      //**Image
      */}
      <img
        src={selectedImage}
        className={`w-full h-[90vh] object-cover opacity-0 transition-opacity  duration-1000 ${
          loaded ? 'opacity-100' : ''
        }`}
        alt=""
        onLoad={() => setLoaded(true)}
      />
      {/*
      //**Buttons
      */}
      {showButtons ? (
        <div className="absolute left-6 bottom-2  md:left-14 xl:bottom-8 xl:left-32 flex">
          <button
            onClick={() => previousIndex()}
            style={{
              WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5  md:w-8 md:h-8 text-gray-500 text-opacity-60"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {images.map((image, i) => (
            <div className="p-1 mx-1" key={image + i}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={`${selectedIndex === i ? '#818181' : '#dcdcdc44'}`}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 text-gray-500 text-opacity-20 ${
                  selectedIndex === i ? 'text-white text-opacity-100' : ''
                } `}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </div>
          ))}
          <button onClick={() => nextIndex()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5  md:w-8 md:h-8 text-gray-500 text-opacity-60"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      ) : null}
      <div className="absolute left-6  w-11/12 xl:w-3/5 2xl:w-1/5 top-3 lg:top-10 xl:top-14   md:left-14  xl:left-32 ">
        {Object.values(informationImages[selectedIndex])}
        {/* {informationImages.map((info) => console.log(info))} */}
      </div>
    </div>
  );
}

CarouselImages.defaultProps = {
  autoPlay: false,
  showButtons: false
};

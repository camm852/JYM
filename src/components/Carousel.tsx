import React from 'react';
import { PropsCarousel } from '../vite-env';

export default function Carousel(props: PropsCarousel) {
  const { images, showButtons, autoPlay } = props;

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [selectedImage, setSelectedImage] = React.useState<string>(images[0]);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const setNewImage = (next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
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
      }, 2500);
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
        <div className={`opacity-0  ${loaded ? 'opacity-100' : 'none'} `}>
          <h2
            className={`font-semibold text-white text-xl md:text-3xl X transition-all duration-[1.5s]
              ${loaded ? 'translate-y-0' : '-translate-y-10'}
            }`}
          >
            New Jacket
          </h2>
          <h2
            className={`font-bold text-white text-2xl md:text-6xl mb-3 transition-all duration-[1.5s]
            ${loaded ? 'translate-x-0' : 'translate-x-10'}

          `}
          >
            DENIM JACKET
          </h2>
          <p
            className={`text-justify md:leading-7 text-white  transition-all duration-[1.5s]
              ${loaded ? 'translate-y-0' : 'translate-y-10'}
            `}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, aspe riores? Veniam
            quos doloribus ad minima maxime, iure in quidem voluptates aspernatur laborum
            voluptatem, debitis, quo cum magnam vel at culpa!
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
            >
              View
            </button>
          </div>
        </div>
      )
    },
    {
      inform: (
        <div className={`opacity-0  ${loaded ? 'opacity-100' : 'none'} `}>
          <h2
            className={`font-semibold text-white text-xl md:text-3xl X transition-all 
            ${loaded ? 'translate-y-0' : '-translate-y-10'}
          }`}
            style={{ transition: '1.5s' }}
          >
            New Jacket
          </h2>
          <h2
            className={`font-bold text-white text-2xl md:text-6xl mb-3 transition-all
          ${loaded ? 'translate-x-0' : 'translate-x-10'}

        `}
            style={{ transition: '1.5s' }}
          >
            DENIM JACKET
          </h2>
          <p
            className={`text-justify md:leading-7 text-white  transition-all
            ${loaded ? 'translate-y-0' : 'translate-y-10'}
          `}
            style={{ transition: '1.5s' }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, aspe riores? Veniam
            quos doloribus ad minima maxime, iure in quidem voluptates aspernatur laborum
            voluptatem, debitis, quo cum magnam vel at culpa!
          </p>
          <div
            className={`flex gap-3 transtion-all
        ${loaded ? 'translate-y-0' : 'translate-y-10'}
        `}
            style={{ transition: '1.8s' }}
          >
            <button
              className="w-40 md:w-1/3 p-2 mt-4 md:mt-10 border rounded-lg text-white"
              style={{
                WebkitTapHighlightColor: 'rgb(0,0,0,0)'
              }}
            >
              View
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
        className={`w-full h-[85vh] object-cover opacity-0 transition-opacity  duration-1000 ${
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          {images.map((image, i) => (
            <div className="p-1 mx-1" key={image}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={`${selectedIndex === i ? '#818181' : '#dcdcdc44'}`}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 text-gray-500 text-opacity-20 ${
                  selectedIndex === i ? 'text-white text-opacity-100' : ''
                } `}
                key={image}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      ) : null}
      <div className="absolute left-6  w-2/3 xl:w-2/5 2xl:w-1/5 top-3 lg:top-10 xl:top-14   md:left-14  xl:left-32 ">
        {Object.values(informationImages[0])}
      </div>
    </div>
  );
}

Carousel.defaultProps = {
  autoPlay: false,
  showButtons: false
};

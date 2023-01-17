import React from 'react';
import Footer from '../components/Footer';
import FormLoginSignUp from '../components/FormAuth/FormLorginSignUp';

export default function Login(): JSX.Element {
  const [loadedImage, setLoadedImage] = React.useState<boolean>(false);

  return (
    <div
      className={`absolute w-full -left-full transition-all duration-500 overflow-hidden ${
        loadedImage ? '-left-0' : ''
      }`}
    >
      <FormLoginSignUp isLogin setLoadedImage={setLoadedImage} />
      <Footer />
    </div>
  );
}

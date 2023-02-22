import React from 'react';
import FormLoginSignUp from '../components/FormAuth/FormLorginSignUp';

export default function Login(): JSX.Element {
  const [loadedImage, setLoadedImage] = React.useState<boolean>(false);
  const [loadComponent, setLoadComponent] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setLoadComponent(true);
    }, 600);
  }, []);

  return (
    <div
      className={`block  transition-all delay-200 duration-700 overflow-hidden ${
        loadedImage ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <FormLoginSignUp isLogin setLoadedImage={setLoadedImage} />
    </div>
  );
}

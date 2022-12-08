import React from 'react';
import FormLoginSignUp from '../components/FormAuth/FormLorginSignUp';

export default function Login(): JSX.Element {
  // const handleChangeE = (e: React.SyntheticEvent<EventTarget>) => {
  //   console.log(e);
  // };
  // const [loadedPage, setLoadedPage] = React.useState<boolean>(false);
  const [loadedImage, setLoadedImage] = React.useState<boolean>(false);

  // React.useEffect(() => setLoadedPage(true), []);

  return (
    <div
      className={`absolute w-full -left-full transition-all duration-500 overflow-hidden ${
        loadedImage ? '-left-1' : ''
      }`}
    >
      <FormLoginSignUp isLogin setLoadedImage={setLoadedImage} />
    </div>
  );
}

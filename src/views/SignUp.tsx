import React from 'react';
import FormLoginSignUp from '../components/FormAuth/FormLorginSignUp';

export default function SignUp(): JSX.Element {
  // const handleChangeE = (e: React.SyntheticEvent<EventTarget>) => {
  //   console.log(e);
  // };
  // const [loadedPage, setLoadedPage] = React.useState<boolean>(false);
  const [loadedImage, setLoadedImage] = React.useState<boolean>(false);

  // React.useEffect(() => setLoadedPage(true), []);

  return (
    <div
      className={`block  transition-all delay-200 duration-700 overflow-hidden ${
        loadedImage ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <FormLoginSignUp isLogin={false} setLoadedImage={setLoadedImage} />
    </div>
  );
}

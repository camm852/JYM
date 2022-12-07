import React from 'react';
import FormLoginSignUp from '../components/FormAuth/FormLorginSignUp';

export default function Login(): JSX.Element {
  // const handleChangeE = (e: React.SyntheticEvent<EventTarget>) => {
  //   console.log(e);
  // };
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => setLoaded(true), []);

  return (
    <div
      className={`absolute w-full -left-full transition-all duration-500 overflow-hidden ${
        loaded ? '-left-1' : ''
      }`}
    >
      <FormLoginSignUp isLogin />
    </div>
  );
}

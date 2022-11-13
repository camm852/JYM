import React from 'react';
import FormLoginSignUp from '../components/FormLorginSignUp';

export default function Login() {
  // const handleChangeE = (e: React.SyntheticEvent<EventTarget>) => {
  //   console.log(e);
  // };
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => setLoaded(true), []);

  return (
    <div
      className={`opacity-0 transition-all duration-1000 ${loaded ? 'opacity-100' : ''}`}
      style={{ transition: '1.6s' }}
    >
      <FormLoginSignUp isLogin />
    </div>
  );
}

import React from 'react';
import FormLoginSingUp from '../components/FormAuth/FormLorginSignUp';

export default function SignUp(): JSX.Element {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => setLoaded(true), []);

  return (
    <div
      className={`absolute w-full -left-full transition-all duration-500 ${loaded ? 'left-1' : ''}`}
    >
      <FormLoginSingUp isLogin={false} />
    </div>
  );
}

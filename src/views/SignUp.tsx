import React from 'react';
import FormLoginSingUp from '../components/FormAuth/FormLorginSignUp';

export default function SignUp(): JSX.Element {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => setLoaded(true), []);

  return (
    <div
      className={`opacity-0 transition-all duration-1000 ${loaded ? 'opacity-100' : ''}`}
      style={{ transition: '1.6s' }}
    >
      <FormLoginSingUp isLogin={false} />
    </div>
  );
}

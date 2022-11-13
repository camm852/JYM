import React from 'react';
import FormLoginSingUp from '../components/FormLorginSignUp';

export default function SignUp() {
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

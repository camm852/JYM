import React from 'react';

export default function PaymentResponse(): JSX.Element {
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of urlParams.entries()) {
      console.log(`${key}, ${value}`);
    }
  }, []);

  return <div>ResponsePayment</div>;
}

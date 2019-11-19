import Checkout from '../src/containers/Checkout/Checkout';
import { authInitialProps } from '../src/lib/auth';

const Check = () => {
  return (
    <>
      <Checkout />
    </>
  );
};

Check.getInitialProps = authInitialProps(true, '/login');

export default Check;

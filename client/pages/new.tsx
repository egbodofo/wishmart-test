import { authInitialProps } from '../src/lib/auth';
import Add from '../src/containers/NewProduct/NewProduct';

const NewProduct = () => {
  return <Add />;
};

NewProduct.getInitialProps = authInitialProps(true, '/login');

export default NewProduct;

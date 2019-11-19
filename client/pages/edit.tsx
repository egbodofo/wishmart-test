import Edit from '../src/components/Products/Edit/Edit';

const EditProduct = ({ id }) => {
  return <Edit id={id} />;
};

EditProduct.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default EditProduct;

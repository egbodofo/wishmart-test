import React, { useState, FormEvent, SyntheticEvent } from 'react';
import { newProduct } from '../../store/actions/newProduct';
import Router from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

export const Add = (props: {
  newProduct: (arg0: {
    name: string;
    brand: string;
    price: string;
    image: string;
    description: string;
  }) => void;
}) => {
  const [name, setName] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleNameChange = (event: FormEvent<HTMLInputElement>) =>
    setName(event.currentTarget.value);

  const handleBrandChange = (event: FormEvent<HTMLInputElement>) =>
    setBrand(event.currentTarget.value);

  const handlePriceChange = (event: FormEvent<HTMLInputElement>) =>
    setPrice(event.currentTarget.value);

  const handleImageChange = (event: FormEvent<HTMLInputElement>) =>
    setImage(event.currentTarget.value);

  const handleDescriptionChange = (event: FormEvent<HTMLInputElement>) =>
    setDescription(event.currentTarget.value);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      name,
      brand,
      price,
      image,
      description,
    };

    try {
      await props.newProduct(data);
      Router.push('/products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MDBContainer className="px-5">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol className="card mt-3" sm="12" md="8" lg="6">
            <form onSubmit={handleSubmit}>
              <p className="h5 text-center mt-4 mb-4">Add New Product</p>
              <div className="grey-text">
                <MDBInput
                  required
                  label="Name"
                  icon="user"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleNameChange}
                />
                <MDBInput
                  required
                  label="Brand"
                  icon="clone"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleBrandChange}
                />
                <MDBInput
                  required
                  label="Price"
                  icon="coins"
                  group
                  type="number"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handlePriceChange}
                />
                <MDBInput
                  required
                  label="image"
                  icon="image"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleImageChange}
                />
                <MDBInput
                  required
                  label="description"
                  icon="info"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleDescriptionChange}
                />
              </div>
              <div className="text-center">
                <MDBBtn className="mb-3" color="cyan" type="submit">
                  Submit
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

Add.propTypes = {
  newProduct: PropTypes.func.isRequired,
};

export default connect(
  null,
  { newProduct }
)(Add);

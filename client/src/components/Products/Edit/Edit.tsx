import React, { useState, useEffect, FormEvent, SyntheticEvent } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import Router from 'next/router';
import { Showprops } from '../../../lib/intes-types';
import cookie from 'js-cookie';

export const Edit = ({ id }: Showprops) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setName(response.data.name);
        setBrand(response.data.brand);
        setPrice(response.data.price);
        setImage(response.data.image);
        setDescription(response.data.description);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const obj = {
      name: name,
      brand: brand,
      price: price,
      image: image,
      description: description,
    };
    const token = cookie.get('jwtToken');
    await axios.patch(`/api/products/${id}`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Router.push(`/product/${id}`);
  };

  return (
    <>
      <MDBContainer className="px-5">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol className="card mt-5" xl="6">
            <form onSubmit={handleSubmit}>
              <p className="h5 text-center mt-4 mb-4">Edit Product</p>
              <div className="grey-text">
                <MDBInput
                  required
                  label="Name"
                  value={name}
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
                  value={brand}
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
                  value={price}
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
                  value={image}
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
                  value={description}
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

export default Edit;

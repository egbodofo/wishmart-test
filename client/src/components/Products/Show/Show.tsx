import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBContainer } from 'mdbreact';
import Table from './Table/Table';
import { useRouter } from 'next/router';
import Navigation from '../../Navigation/Navigation';
import Footer from '../../Footer/Footer';
import cookie from 'js-cookie';
import { IProduct, IUser } from '../../../lib/intes-types';

const Products = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const authUser = cookie.get('user');

    if (authUser) {
      setUser(JSON.parse(authUser));
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const tabRow = () => {
    return (
      product && (
        <Table obj={product} userId={user ? user._id : ''} key={product._id} />
      )
    );
  };

  return (
    <>
      <MDBContainer className="mt-3 text-center">{tabRow()}</MDBContainer>
    </>
  );
};

export default Products;

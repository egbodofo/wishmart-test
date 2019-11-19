import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Body from './Body/Body';
import Link from 'next/link';
import cookie from 'js-cookie';
import {
  MDBJumbotron,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from 'mdbreact';

const Products = () => {
  const [product, setProduct] = useState<[]>([]);
  const user = cookie.get('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products');
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const tabRow = () => {
    return (
      product &&
      product.map(function(object, i) {
        return <Body obj={object} key={i} />;
      })
    );
  };

  const userLinks = (
    <p className="lead">
      <MDBBtn outline color="primary" className="mb-5">
        <MDBIcon icon="clone" className="mr-2"></MDBIcon>{' '}
        <Link href="/new">
          <a>Add New Product</a>
        </Link>
      </MDBBtn>
    </p>
  );

  const guestLinks = <div></div>;

  return (
    <>
      <MDBContainer className="mt-3 text-center mb-5">
        <MDBRow>
          <MDBCol>
            <MDBJumbotron className="px-2 mt-2">
              <h3 className="h3 display-3">Wismart products</h3>
              <hr className="my-2" />
              {user ? userLinks : guestLinks}
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>

        <MDBRow>{tabRow()}</MDBRow>
      </MDBContainer>
    </>
  );
};

export default Products;

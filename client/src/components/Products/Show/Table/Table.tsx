import React from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import styled from 'styled-components';
import cookie from 'js-cookie';

const Img = styled.img`
  max-width: 280px;
  max-height: auto;
  min-width: 220px;
  min-height: 220px
  border-radius: 3%;
  -webkit-box-shadow: 0px 3px 38px -8px rgba(3, 23, 247, 0.88);
  -moz-box-shadow: 0px 3px 38px -8px rgba(3, 23, 247, 0.88);
  box-shadow: 0px 3px 38px -8px rgba(3, 23, 247, 0.88);
`;

interface ProductTable {
  obj: {
    _id: string;
    name: string;
    image: string;
    price: number;
    brand: string;
    description: string;
    owner: string;
  };
  userId: string;
}

const Table = (props: ProductTable) => {
  const router = useRouter();
  const { id } = router.query;

  const deleted = () => {
    const token = cookie.get('jwtToken');

    axios
      .delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        Router.push('/products');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <MDBContainer className="mt-5 text-center">
        <MDBRow>
          <MDBCol className="md-6 pt-3">
            <Img src={props.obj.image} />
          </MDBCol>

          <MDBCol className="md-6">
            <div className="pt-3">
              <h3>
                Name:<strong> {props.obj.name}</strong>
              </h3>
              <hr />

              <h4>Brand: {props.obj.brand}</h4>
              <hr />

              <h5>
                Price: ₦
                {props.obj.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </h5>

              <hr />

              <p>{props.obj.description}</p>
              <hr />

              {props.userId === props.obj.owner && (
                <div className="d-flex justify-content-center">
                  <Link
                    href={`/edit?id=${props.obj._id}`}
                    as={`/edit?id=${props.obj._id}`}
                  >
                    <a className="btn btn-primary">Edit</a>
                  </Link>
                  <MDBBtn color="danger" onClick={deleted}>
                    Delete
                  </MDBBtn>
                </div>
              )}
            </div>
            <Link href="/products">
              <a className="btn btn-success">Back to Products</a>
            </Link>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Table;

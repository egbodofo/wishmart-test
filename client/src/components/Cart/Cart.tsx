import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import {
  removeItem,
  addQuantity,
  subtractQuantity,
} from '../../store/actions/cart';
import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
} from 'mdbreact';
import { IntProps } from '../Products/Body/Body';

const ImgCart = styled.img`
  max-height: 150px;
  min-width: 50px;
`;

const ProductTable = styled(MDBTable)`
  td {
    vertical-align: middle;
    &:nth-child(6) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
`;

const Cart = (props: IntProps) => {
  const handleRemove = (product: {}) => {
    props.removeItem(product);
  };
  //to add the quantity
  const handleAddQuantity = (product: {}) => {
    props.addQuantity(product);
  };
  //to substruct from the quantity
  const handleSubtractQuantity = (product: {}) => {
    props.subtractQuantity(product);
  };

  const cart = props.cart;

  const [column] = useState([
    {
      label: '',
      field: 'img',
    },
    {
      label: 'PRD',
      field: 'product',
    },
    {
      label: 'UP',
      field: 'price',
    },
    {
      label: 'QTY',
      field: 'qty',
    },
    {
      label: 'AMT',
      field: 'amount',
    },
    {
      label: '',
      field: 'button',
    },
  ]);

  const rows:
    | {
        [rest: string]: any;
        clickEvent?: (() => void) | undefined;
        colspan?: number | undefined;
      }[]
    | {
        img: JSX.Element;
        product: JSX.Element[];
        price: string;
        qty: string;
        amount: JSX.Element;
        button: JSX.Element;
      }[]
    | undefined = [];
  cart.addedItems.map(
    (item: {
      image: string | undefined;
      name: React.ReactNode;
      price: number;
      quantity: number;
      _id: {};
    }) => {
      return rows.push({
        img: (
          <ImgCart src={item.image} alt="" className="img-fluid z-depth-0" />
        ),

        product: [
          <h5 className="mt-3">
            <strong>{item.name}</strong>
          </h5>,
        ],
        price: `₦${item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`,
        qty: `${item.quantity}`,
        amount: (
          <strong>
            ₦
            {(item.quantity * item.price)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </strong>
        ),

        button: (
          <>
            <MDBBtn
              title="Increase quantity"
              color="success"
              size="sm"
              onClick={() => {
                handleAddQuantity(item._id);
              }}
            >
              <i className="fas fa-plus-circle"></i>
            </MDBBtn>
            <MDBBtn
              title="Decrease quantity"
              color="info"
              size="sm"
              disbaled={item.quantity === 1}
              onClick={() => {
                handleSubtractQuantity(item._id);
              }}
            >
              <i className="fas fa-minus-circle"></i>
            </MDBBtn>
            <MDBBtn
              title="Remove item"
              color="danger"
              size="sm"
              onClick={() => {
                handleRemove(item._id);
              }}
            >
              <i className="fas fa-trash"></i>
            </MDBBtn>
          </>
        ),
      });
    }
  );

  return cart.addedItems.length > 0 ? (
    <MDBRow className="my-2 px-1" center>
      <MDBCard className="w-100">
        <MDBCardBody>
          <ProductTable className="product-table" responsive>
            <MDBTableHead
              className="font-weight-bold"
              color="mdb-color lighten-5"
              columns={column}
            />
            <MDBTableBody rows={rows} />
          </ProductTable>
        </MDBCardBody>
      </MDBCard>
      <div className="mt-3 text-center">
        <div>
          <MDBBtn color="danger">
            <h5>
              Total: ₦
              {cart.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </h5>
          </MDBBtn>
        </div>
        <Link href={`/products`}>
          <a className="btn btn-success">Buy more products</a>
        </Link>
        <Link href={`/checkout`}>
          <a className="btn btn-info">Checkout</a>
        </Link>
      </div>
    </MDBRow>
  ) : (
    <h3 className="text-center my-5">
      <strong>Your cart is empty!!!</strong>
    </h3>
  );
};

const mapStateToProps = (state: { cart: {} }) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch: {
  (arg0: { type: string; id: string }): void;
  (arg0: { type: string; id: string }): void;
  (arg0: { type: string; id: string }): void;
}) => {
  return {
    removeItem: (product: string) => {
      dispatch(removeItem(product));
    },
    addQuantity: (product: string) => {
      dispatch(addQuantity(product));
    },
    subtractQuantity: (product: string) => {
      dispatch(subtractQuantity(product));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

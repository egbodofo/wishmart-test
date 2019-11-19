import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../../store/actions/cart';
import Link from 'next/link';
import {
  MDBBtn,
  MDBCol,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from 'mdbreact';

type InPro = {
  _id: string;
  name: string;
  image: string;
  price: number;
  brand: string;
  description: string;
};

export interface IntProps {
  [x: string]: any;
  obj: InPro;
}

const Body = (props: IntProps) => {
  const handleClick = (product: InPro) => {
    props.addToCart(product);
    alert('Item added to cart!');
  };

  return (
    <MDBCol className="col-lg-3 col-md-6 pb-1">
      <MDBCard className="mb-lg-0 mb-4 pb-2" style={{ maxHeight: '34rem' }}>
        <MDBCardImage cascade top alt="" src={props.obj.image} waves />
        <hr />
        <MDBCardBody cascade className="text-center">
          <MDBCardTitle>
            <p>
              <strong>{props.obj.name}</strong>
            </p>
          </MDBCardTitle>
          <Link
            href={`/product?id=${props.obj._id}`}
            as={`/product/${props.obj._id}`}
          >
            <a className="btn btn-primary">More info</a>
          </Link>
          <hr />
          <MDBCol className="pt-2">
            <span className="float-left">
              Price: ₦
              {props.obj.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </span>

            <span className="float-right">
              <MDBBtn
                tag="a"
                onClick={() => {
                  handleClick(props.obj);
                }}
                size="lg"
                className="p-1 m-0 mr-2 z-depth-0"
              >
                <MDBIcon icon="shopping-cart" title="Add to cart" />
              </MDBBtn>
            </span>
          </MDBCol>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

const mapDispatchToProps = (
  dispatch: (arg0: { type: string; data: {} }) => void
) => {
  return {
    addToCart: (product: {}) => {
      dispatch(addToCart(product));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Body);

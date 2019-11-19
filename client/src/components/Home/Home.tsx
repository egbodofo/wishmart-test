import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableImg from './Table';
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBRow,
} from 'mdbreact';

const Home = () => {
  const [product, setProduct] = useState<[]>([]);

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
      product.slice(-4).map(function(object, i) {
        return <TableImg obj={object} key={i} />;
      })
    );
  };

  return (
    <>
      <MDBContainer className="d-flex justify-content-center mb-3">
        <MDBCarousel
          activeItem={1}
          length={4}
          showControls={true}
          showIndicators={true}
          className="z-depth-1 w-100 mt-3"
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="First slide"
                />
                <MDBMask overlay="black-light" />
              </MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Nike Sneakers</h3>
                <p>Wishmart product 1</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1564507791227-bd8332f2566b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="Second slide"
                />
                <MDBMask overlay="black-strong" />
              </MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Infinix x12</h3>
                <p>Wishmart product 2</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1542834759-4db91f2574d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="Third slide"
                />
                <MDBMask overlay="black-slight" />
              </MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Timbolo</h3>
                <p>Wishmart product 3</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="4">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1566876402521-d67fec6fba48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="Third slide"
                />
                <MDBMask overlay="black-slight" />
              </MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Converse</h3>
                <p>Wishmart product 4</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>

      <MDBContainer className="mt-5 text-center">
        <h3>Latest Products</h3>
        <MDBRow className="mt-2">{tabRow()}</MDBRow>
      </MDBContainer>
    </>
  );
};

export default Home;

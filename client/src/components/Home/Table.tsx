import React from 'react';
import { MDBCol } from 'mdbreact';
import styled from 'styled-components';

interface IntProps {
  obj: {
    image: string;
  };
}

const ImgTable = styled.img`
  height: 240px;
  width: 100% !important;
  object-fit: cover !important;
  border-radius: 3%;
  -webkit-box-shadow: 0px 3px 38px -8px rgba(3, 23, 247, 0.88);
  -moz-box-shadow: 0px 3px 38px -8px rgba(3, 23, 247, 0.88);
  box-shadow: 0px 3px 38px -8px rgba(3, 23, 247, 0.88);
`;

const TabImg = (props: IntProps) => {
  return (
    <MDBCol className="mt-3" sm="6" md="3">
      <ImgTable src={props.obj.image} alt="" />
    </MDBCol>
  );
};

export default TabImg;

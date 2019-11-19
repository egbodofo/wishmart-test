import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';
import styled from 'styled-components';

const Footer = () => {
  return (
    <MDBFooter className="font-small mt-3" id="MyFoot">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          {/* <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a> */}
          <p className="text-monospace">
            {' '}
            Wishmart Designed by Oluwafemi Egbodofo with Stutord
          </p>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;

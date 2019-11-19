import React, { useState, FormEvent, SyntheticEvent } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { login } from '../../store/actions/login';
import { connect } from 'react-redux';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import cookie from 'js-cookie';

export const Login = (props: {
  login: (arg0: { email: string; password: string }) => void;
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (event: FormEvent<HTMLInputElement>) =>
    setEmail(event.currentTarget.value);
  const handlePasswordChange = (event: FormEvent<HTMLInputElement>) =>
    setPassword(event.currentTarget.value);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      await props.login(data);
      Router.push('/products');
    } catch (error) {
      console.log(error);
    }
  };

  if (cookie.get('jwtToken')) {
    Router.push('/products');
  }

  return (
    <>
      <MDBContainer className="px-5">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol className="card mt-3" sm="12" md="8" lg="6">
            <form onSubmit={handleSubmit}>
              <p className="h5 text-center mt-4 mb-4">Login</p>
              <div className="grey-text">
                <MDBInput
                  required
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  onChange={handleEmailChange}
                />
                <MDBInput
                  required
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  onChange={handlePasswordChange}
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(
  null,
  { login }
)(Login);

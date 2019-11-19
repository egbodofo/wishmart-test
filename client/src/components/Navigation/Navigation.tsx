import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Link from 'next/link';
import cookie from 'js-cookie';
import Router from 'next/router';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';

export const Navigation = () => {
  const logout = () => {
    cookie.remove('jwtToken');
    cookie.remove('user');
    Router.push('/products');
  };

  const user = cookie.get('user');

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const userLinks = (
    <MDBNavbarNav right>
      <MDBNavItem active>
        <Link href="/">
          <a className="nav-link">Home</a>
        </Link>
      </MDBNavItem>
      <MDBNavItem>
        <Link href="/products">
          <a className="nav-link">Products</a>
        </Link>
      </MDBNavItem>
      <MDBNavItem>
        <a href="/" onClick={logout} className="nav-link">
          Logout
        </a>
      </MDBNavItem>
      <MDBNavItem>
        <Link href="/cart">
          <a className="nav-link">Cart</a>
        </Link>
      </MDBNavItem>
      <MDBNavItem>
        <MDBDropdown>
          <MDBDropdownToggle nav caret>
            <span className="mr-2">Profile</span>
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem href="#!">Orders</MDBDropdownItem>
            <MDBDropdownItem href="#!">Account</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavItem>
    </MDBNavbarNav>
  );

  const guestLinks = (
    <MDBNavbarNav right>
      <MDBNavItem active>
        <Link href="/">
          <a className="nav-link">Home</a>
        </Link>
      </MDBNavItem>
      <MDBNavItem>
        <Link href="/products">
          <a className="nav-link">Products</a>
        </Link>
      </MDBNavItem>
      <MDBNavItem>
        <Link href="/login">
          <a className="nav-link">Login</a>
        </Link>
      </MDBNavItem>
      <MDBNavItem>
        <Link href="/register">
          <a className="nav-link">Sign Up</a>
        </Link>
      </MDBNavItem>
      <MDBNavItem>
        <Link href="/cart">
          <a className="nav-link">Cart</a>
        </Link>
      </MDBNavItem>
    </MDBNavbarNav>
  );

  return (
    <MDBNavbar color="indigo" dark expand="md">
      <MDBNavbarBrand>
        <Link href="/">
          <strong className="white-text">Wishmart</strong>
        </Link>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        {user ? userLinks : guestLinks}
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default Navigation;

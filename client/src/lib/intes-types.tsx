import React from 'react';

export interface IUser {
  _id: string;
  username: string;
  password: string;
}

export interface ObjProTable {
  obj: IProduct;
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  brand: string;
  description: string;
  owner: string;
}

export type Showprops = {
  id: string;
};

export interface NewProductProps {
  isAuthenticated: boolean;
}

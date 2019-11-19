import axios from 'axios';
import setAuthorizationToken from '../../utils/setAuthorization';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';
import cookie from 'js-cookie';

export function setCurrentUser(user: string | { [key: string]: any } | null) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function logout() {
  return (
    dispatch: (arg0: {
      type: string;
      user: string | { [key: string]: any } | null;
    }) => void
  ) => {
    cookie.remove('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function login(data: any) {
  return async (
    dispatch: (arg0: {
      type: string;
      user: string | { [key: string]: any } | null;
    }) => void
  ) => {
    const res = await axios.post('/api/users/login', data);
    const token = res.data.token;
    const user = res.data.user;
    cookie.set('jwtToken', token);
    cookie.set('user', user);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  };
}

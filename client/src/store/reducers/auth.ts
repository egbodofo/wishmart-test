import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';
import { IUser } from '../../lib/intes-types';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export interface A {
  type: string;
  user: IUser;
  data: any;
  id: string;
}

export default (state = initialState, action: A) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    default:
      return state;
  }
};

import axios from 'axios';
import cookie from 'js-cookie';

export function newProduct(event: any) {
  return (dispatch: any) => {
    const token = cookie.get('jwtToken');
    return axios.post('/api/products', event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

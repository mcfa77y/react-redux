import { BASE_URL } from '../../utils/api_common';

const axios = require('axios');

export const login_api = {
  login: (email: string, password: string) => {
    // console.log(`process.env: ${JSON.stringify(process.env, null, 2)}`);
    return axios.post(`${BASE_URL}/login/admin`, { email, password })
      .then((response: any) => {
        // console.log(`response: ${JSON.stringify(response)}`);
        const { data } = response;
        return data;
      });
  }
  ,

};

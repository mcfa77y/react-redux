import { BASE_URL, make_header } from '../../utils/api_common';

const axios = require('axios');
const CUSTOMER_URL = `${BASE_URL}/customer`;

export const customer_api = {
  fetch_by_id: (id: number, access_token: string) => axios.get(`${CUSTOMER_URL}/${id}`, make_header(access_token))
    .then((response: any) => {
      const { data: customer } = response;
      return customer;
    }),

  fetch_list: (access_token: string) => axios.get(`${CUSTOMER_URL}`, make_header(access_token))
    .then((response: any) => {
      const { data: customer_list } = response;
      return customer_list;
    }),

  update: (data: any, access_token: string) => axios.post(`${CUSTOMER_URL}`, data, make_header(access_token))
    .then((response: any) => {
      const { data: customer } = response;
      return customer;
    }),
};

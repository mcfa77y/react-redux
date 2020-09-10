import { BASE_URL, make_header, unwrapData } from '../../utils/api_common';

const axios = require('axios');

const REPORT_URL = `${BASE_URL}/report`;
export const report_api = {
  fetch_by_id: (id: number, access_token: string) => axios.get(`${REPORT_URL}/${id}`, make_header(access_token))
    .then(unwrapData),

  fetch_by_customer_id: (customer_id: number, access_token: string) => axios.get(`${REPORT_URL}?customer_id=${customer_id}`, make_header(access_token))
    .then(unwrapData),

  fetch_list: (access_token: string) => axios.get(`${REPORT_URL}`, make_header(access_token))
    .then(unwrapData),

  update: (data: any, access_token: string) => axios.post(`${REPORT_URL}`, data, make_header(access_token))
    .then(unwrapData),

  delete: (id_list: number[], access_token: string) => axios.delete(`${REPORT_URL}/${id_list}`, make_header(access_token))
    .then(unwrapData),
};

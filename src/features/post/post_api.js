const axios = require('axios');

const base_url = 'https://jsonplaceholder.typicode.com';

export const post_api = {
  fetch_by_id: (id) => axios.get(`${base_url}/posts/${id}`)
    .then((response) => {
      const { data: post } = response;
      return post;
    }),

  fetch_by_user_id: (user_id) => axios.get(`${base_url}/posts?userId=${user_id}`)
    .then((response) => {
      const { data: post_list } = response;
      return post_list;
    }),

  fetch_list: () => axios.get(`${base_url}/posts`)
    .then((response) => {
      const { data: post_list } = response;
      return post_list;
    }),

};

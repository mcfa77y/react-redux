const axios = require('axios');

const base_url = 'https://jsonplaceholder.typicode.com';

export const comment_api = {
  fetch_by_id: (id) => axios.get(`${base_url}/comments/${id}`)
    .then((response) => {
      const { data: post } = response;
      return post;
    }),

  fetch_by_post_id: (post_id) => axios.get(`${base_url}/comments?postId=${post_id}`)
    .then((response) => {
      const { data: post_list } = response;
      return post_list;
    }),

  fetch_list: () => axios.get(`${base_url}/comments`)
    .then((response) => {
      const { data: post_list } = response;
      return post_list;
    }),

};

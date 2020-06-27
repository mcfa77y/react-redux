const axios = require('axios');

export const user_api = {
  fetch_by_id: (id) => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => {
      const { data: user } = response;
      return user;
    }),

  fetch_list: () => axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      const { data: user_list } = response;
      return user_list;
    }),

};

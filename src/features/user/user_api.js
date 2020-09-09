const axios = require('axios');

export const user_api = {
  fetch_by_id: (id) => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => {
      const { data: user } = response;
      return user;
    }),

  fetch_all: () => axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      console.log('good fetch');
      const { data: user_list } = response;
      return user_list;
    })
    .catch((err) => {
      console.log('bad fetch');
      console.log(`err: ${JSON.stringify(err, null, 2)}`);
      return err;
    }),

};

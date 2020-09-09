const axios = require('axios');

const base_url = 'https://jsonplaceholder.typicode.com';
const entity_url= `${base_url}/albums`
type gen_reponse = {
  data: object
}

export const album_api = {
  fetch_by_id: (id: number) => {
    console.log('fetch album by id: ' + id);
    return axios.get(`${entity_url}/${id}`)
      .then((response: gen_reponse) => {
        const { data: album } = response;
        return album;
      })
  },

  fetch_by_user_id: (user_id: number) => axios.get(`${entity_url}?userId=${user_id}`)
    .then((response: gen_reponse) => {
      const { data: album_list } = response;
      return album_list;
    }),

  fetch_all: () => axios.get(`${entity_url}`)
    .then((response: gen_reponse) => {
      const { data: post_list } = response;
      return post_list;
    }),

};

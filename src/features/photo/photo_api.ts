const axios = require('axios');

const base_url = 'https://jsonplaceholder.typicode.com';
const entity_url = `${base_url}/photos`;
type gen_reponse = {
  data: object
}

export const photo_api = {
  fetch_by_id: (id: number) => {
    console.log('fetch photo by id: ' + id);
    return axios.get(`${entity_url}/${id}`)
      .then((response: gen_reponse) => {
        const { data: photo } = response;
        return photo;
      })
  },

  fetch_by_album_id: (album_id: number) => axios.get(`${entity_url}?albumId=${album_id}`)
    .then((response: gen_reponse) => {
      const { data: photo_list } = response;
      return photo_list;
    }),

  fetch_list: () => axios.get(`${entity_url}`)
    .then((response: gen_reponse) => {
      const { data: post_list } = response;
      return post_list;
    }),

};

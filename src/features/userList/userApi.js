const axios = require('axios');

export const userAPI = {
    fetchById: (id) => axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            const { data: user_list } = response;
            const user_filtered = user_list.filter((user) => user.id === id);
            let user = {};
            if (user_filtered.length > 0) {
                user = user_filtered[0];
            }
            return user;
        }),
    // return Axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)


};

const Axios = require('axios');

export default class Base_API {
    entity_name: string;
    base_url: string;

    constructor(entity_name: string) {
        this.entity_name = entity_name;
        this.base_url = `https://jsonplaceholder.typicode.com/${this.entity_name}`
    }

    fetch_by_id(id: number) {
        return Axios.get(`${this.base_url}/${id}`)
            .then((response: any) => {
                const { data: post } = response;
                return post;
            })
    }

    fetch_by_attr_id(attr: string, id: number) {
        return Axios.get(`${this.base_url}?${attr}=${id}`)
            .then((response: any) => {
                const { data: post_list } = response;
                return post_list;
            })
    }

    fetch_list() {
        return Axios.get(`${this.base_url}`)
            .then((response: any) => {
                const { data: post_list } = response;
                return post_list;
            })
    }


}
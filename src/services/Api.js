import Axios from "axios";

// separating urls for environments
// let urls = {
//     test: `http://localhost:3334`,
//     development: 'http://localhost:3333/',
//     production: 'https://your-production-url.com/'
// }

const { API_URL } = process.env

const api = Axios.create({
    baseURL: API_URL,
    // baseURL: urls[process.env.NODE_ENV], // selecting environment
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;

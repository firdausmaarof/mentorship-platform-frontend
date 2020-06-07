import axios from 'axios';

let urls = {
  test: `http://localhost:3334`,
  development: 'http://localhost:3001/',
  production: 'https://your-production-url.com/',
};

const Api = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default Api;

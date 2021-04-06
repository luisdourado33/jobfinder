import axios from 'axios';

let ipAPI = 'http://localhost:3333';

const api = axios.create({
  baseURL: ipAPI,
});

export default api;

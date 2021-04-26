import axios from 'axios';

let ipAddress = 'http://localhost:3333';

const api = axios.create({
  baseURL: ipAddress,
});

export default api;

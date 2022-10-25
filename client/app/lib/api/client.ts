import axios from 'axios';

const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://toble.com';

export default client;

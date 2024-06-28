import axios from 'axios';

const jsonServerApi = axios.create({
  baseURL: 'https://large-lowly-error.glitch.me',
  timeout: 1000,
});

export default jsonServerApi;
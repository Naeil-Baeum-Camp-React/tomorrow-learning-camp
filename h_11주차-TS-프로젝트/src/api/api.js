import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://restcountries.com',
});

export default axiosInstance;

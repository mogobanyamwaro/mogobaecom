import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://fainashop.herokuapp.com',
});
export default axiosInstance;

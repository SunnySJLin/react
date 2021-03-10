import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://react17-my-burger-default-rtdb.firebaseio.com/'
});

export default axiosInstance;
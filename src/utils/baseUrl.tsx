import axios from 'axios';

const apiUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default apiUrl;

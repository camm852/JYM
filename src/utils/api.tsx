import axios from 'axios';

const apiUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getRecentlyProducts = async () => {
  const response = await apiUrl.get('/productRecently');
  return response.data;
};

export const getRandomProducts = async () => {
  const response = await apiUrl.get('/randomProducts');
  return response.data;
};

export const getAllProducts = async () => {
  const response = await apiUrl.get('/allProducts');
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await apiUrl.get(`/allProducts?id=${id}`);
  return response.data;
};

export default apiUrl;

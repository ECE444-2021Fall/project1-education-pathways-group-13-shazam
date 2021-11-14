import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: apiUrl,
});

export const fetcher = async (url) => {
  const res = await api.get(url);
  return res.data;
};

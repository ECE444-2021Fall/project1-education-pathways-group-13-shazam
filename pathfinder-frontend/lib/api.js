import axios from 'axios';
import refreshTokens from './auth/refresh';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: apiUrl,
});

export const apiWithAuth = axios.create({
  baseURL: apiUrl,
});

// Add a request interceptor to insert CSRF token into header
apiWithAuth.interceptors.request.use(
  (config) => {
    // We only need CSRF tokens on request that can change data
    if (config.method !== 'get') {
      const token = Cookie.get('csrf_access_token');
      if (token) {
        config.headers['X-CSRF-TOKEN'] = token;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to refresh tokens if needed
apiWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is unauthorized, and we haven't already tried refreshing the token
    // Refresh the token and try again
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshSuccessful = await refreshTokens();
      if (!refreshSuccessful) {
        return Promise.reject(error);
      }

      return apiWithAuth(originalRequest);
    }

    // Otherwise, return the error since it can't be fixed by refreshing
    return Promise.reject(error);
  }
);

export const fetcher = async (url) => {
  const res = await apiWithAuth.get(url);
  return res.data;
};

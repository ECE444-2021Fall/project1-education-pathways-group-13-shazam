import { api } from '../api';

const login = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    if (res.status !== 200) {
      throw new Error('Login failed.');
    }

    // Store CSRF in localstorage
    localStorage.setItem('access_csrf_token', res.data.access_csrf_token);
    localStorage.setItem('refresh_csrf_token', res.data.refresh_csrf_token);

    // Return only user data
    return {
      email: res.data.email,
      first_name: res.data.first_name,
      last_name: res.data.last_name,
    };
  } catch (err) {
    throw new Error('Login failed.');
  }
};

export default login;
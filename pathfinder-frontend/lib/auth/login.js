import { api } from '../api';

const login = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    if (res.status !== 200) {
      throw new Error('Login failed.');
    }
    return res.data;
  } catch (err) {
    throw new Error('Login failed.');
  }
};

export default login;

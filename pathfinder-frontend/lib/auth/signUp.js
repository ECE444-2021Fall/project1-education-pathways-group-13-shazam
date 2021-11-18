import { api } from '../api';

const signUp = async (email, first_name, last_name, password) => {
  try {
    const res = await api.post('/user/', { email, first_name, last_name, password });
    return res.status === 201;
  } catch (err) {
    return false;
  }
};

export default signUp;

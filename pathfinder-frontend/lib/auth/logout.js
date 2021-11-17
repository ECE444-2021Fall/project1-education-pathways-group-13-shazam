import { apiWithAuth } from '../api';

const logout = async () => {
  try {
    const res = await apiWithAuth.post('/logout');
    return res.status === 200;
  } catch (err) {
    return false;
  }
};

export default logout;

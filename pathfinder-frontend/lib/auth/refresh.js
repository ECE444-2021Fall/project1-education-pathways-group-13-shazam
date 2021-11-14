import { api } from '../api';

export default refreshTokens = async () => {
  try {
    const res = await api.post('/auth/refresh');
    return res.status === 200;
  } catch (err) {
    return false;
  }
};

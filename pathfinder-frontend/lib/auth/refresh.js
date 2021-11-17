import { api } from '../api';

const refreshTokens = async () => {
  try {
    // Refresh endpoint requires a CSRF refresh token
    const token = localStorage.getItem('refresh_csrf_token');
    console.log(`token: ${token}`);
    if (!token) {
      return false;
    }

    const requestConfig = {
      headers: {
        'X-CSRF-TOKEN': token,
      },
    };

    const res = await api.post('/auth/refresh', {}, requestConfig);
    return res.status === 200;
  } catch (err) {
    return false;
  }
};

export default refreshTokens;

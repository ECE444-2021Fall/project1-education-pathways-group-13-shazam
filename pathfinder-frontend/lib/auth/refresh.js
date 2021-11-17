import { api } from '../api';

const refreshTokens = async () => {
  try {
    // Refresh endpoint requires a CSRF refresh token
    const token = localStorage.getItem('refresh_csrf_token');
    if (!token) {
      return false;
    }

    const requestConfig = {
      headers: {
        'X-CSRF-TOKEN': token,
      },
    };

    const res = await api.post('/auth/refresh', {}, requestConfig);

    // Update CSRF tokens in localStorage
    localStorage.setItem('access_csrf_token', res.data.access_csrf_token);

    return res.status === 200;
  } catch (err) {
    return false;
  }
};

export default refreshTokens;

import { apiWithAuth } from '../api';

const logout = async () => {
  try {
    console.log('logout');
    const res = await apiWithAuth.post('/auth/logout');

    // Remove CSRF tokens from localStorage
    localStorage.removeItem('access_csrf_token');
    localStorage.removeItem('refresh_csrf_token');

    return res.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default logout;

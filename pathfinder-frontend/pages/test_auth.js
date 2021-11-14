import useUser from '../lib/auth/useUser';

export default function TestAuth() {
  const { user, mutateUser } = useUser('/login');
  return (
    <div>
      <h1>Hi, {user.first_name}</h1>
    </div>
  );
}

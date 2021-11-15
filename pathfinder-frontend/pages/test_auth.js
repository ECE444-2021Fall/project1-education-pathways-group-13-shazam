import useUser from '../lib/auth/useUser';

export default function TestAuth() {
  const { user, mutateUser } = useUser('/login');

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Hi, {user.first_name}</h1>
    </div>
  );
}

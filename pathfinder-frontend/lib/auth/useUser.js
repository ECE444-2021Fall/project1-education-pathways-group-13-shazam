import { useEffect, useState } from 'react';

import Router from 'next/router';
import { fetcher } from '../api';
import refreshTokens from './refresh';
import useSWR from 'swr';

// Pattern taken from https://github.com/vvo/iron-session/blob/main/examples/next.js/lib/useUser.js
export default useUser = (redirectTo = '', redirectIfFound = false) => {
  const { data: user, mutate: mutateUser, error } = useSWR('/user', fetcher);
  const [retried, setRetried] = useState(false);

  useEffect(() => {
    // If user not found yet, or there is no redirect, do nothing
    if ((!user && !error) || !redirectTo) {
      return;
    }

    // If error is unauthorized, try to refresh the token
    if (error && error.response.status === 401 && !retried) {
      setRetried(true);
      (async () => {
        return await refreshTokens();
      })();
      mutateUser();
    }

    // If user is found and redirectIfFound is set, redirect
    else if (user && redirectIfFound && redirectTo) {
      Router.push(redirectTo);
    }

    // Otherwise, redirect
    else if ((!user || error) && redirectTo) {
      Router.push(redirectTo);
    }
  }, [user, mutateUser, error, retried, redirectTo, redirectIfFound]);

  return { user, mutateUser };
};

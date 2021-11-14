import Router from 'next/router';
import { fetcher } from '../api';
import { useEffect } from 'react';
import useSWR from 'swr';

// Pattern taken from https://github.com/vvo/iron-session/blob/main/examples/next.js/lib/useUser.js
const useUser = (redirectTo = '', redirectIfFound = false) => {
  const { data: user, mutate: mutateUser } = useSWR('/user/', fetcher);

  useEffect(() => {
    // If user not found yet, or there is no redirect, do nothing
    if (!user || !redirectTo) {
      return;
    }

    // If user is found and redirectIfFound is set, redirect
    if (user && redirectIfFound && redirectTo) {
      Router.push(redirectTo);
    }

    // If user is not found and redirectIfFound is not set, redirect
    if (!user && redirectTo && !redirectIfFound) {
      Router.push(redirectTo);
    }
  }, [user, redirectTo, redirectIfFound]);

  return { user, mutateUser };
};

export default useUser;

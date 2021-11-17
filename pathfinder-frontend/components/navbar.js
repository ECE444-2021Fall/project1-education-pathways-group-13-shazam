import { useCallback, useState } from 'react';

import Link from 'next/link';
import logout from '../lib/auth/logout';
import styles from '../styles/Navbar.module.css';
import { useRouter } from 'next/router';
import useUser from '../lib/auth/useUser';

function NavBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const { mutateUser } = useUser();

  const onQuery = useCallback((e) => {
    console.log(e.target.value);
    const value = e.target.value;
    setQuery(value);
  });

  const onLogout = async () => {
    // Make request to API to remove cookies and tokens
    await logout();
    mutateUser(null);

    // Redirect to the home page
    router.push('/');
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.sectionA}>
            <div className={styles.titleText}>
              <Link href="/">PathFinder</Link>
            </div>
            <div className={styles.searching}>
              <button className={styles.explore}>Explore</button>
              <form>
                <input className={styles.searchbar} value={query} onChange={onQuery} placeholder="Search courses..." />
                <Link href={{ pathname: '/search', query: { query: query } }}>
                  <button className={styles.searchicon}>🔍</button>
                </Link>
              </form>
            </div>
          </div>
          <div className={styles.sectionB}>
            <Link href="/cart">
              <a>Cart</a>
            </Link>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
            <div className="cursor-pointer" onClick={onLogout}>
              <a>Log Out</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;

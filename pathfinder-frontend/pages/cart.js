import { api, fetcher } from '../lib/api';
import { useEffect, useState } from 'react';

import Container from '../components/container';
import NavBar from '../components/navbar';
import styles from './cart.module.css';
import useSWR from 'swr';

function Cart() {
  const { data: cart } = useSWR('/user/cart', fetcher);
  const [cartContents, setCartContents] = useState([]);

  useEffect(() => {
    (async () => {
      if (cart && cart.courses) {
        const newCartContents = await Promise.all(
          cart.courses.map(async (course) => {
            const res = await api.get(`/course/${course}`);
            if (res.data) {
              return res.data;
            }
          })
        );
        console.log(newCartContents);
        setCartContents(newCartContents);
      }
    })();
  }, [cart]);

  return (
    <>
      <NavBar />
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.cartText}>Your Course Cart:</div>
        </div>
      </div>
      <div className={styles.containerWrapper}>
        <div className={styles.container}>
          {cartContents.length > 0 ? (
            cartContents.map((course) => <Container key={course.code} courses={course} />)
          ) : (
            <h1 className="text-3xl p-10">Empty</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;

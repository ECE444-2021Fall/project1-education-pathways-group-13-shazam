import { apiWithAuth, fetcher } from '../lib/api';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import styles from './container.module.css';
import useSWR from 'swr';

function Container(props) {
  const courseA = { ...props.courses };
  const { data: cart, mutate: mutateCart } = useSWR('/user/cart', fetcher);
  const [inCart, setInCart] = useState(false);

  const onAddToCart = async () => {
    await apiWithAuth.post('/user/cart', { course: courseA.code });
    mutateCart((cart) => {
      courses: [...cart.courses, courseA].sort();
    });
  };

  const onRemoveFromCart = async () => {
    await apiWithAuth.delete(`/user/cart`, { data: { course: courseA.code } });
    mutateCart((cart) => {
      courses: cart.courses.filter((course) => course.code !== courseA.code);
    });
  };

  useEffect(() => {
    const newInCart = cart && cart.courses && cart.courses.includes(courseA.code);
    setInCart(newInCart);
  }, [cart, courseA]);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.image}></div>
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.body}>
          <Link href={`/course/${courseA.code}`} passHref>
            <a className={styles.name}>{courseA?.code}</a>
          </Link>
          <div className={styles.title}>{courseA?.name}</div>
          <div className={styles.description}>
            {courseA?.description.length >= 150 && courseA?.description.slice(0, 150).concat('...')}
            {courseA?.description.length < 150 && courseA?.description}
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.buttons}>
          <div className={styles.courseLevel}>{courseA?.courseLevel}</div>
          <div className={styles.department}>
            {courseA?.department.length >= 100 && courseA?.department.slice(0, 100).concat('...')}
            {courseA?.department.length < 200 && courseA?.department}
          </div>
          {inCart ? (
            <button className={styles.remove_button} onClick={onRemoveFromCart}>
              Remove from cart
            </button>
          ) : (
            <button className={styles.button} onClick={onAddToCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Container;

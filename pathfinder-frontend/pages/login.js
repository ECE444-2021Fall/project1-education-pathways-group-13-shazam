import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import login from '../lib/auth/login';
import styles from '../styles/Login.module.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useUser from '../lib/auth/useUser';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateUser } = useUser('/test_auth', true);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      mutateUser(await login(data.email, data.password));
    } catch (err) {
      setErrorMessage('Login failed.');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>PathFinder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.topbar}>
        <div className={styles.appname}>
          <Link href="/">
            <a>PathFinder</a>
          </Link>
        </div>
      </div>
      <main className={styles.main}>
        <div id={styles.earth}>
          <Image src="/earth.svg" alt="earth" width={153} height={130} />
        </div>
        <div id={styles.galaxy1}>
          <Image src="/galaxy1.svg" alt="galaxy" width={152} height={168} />
        </div>
        <div id={styles.ship}>
          <Image src="/ship.svg" alt="ship" width={189} height={142} />
        </div>
        <div id={styles.galaxy2}>
          <Image src="/galaxy2.svg" alt="galaxy" width={175} height={349} />
        </div>
        <div id={styles.planet1}>
          <Image src="/planet1.svg" alt="planet" width={85} height={153} />
        </div>
        <div id={styles.planet2}>
          <Image src="/planet2.svg" alt="planet" width={211} height={219} />
        </div>
        <div id={styles.ground}>
          <Image src="/ground.svg" alt="ground" layout="fill" />
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h1>Welcome Back</h1>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.form_grid}>
                <div className={styles.form_item_2_col}>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    size="35"
                    {...register('email', {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'email is invalid',
                      },
                    })}
                  />
                  {errors.email && errors.email.type === 'required' && (
                    <p className={styles.field_alert}>email is required</p>
                  )}
                  {errors.email && errors.email.type === 'pattern' && (
                    <p className={styles.field_alert}>email address format is invalid</p>
                  )}
                </div>
                <div className={styles.form_item_2_col}>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    size="35"
                    {...register('password', { required: true, minLength: 8 })}
                  />
                  {errors.password && errors.password.type === 'required' && (
                    <p className={styles.field_alert}>password is required</p>
                  )}
                  {errors.password && errors.password.type === 'minLength' && (
                    <p className={styles.field_alert}>password must be at least 8 characters</p>
                  )}
                </div>

                <div className={styles.form_item_2_col}>
                  <p className={styles.error_text}>{errorMessage}</p>
                </div>
                <Link href="/signup" passHref>
                  <button type="button">Sign Up</button>
                </Link>
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

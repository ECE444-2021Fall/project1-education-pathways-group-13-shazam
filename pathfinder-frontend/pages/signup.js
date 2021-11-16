import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import signUp from '../lib/auth/signUp';
import styles from '../styles/Signup.module.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      const signUpSuccessful = await signUp(data.email, data.first_name, data.last_name, data.password);
      if (signUpSuccessful) {
        router.push('/login');
        return;
      } else {
        setErrorMessage('Sign up failed.');
      }
    } catch (err) {
      setErrorMessage('Sign up failed.');
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
            <h1>Get Started</h1>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.field_bar}>
                <div className={styles.form_left}>
                  <input
                    id="first_name"
                    type="text"
                    placeholder="First Name"
                    size="13"
                    {...register('first_name', { required: true })}
                  />
                  {errors.first_name && errors.first_name.type === 'required' && (
                    <p className={styles.field_alert}>first name is required</p>
                  )}
                </div>
                <div className={styles.form_right}>
                  <input
                    id="last_name"
                    type="text"
                    placeholder="Last Name"
                    size="13"
                    {...register('last_name', { required: true })}
                  />
                  {errors.last_name && errors.last_name.type === 'required' && (
                    <p className={styles.field_alert}>last name is required</p>
                  )}
                </div>
              </div>
              <br />
              <div>
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
              <div className={styles.field_bar}>
                <div className={styles.form_left}>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    size="13"
                    {...register('password', { required: true, minLength: 8 })}
                  />
                  {errors.password && errors.password.type === 'required' && (
                    <p className={styles.field_alert}>password is required</p>
                  )}
                  {errors.password && errors.password.type === 'minLength' && (
                    <p className={styles.field_alert}>password must be at least 8 characters</p>
                  )}
                </div>
                <div className={styles.form_right}>
                  <input
                    id="confirm_password"
                    type="password"
                    placeholder="Confirm Password"
                    size="13"
                    {...register('confirm_password', {
                      required: true,
                      validate: (value) => value === watch('password') || 'passwords do not match',
                    })}
                  />
                  {errors.confirm_password && errors.confirm_password.type === 'required' && (
                    <p className={styles.field_alert}>re-enter your password</p>
                  )}
                  {errors.confirm_password && errors.confirm_password.type === 'validate' && (
                    <p className={styles.field_alert}>passwords do not match</p>
                  )}
                </div>
              </div>
              <div>
                <p className={styles.error_text}>{errorMessage}</p>
              </div>
              <div className={styles.button_bar}>
                <Link href="/login" passHref>
                  <button className={styles.form_left} type="button">
                    Already have an account
                  </button>
                </Link>
                <button className={styles.form_right} type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Login.module.css';

export default function Login() {
  const login = (event) => {
    event.preventDefault();
    alert('Hello ' + document.getElementById('email').value + '! The login function has not been implemented yet.');
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
          <Image src="/earth.svg" width={153} height={130} />
        </div>
        <div id={styles.galaxy1}>
          <Image src="/galaxy1.svg" width={152} height={168} />
        </div>
        <div id={styles.ship}>
          <Image src="/ship.svg" width={189} height={142} />
        </div>
        <div id={styles.galaxy2}>
          <Image src="/galaxy2.svg" width={175} height={349} />
        </div>
        <div id={styles.planet1}>
          <Image src="/planet1.svg" width={85} height={153} />
        </div>
        <div id={styles.planet2}>
          <Image src="/planet2.svg" width={211} height={219} />
        </div>
        <div id={styles.ground}>
          <Image src="/ground.svg" layout="fill" />
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h1>Welcome Back</h1>
            <br />
            <form onSubmit={login}>
              <input id="email" type="email" placeholder="Email" size="35" required />
              <br />
              <input id="password" type="password" placeholder="Password" size="35" required />
              <br />
              <div className={styles.button_bar}>
                <button className={styles.form_left} type="submit">
                  Log In
                </button>
                <Link href="/signup">
                  <button className={styles.form_right}>Sign Up</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

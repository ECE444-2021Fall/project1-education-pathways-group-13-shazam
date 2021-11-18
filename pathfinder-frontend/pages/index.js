import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import NavBar from '../components/navbar';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PathFinder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
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
          <Image src="/rover.svg" alt="rover" width={553} height={494} />
          <div className={styles.card}>
            <h1>Selecting courses is hard...</h1>
            <br />
            <p>
              Between checking graduation eligibility, balancing workloads and checking prequisites; course selection
              can feel like rocket science.
            </p>
            <br />
            <p>Use PathFinder and save your time and energy for the important things in life!</p>
            <br />
            <Link href="/signup" passHref>
              <button>Get Started</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>PathFinder</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.topbar}>
                <div className={styles.appname}>PathFinder</div>
                <div className={styles.login}>    
                    <Link href="/login"><a>Log In</a></Link>
                    <Link href="/signup"><a>Sign Up</a></Link>
                </div>
            </div>
            <main className={styles.main}>
            
                <div className={styles.grid}>
                    <Image src="/rover.svg" width={553} height={494} />

                    <div className={styles.card}>
                        <h1>Selecting courses is hard...</h1>
                        <br/>
                        <p>
                            Between checking graduation eligibility, balancing workloads and checking prequistes; 
                            course selection can feel like rocket science. 
                        </p>
                        <br/>
                        <p>
                            Use PathFinder and save your time and energy for the important things in life!
                        </p>
                        <br/>
                        <Link href="/signup">
                            <button className={styles.btn}>Get Started</button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}


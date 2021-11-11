import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Profile.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBar from '../components/navbar';

export default function Profile() {
    const switchSection = (event) => {
        let sections = document.getElementsByClassName(styles.section);
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].id === event.target.id) {
                sections[i].classList.add(styles.active_section);
            } else {
                sections[i].classList.remove(styles.active_section);
            }
        }
        document.getElementById("details").innerHTML = "<h1>" + event.target.id + "</h1>" + "<br/><p>This is the user's " + event.target.id + "</p>";
    }
    
    return (
        <>
            <Head>
                <title>PathFinder</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar/>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <div className={[styles.card, styles.leftbar].join(' ')}>
                        <Image src="/profile-picture.svg" width={202} height={202}/>
                        <div id="name">
                            <h1>Firstname Lastname</h1>
                        </div>
                        <br/>
                        <div id="profile" className={[styles.section, styles.active_section].join(' ')} onClick={switchSection}>Profile</div>
                        <div id="schedule" className={styles.section} onClick={switchSection}>Schedule</div>
                        <div id="settings" className={styles.section} onClick={switchSection}>Settings</div>
                    </div>
                    <div id="details" className={[styles.card, styles.rightbar].join(' ')}>
                        <h1>profile</h1>
                        <br/>
                        <p>
                            This is the user's profile.
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}


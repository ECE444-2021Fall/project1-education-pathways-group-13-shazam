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
                document.getElementById("details").innerHTML = "<h1>" + event.target.id + "</h1>" + "<br/><p>This is the user's " + event.target.id + "</p>";
            } else {
                sections[i].classList.remove(styles.active_section);
            }
        }
    }
    const setSection = (event) => {
        let sections = document.getElementsByClassName(styles.section);
        let profileSection = true;
        for (let i = 1; i < sections.length; i++) {
            if (document.URL.indexOf('#' + sections[i].id) > -1) {
                sections[i].classList.add(styles.active_section);
                profileSection = false;
                document.getElementById("details").innerHTML = "<h1>" + sections[i].id + "</h1>" + "<br/><p>This is the user's " + sections[i].id + "</p>";
            } else {
                sections[i].classList.remove(styles.active_section);
            }
        }
        if (profileSection) {
            document.getElementById("details").innerHTML = "<h1>profile</h1><br/><p>This is the user's profile</p>";
            sections[0].classList.add(styles.active_section);
        }
    }
    
    return (
        <>
            <Head>
                <title>PathFinder</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar/>
            <main className={styles.main} onLoad={setSection}>
                <div className={styles.grid}>
                    <div className={[styles.card, styles.leftbar].join(' ')}>
                        <Image src="/profile-picture.svg" width={202} height={202}/>
                        <div id="name">
                            <h1>Firstname Lastname</h1>
                        </div>
                        <br/>
                        <Link href=""><div id="profile" className={styles.section} onClick={switchSection}>Profile</div></Link>
                        <Link href="#schedule"><div id="schedule" className={styles.section} onClick={switchSection}>Schedule</div></Link>
                        <Link href="#settings"><div id="settings" className={styles.section} onClick={switchSection}>Settings</div></Link>
                    </div>
                    <div id="details" className={[styles.card, styles.rightbar].join(' ')}>
                        <h1>Placeholder Text</h1>
                        <br/>
                        <p>
                            This placeholder text.
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}


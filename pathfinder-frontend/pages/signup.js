import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Signup.module.css'
import Link from 'next/link'

export default function Signup() {
    const signup = (event) => {
        event.preventDefault();
        let password = document.getElementById("password");
        let confirmPassword = document.getElementById("confirm-password");
        
        if (password.value !== confirmPassword.value) {
            document.getElementById("password-mismatch").innerHTML = "The passwords did not match.";
        } else {
            let fieldAlerts = document.getElementsByClassName(styles.field_alert);
            for (let i = 0; i < fieldAlerts.length; i++) {
                fieldAlerts[i].innerHTML = "";
            }
            alert("Welcome " + document.getElementById("first-name").value + "! The signup function has not been implemented yet.");
        }
    }
    
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
                <div id={styles.earth}><Image src="/earth.svg" width={153} height={130}/></div>
                <div id={styles.galaxy1}><Image src="/galaxy1.svg" width={152} height={168}/></div>
                <div id={styles.ship}><Image src="/ship.svg" width={189} height={142}/></div>
                <div id={styles.galaxy2}><Image src="/galaxy2.svg" width={175} height={349}/></div>
                <div id={styles.planet1}><Image src="/planet1.svg" width={85} height={153}/></div>
                <div id={styles.planet2}><Image src="/planet2.svg" width={211} height={219}/></div>
                <div id={styles.ground}><Image src="/ground.svg" layout="fill"/></div>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h1>Get Started</h1>
                        <br/>
                        <form onSubmit={signup}>
                                <div className={styles.field_bar}>
                                    <input id="first-name" className={styles.form_left} type="text" placeholder="First Name" size="13" required />
                                    <input id="last-name" className={styles.form_right} type="text" placeholder="Last Name" size="13" required />
                                </div>
                                <br/>
                                <input id="email" type="email" placeholder="Email" size="35" required />
                                <br/>
                                <div className={styles.field_bar}>
                                    <div id="password-mismatch" className={styles.field_alert}></div>
                                    <input id="password" className={styles.form_left} type="password" placeholder="Password" size="13" pattern=".{8,}" required title="8 characters minimum"/>
                                    <input id="confirm-password" className={styles.form_right} type="password" placeholder="Confirm Password" size="13" required />
                                </div>
                                <br/>
                                <div className={styles.button_bar}>
                                    <Link href="/login"><button className={styles.form_left} type="button">Already have an account</button></Link>
                                    <button className={styles.form_right} type="submit">Sign Up</button>
                                </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}


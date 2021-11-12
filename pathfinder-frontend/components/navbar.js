import styles from '../styles/Navbar.module.css';
import Link from 'next/link';

function NavBar() {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.navbar}>
                    <div className={styles.sectionA}>
                        <div className={styles.titleText}>
                            <Link href="/">PathFinder</Link>
                        </div>
                        <div className={styles.searching}>
                            <button className={styles.explore}>Explore</button>
                            <form>
                                <input className={styles.searchbar} placeholder="Search courses..."/>
                                <button className={styles.searchicon}>🔍</button>
                            </form>
                        </div>
                    </div>
                    <div className={styles.sectionB}>
                        <Link href="/cart"><a>Cart</a></Link>
                        <Link href="/profile"><a>Profile</a></Link>
                        <Link href="/"><a>Log Out</a></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar;


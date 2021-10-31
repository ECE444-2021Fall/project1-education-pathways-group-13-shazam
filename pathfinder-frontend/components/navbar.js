import styles from './navbar.module.css';


function NavBar() {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.navbar}>
                    <div className={styles.sectionA}>
                        <div className={styles.sectionA1}>
                            <div className={styles.titleText}>
                                PathFinder
                            </div>
                        </div>
                        <div className={styles.sectionA2}>
                            <button className={styles.explore}>
                                <span className={styles.exploretext}>
                                    Explore
                                </span>
                            </button>
                        </div>
                        <div className={styles.sectionA3}>
                            <input className={styles.searchbar}/>
                            <button className={styles.searchicon}>
                                <div>I</div>
                            </button>
                        </div>
                    </div>
                    <div className={styles.sectionB}>
                        <div className={styles.sectionB1}>
                            cart
                        </div>
                        <div className={styles.sectionB2}>
                            profile
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar; 

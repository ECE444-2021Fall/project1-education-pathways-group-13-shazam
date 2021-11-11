import styles from './search.module.css';
import NavBar from '../components/navbar';


function Search() {
    return (
        <>
            <NavBar/>
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.searchText}>
                        X search result(s) found:
                    </div>
                    <div className={styles.filterText}>
                        Filter By
                    </div>
                    <select name="filterA" className={styles.filter}>
                        <option value="test">test</option>
                    </select>
                    <select name="filterA" className={styles.filter}>
                        <option value="test">test</option>
                    </select>
                    <select name="filterA" className={styles.filter}>
                        <option value="test">test</option>
                    </select>
                </div>
            </div>
            <div className={styles.containerWrapper}>
                <div className={styles.container}>
                    <div className={styles.card}>
                        
                    </div>
                    <div className={styles.card}>
                        
                    </div>
                    <div className={styles.card}>
                        
                    </div>
                    <div className={styles.card}>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search; 

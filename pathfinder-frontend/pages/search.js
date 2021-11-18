import styles from './search.module.css';
import NavBar from '../components/navbar';
import Container from "../components/container";
import api from '../services/index';
import { useRouter } from 'next/router'

import { useState, useCallback, useEffect } from 'react';


function Search() {
    const router = useRouter();
    const [results, setResults] = useState([]);

    useEffect(async () => {
        const q = router.query.query;
        console.log(`New search: ${q}`);
        const res = await api.search(q);
        console.log(`res: ${res}`);
        setResults(res);

    },[router.query.query]);

    return (
        <>
            <NavBar/>
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.searchText}>
                        {results.length} search result(s) found:
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
                    {results.map((res) => (
                        <Container courses={res}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Search; 

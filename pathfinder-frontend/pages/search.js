import styles from './search.module.css';
import NavBar from '../components/navbar';
import Container from "../components/container";
import api from '../services/index';
import { useRouter } from 'next/router'

import { useState, useCallback, useEffect } from 'react';


function Search() {
    const router = useRouter();
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState(`Showing ${results.length} total results`);

    useEffect(async () => {
        const q = router?.query?.query || "all";
        console.log(`New search: ${q}`);

        const res = await api.search(q);
        if(q !== "all") setQuery(`Showing ${res.length} total results for "${q}"`);
        else setQuery(`Showing ${res.length} total results`);
        
        console.log(`res: ${res}`);
        setResults(res);

    },[router]);

    return (
        <>
            <NavBar/>
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.searchText}>
                        {query}
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
                    {results.map((res,index,_arr) => (
                        <Container courses={res} observer={undefined} key={`${res.name}-${index}`}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Search; 

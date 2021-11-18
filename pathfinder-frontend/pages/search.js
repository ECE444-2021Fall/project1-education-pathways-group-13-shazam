import { useCallback, useEffect, useState } from 'react';

import Container from '../components/container';
import NavBar from '../components/navbar';
import api from '../services/index';
import {getSearchResults} from '../services/courseAPI';
import styles from './search.module.css';
import { useRouter } from 'next/router';

function Search() {
  const router = useRouter();
  const [page,setPage] = useState(1);
  const [results, setResults] = useState([]);

  useEffect(async () => {
    const q = router.query.query || '';
    console.log(`New search: ${q}`);
    const res = await getSearchResults(q, page);
    console.log(`res: ${res}`);
    setResults(res);
  }, [router.query.query, page]);

  const onClick = useCallback(() => {
    const newval = page + 1;
    setPage(newval);
    return;
  },[page]);

  return (
    <>
      <NavBar />
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.searchText}>{results.length} search result(s) found:</div>
          <div className={styles.filterText}>Filter By</div>
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
            <Container key={res.code} courses={res} />
          ))}
          <button className={styles.loadmore} onClick={onClick}>
            Load More
          </button>
        </div>
      </div>
    </>
  );
}

export default Search;

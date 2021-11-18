import styles from './cart.module.css';
import NavBar from '../components/navbar';
import api from '../services/index';
import { useState, useCallback, useEffect } from 'react';


function Cart() {
    const [results, setResults] = useState([]);

    useEffect(async () => {
        const res = await api.getUserCart();
        console.log(`res: ${res}`);
        setResults(res);

    },[]);


    return (
        <>
            <NavBar/>
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.cartText}>
                        Your Course Cart:
                    </div>
                </div>
            </div>
            <div className={styles.containerWrapper}>
                <div className={styles.container}>
                    {results.map(() => (
                            <div className={styles.card}>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default Cart; 

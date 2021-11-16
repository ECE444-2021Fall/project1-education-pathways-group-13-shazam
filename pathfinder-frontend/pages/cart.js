import styles from './cart.module.css';
import NavBar from '../components/navbar';
import api from '../services/index';
import Container from "../components/container";
import { useState, useCallback, useEffect } from 'react';


function Cart() {
    const [results, setResults] = useState([]);
    const [dirty, setDirty] = useState(true);

    useEffect(async () => {
        if(dirty) {
            const res = await api.getUserCart();
            console.log(`res: ${res}`);
            setResults(res);
            setDirty(false);
        }

    },[dirty]);


    return (
        <>
            <NavBar/>
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.cartText}>
                        Your Course Cart
                    </div>
                </div>
            </div>
            <div className={styles.containerWrapper}>
                <div className={styles.container}>
                    {results.map((course,index,_arr) => (
                            <Container courses={course} observer={{val: dirty, callback: setDirty}} key={`${course.name}-${index}`} />
                        ))}
                </div>
            </div>
        </>
    )
}

export default Cart; 

import styles from './scheduler.module.css';
import NavBar from '../components/navbar';
import api from '../services/index';
import { useState, useCallback, useEffect } from 'react';

function Scheduler() {
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
                    <div className={styles.schedulerText}>
                        Scheduler
                    </div>
                    <div className={styles.schedulerBody}>
                        A bunch of text on how it works:
                    </div>
                    <ul>
                        <li className={styles.listText}>
                            1. loresu
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.containerWrapper}>
                <div className={styles.containerA}>
                    <div className={styles.containerA1}>
                        <div className={styles.a1Text}>
                            Saved Courses:
                        </div>
                    </div>
                    <div className={styles.containerA2}>
                        {results.map(() => (
                                <div className={styles.card}>
                                </div>
                            ))}
                    </div>
                </div>
                <div className={styles.containerB}>
                    <div className={styles.containerB1}>
                        <div className={styles.containerB1A}>
                            <div className={styles.B1Atext}>
                                Semester 1
                            </div>
                        </div>
                        <div className={styles.containerB1B}>
                            <div className={styles.cardPlace}>
                            
                            </div>
                            <div className={styles.cardPlace}>
                                
                            </div>
                            <div className={styles.cardPlace}>
                                
                            </div>
                            <div className={styles.cardPlace}>
                                
                            </div>
                            <div className={styles.cardPlace}>
                                
                            </div>
                        </div>
                    </div>
                    <div className={styles.containerB2}>
                        <div className={styles.containerB1A}>
                                <div className={styles.B1Atext}>
                                    Semester 2
                                </div>
                            </div>
                            <div className={styles.containerB1B}>
                                <div className={styles.cardPlace}>
                                
                                </div>
                                <div className={styles.cardPlace}>
                                    
                                </div>
                                <div className={styles.cardPlace}>
                                    
                                </div>
                                <div className={styles.cardPlace}>
                                    
                                </div>
                                <div className={styles.cardPlace}>
                                    
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Scheduler; 

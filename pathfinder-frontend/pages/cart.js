import styles from './cart.module.css';
import NavBar from '../components/navbar';


function Cart() {
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

export default Cart; 

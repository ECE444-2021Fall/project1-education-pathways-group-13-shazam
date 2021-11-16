import styles from './container.module.css';
import api from '../services/index';
import { useState, useCallback, useEffect } from 'react';


function Container({courses, observer}) {
    const [inCart, setInCart] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(async () => {
        const res = await api.getUserCart();
        const inUserCart = res.find(e => e.name == courses?.name);
        setInCart(inUserCart == undefined ? false : true);
        console.log("in ssearch:" + res);
        setCart(res);
    },[observer]);

    const addToCart = useCallback(async () => {
        let newCart = cart;
        console.log('add to cart');
        if(inCart) {
            newCart = cart.filter(e => e.name != courses?.name);
            setCart(newCart);
            setInCart(false);
        }
        else {
            console.log('not in cart - so add');
            cart.push(courses);
            newCart = cart;
            setCart(cart);
            setInCart(true);
        }
        await api.postUserCart(newCart);
        if(observer) observer.callback(true);
    }, [cart,inCart,observer]);

    const courseA = {...courses};
    // console.log(courseA);
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <div className={styles.image}>
                </div>
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.body}>
                    <div className={styles.name}>
                        {courseA?.name}
                    </div>
                    <div className={styles.title}>
                        {courseA?.title}
                    </div>
                    <div className={styles.description}>
                        {
                            courseA?.description.length >= 150 &&
                            courseA?.description.slice(0,150).concat("...")
                        }
                        {
                            courseA?.description.length < 150 &&
                            courseA?.description
                        }
                    </div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <div className={styles.buttons}>
                    <div className={styles.courseLevel}>
                        {courseA?.courseLevel}
                    </div>
                    <div className={styles.department}>
                        {
                            courseA?.department.length >= 100 &&
                            courseA?.department.slice(0,100).concat("...")
                        }
                        {
                            courseA?.department.length < 200 &&
                            courseA?.department
                        }
                    </div>
                    <button className={styles.button} onClick={addToCart}>
                        { inCart ? "Remove from cart" : "Add to cart"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Container; 

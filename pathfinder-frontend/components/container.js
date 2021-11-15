import styles from './container.module.css';


function Container(props) {
    const courseA = {...props.courses};
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
                    <button className={styles.button}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Container; 

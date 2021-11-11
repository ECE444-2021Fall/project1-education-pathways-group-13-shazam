import styles from './course.module.css';
import NavBar from '../components/navbar';


function Course() {
    return (
        <>
            <NavBar/>
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.courseTitle}>
                        Course Name
                    </div>
                    <div className={styles.courseSubtitle}>
                        3.7 Star | 50 Ratings
                    </div>
                    <div className={styles.courseProf}>
                        Taught by Professor X
                    </div>
                </div>
            </div>
            <div className={styles.headingsContainer}>
                <div className={styles.headings}>
                    <div className={styles.about}>
                        About
                    </div>
                    <div className={styles.instructor}>
                        Instructor
                    </div>
                    <div className={styles.syllabus}>
                        Syllabus
                    </div>
                    <div className={styles.reviews}>
                        Reviews
                    </div>
                    <div className={styles.faq}>
                        FAQ
                    </div>
                </div>
            </div>
            <div className={styles.containerWrapper}>
                <div className={styles.container}>

                </div>
            </div>
        </>
    )
}

export default Course; 

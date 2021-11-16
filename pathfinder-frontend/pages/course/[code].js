import styles from '../../styles/Course.module.css';
import NavBar from '../../components/navbar';
import { useRouter } from 'next/router';

function Course() {
  const router = useRouter();
  const { code } = router.query;

  const switchSection = (event) => {
    let sections = document.getElementsByClassName(styles.section);
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].id === event.target.id) {
        sections[i].classList.add(styles.selectedSection);
        document.getElementById(`${sections[i].id}Container`).hidden = false;
        console.log(`${sections[i].id}Container shown`);
      } else {
        sections[i].classList.remove(styles.selectedSection);
        document.getElementById(`${sections[i].id}Container`).hidden = true;
        console.log(`${sections[i].id}Container hide`);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.courseTitle}>{code}</div>
          <div className={styles.courseSubtitle}>Course Name</div>
          <div className={styles.courseSubtitle}>0.0/10 Stars | 0 Ratings</div>
        </div>
      </div>
      <div className={styles.headingsContainer}>
        <div className={styles.headings}>
          <div id="about" className={[styles.section, styles.selectedSection].join(' ')} onClick={switchSection}>
            About
          </div>
          <div id="requirements" className={styles.section} onClick={switchSection}>
            Requirements
          </div>
          <div id="reviews" className={styles.section} onClick={switchSection}>
            Reviews
          </div>
        </div>
      </div>
      <div className={styles.containerWrapper}>
        <div id="aboutContainer" className={styles.container}>
          About
        </div>
        <div id="requirementsContainer" className={styles.container} hidden>
          Requirements
        </div>
        <div id="reviewsContainer" className={styles.container} hidden>
          Reviews
        </div>
      </div>
    </>
  );
}

export default Course;

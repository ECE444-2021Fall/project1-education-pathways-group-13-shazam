import styles from '../../styles/Course.module.css';
import NavBar from '../../components/navbar';
import Review from '../../components/review';
import getReviews from '../../services/getReviews';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function Course() {
  const router = useRouter();
  const { code } = router.query;

  const [reviews, setReviews] = useState([]);
  useEffect(async () => {
    if (!router.isReady) return;
    const res = await getReviews(code);
    setReviews(res);
  }, [router.isReady]);

  let averageRating = 0;
  for (let i = 0; i < reviews.length; i++) {
    averageRating += reviews[i].rating;
  }
  if (reviews.length > 0) {
    averageRating /= reviews.length;
  }

  const switchSection = (event) => {
    let sections = document.getElementsByClassName(styles.section);
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].id === event.target.id) {
        sections[i].classList.add(styles.selectedSection);
        document.getElementById(`${sections[i].id}Container`).hidden = false;
      } else {
        sections[i].classList.remove(styles.selectedSection);
        document.getElementById(`${sections[i].id}Container`).hidden = true;
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
          <div className={styles.courseSubtitle}>
            {Math.round(averageRating * 10) / 10}/10 Stars | {reviews.length} Ratings
          </div>
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
        <div className={styles.container}>
          <div id="aboutContainer">About</div>
          <div id="requirementsContainer" hidden>
            Requirements
          </div>
          <div id="reviewsContainer" hidden>
            {reviews.map((res, index) => (
              <Review reviews={res} key={`${index}`} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;

import Head from 'next/head';
import styles from '../../styles/Course.module.css';
import NavBar from '../../components/navbar';
import Review from '../../components/review';
import { getReviews, addReview, deleteReview } from '../../services/reviewsAPI';
import useUser from '../../lib/auth/useUser';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function Course() {
  const router = useRouter();
  const { code } = router.query;
  const { user, mutateUser } = useUser('');

  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(1);
  useEffect(async () => {
    if (!router.isReady) return;
    const res = await getReviews(code);
    setReviews(res);

    let deleteButtons = document.getElementsByClassName(styles.deleteReviewButton);
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', removeSelf);
    }
  }, [router.isReady, refresh]);

  let averageRating = 0;
  let noReviewAllowed = false;
  for (let i = 0; i < reviews.length; i++) {
    averageRating += reviews[i].rating;
    if (!user || reviews[i].user === user.email) {
      noReviewAllowed = true;
    }
  }
  if (reviews.length > 0) {
    averageRating /= reviews.length;
  }

  const removeSelf = (event) => {
    if (confirm('Are you sure you want to delete your review?')) {
      deleteReview(code, user.email)
        .then((response) => setRefresh((prev) => prev + 1))
        .catch((error) => console.log('error', error));
    }
  };

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

  const showReviewForm = (event) => {
    document.getElementById('reviewForm').hidden = false;
    document.getElementById('addReviewButton').hidden = true;
  };

  const submitReview = (event) => {
    event.preventDefault();
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;
    addReview(router.query.code, user.email, rating, comment)
      .then((response) => setRefresh((prev) => prev + 1))
      .catch((error) => console.log('error', error));

    document.getElementById('reviewForm').hidden = true;
  };

  return (
    <>
      <Head>
        <title>{code}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <div className={styles.courseTitle}>{code}</div>
            <div className={styles.courseSubtitle}>Course Name</div>
            <div className={styles.courseSubtitle}>
              {Math.round(averageRating * 10) / 10}/10 Stars | {reviews.length} Reviews
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
              <div id="addReviewButton" hidden={noReviewAllowed}>
                <button className={styles.reviewButton} onClick={showReviewForm}>
                  Add a review
                </button>
              </div>
              <form id="reviewForm" className={styles.reviewForm} onSubmit={submitReview} hidden>
                <label>Rating: </label>
                <select id="rating">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>{' '}
                / 10
                <br />
                <label>Comment</label>
                <br />
                <textarea
                  id="comment"
                  className={styles.comment}
                  rows={10}
                  cols={60}
                  placeholder="Please comment about the skills you learned, the professor, time commitment and difficulty."
                  required
                />
                <br />
                <button type="submit">Submit</button>
              </form>
              {reviews.map((res, index) => (
                <Review reviews={res} key={`${index}`} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Course;

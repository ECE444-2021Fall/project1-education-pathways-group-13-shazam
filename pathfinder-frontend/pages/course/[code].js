import Head from 'next/head';
import styles from '../../styles/Course.module.css';
import NavBar from '../../components/navbar';
import Review from '../../components/review';
import { getCourseInfo, getReviews, addReview, deleteReview } from '../../services/courseAPI';
import useUser from '../../lib/auth/useUser';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function Course() {
  const router = useRouter();
  const { code } = router.query;
  const { user, mutateUser } = useUser('');

  const [reviews, setReviews] = useState([]);
  const [courseInfo, setCourseInfo] = useState(1);
  const [refresh, setRefresh] = useState(1);

  const removeSelf = (event) => {
    if (confirm('Are you sure you want to delete your review?')) {
      deleteReview(code, user.email)
        .then((response) => setRefresh((prev) => prev + 1))
        .catch((error) => console.log('error', error));
    }
  };

  useEffect(async () => {
    if (!router.isReady) return;

    const cres = await getCourseInfo(code);
    if (!cres) Router.push(`/${code}`);
    setCourseInfo(cres);

    const res = await getReviews(code);
    setReviews(res);

    let deleteButtons = document.getElementsByClassName(styles.deleteReviewButton);
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', removeSelf);
    }
  }, [router.isReady, refresh, code]);

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
            <div className={styles.courseSubtitle}>{courseInfo.name}</div>
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
            <div id="aboutContainer">
              <strong>Course Description</strong>: {courseInfo.description}
              <br />
              <br />
              <strong>Terms</strong>:
              <br />
              {courseInfo.offerings && courseInfo.offerings.length > 0 ? (
                courseInfo.offerings.map((res, index) => (
                  <div key={index}>
                    {res}
                    <br />
                  </div>
                ))
              ) : (
                <> None</>
              )}
              <br />
              <strong>Campus</strong>: {courseInfo.campus}
              <br />
              <strong>Division</strong>: {courseInfo.division}
              <br />
              <strong>Department</strong>: {courseInfo.department}
              {courseInfo.maybe_restricted ? (
                <>
                  <br />
                  This course may be restricted to students in this department.
                </>
              ) : (
                ''
              )}
              <br />
              <strong>Level</strong>: {courseInfo.level}
              <br />
              <br />
              <strong>Majors</strong>:
              {courseInfo.majors && courseInfo.majors.length > 0 ? (
                courseInfo.majors.map((res, index) => (
                  <span key={index}>
                    <br />
                    {res}
                  </span>
                ))
              ) : (
                <> None</>
              )}
              <br />
              <strong>Minors</strong>:
              {courseInfo.minors && courseInfo.minors.length > 0 ? (
                courseInfo.minors.map((res, index) => (
                  <span key={index}>
                    <br />
                    {res}
                  </span>
                ))
              ) : (
                <> None</>
              )}
              <br />
              {courseInfo.as_breadth ? (
                <>
                  <br />
                  <strong>Arts and Science Breadth</strong>: {courseInfo.as_breadth}
                </>
              ) : (
                ''
              )}
              {courseInfo.as_distribution ? (
                <>
                  <br />
                  <strong>Arts and Science Distribution</strong>: {courseInfo.as_distribution}
                </>
              ) : (
                ''
              )}
              {courseInfo.utsc_breadth ? (
                <>
                  <br />
                  <strong>UTSC Breadth</strong>: {courseInfo.utsc_breadth}
                </>
              ) : (
                ''
              )}
              {courseInfo.utm_distribution ? (
                <>
                  <br />
                  <strong>UTM Distribution</strong>: {courseInfo.utm_distribution}
                </>
              ) : (
                ''
              )}
              {courseInfo.apsc_electives ? (
                <>
                  <br />
                  <strong>Applied Science Electives</strong>: {courseInfo.apsc_electives}
                </>
              ) : (
                ''
              )}
              {courseInfo.fase_available ? (
                <>
                  <br />
                  This course is available to students in the Faculty of Applied Science and Engineering.
                </>
              ) : (
                ''
              )}
            </div>
            <div id="requirementsContainer" hidden>
              <strong>Recommended Pre-Requisites</strong>:
              {courseInfo.preparations && courseInfo.preparations.length > 0 ? (
                courseInfo.preparations.map((res, index) => (
                  <Link href={`/course/${res}`} key={index} passHref>
                    <button className={styles.requisite}>{res}</button>
                  </Link>
                ))
              ) : (
                <> None</>
              )}
              <br />
              <strong>Pre-Requisites</strong>:
              {courseInfo.prerequisites && courseInfo.prerequisites.length > 0 ? (
                courseInfo.prerequisites.map((res, index) => (
                  <Link href={`/course/${res}`} key={index} passHref>
                    <button className={styles.requisite}>{res}</button>
                  </Link>
                ))
              ) : (
                <> None</>
              )}
              <br />
              <strong>Co-Requisites</strong>:
              {courseInfo.corequisites && courseInfo.corequisites.length > 0 ? (
                courseInfo.corequisites.map((res, index) => (
                  <Link href={`/course/${res}`} key={index} passHref>
                    <button className={styles.requisite}>{res}</button>
                  </Link>
                ))
              ) : (
                <> None</>
              )}
              <br />
              <strong>Exclusions</strong>:
              {courseInfo.exclusions && courseInfo.exclusions.length > 0 ? (
                courseInfo.exclusions.map((res, index) => (
                  <Link href={`/course/${res}`} key={index} passHref>
                    <button className={styles.requisite}>{res}</button>
                  </Link>
                ))
              ) : (
                <> None</>
              )}
              <br />
              <strong>Pre-Requisite For</strong>:
              {courseInfo.prerequisites_for && courseInfo.prerequisites_for.length > 0 ? (
                courseInfo.prerequisites_for.map((res, index) => (
                  <Link href={`/course/${res}`} key={index} passHref>
                    <button className={styles.requisite}>{res}</button>
                  </Link>
                ))
              ) : (
                <> None</>
              )}
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

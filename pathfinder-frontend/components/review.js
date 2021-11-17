import { useRouter } from 'next/router';
import { deleteReview } from '../services/reviewsAPI';
import styles from '../styles/Review.module.css';

function Review(props) {
  const reviews = { ...props.reviews };
  const router = useRouter();
  const { code } = router.query;

  let hide = props.reviews.user !== 'someone@example.com';
  const removeSelf = (event) => {
    deleteReview(code, 'someone@example.com')
      .then((response) => (document.getElementById(props.number).hidden = true))
      .catch((error) => console.log('error', error));
  };
  return (
    <div id={props.number}>
      <strong>Rating</strong>: {reviews?.rating} / 10
      <br />
      <strong>Date</strong>: {reviews?.date}
      <br />
      <strong>By</strong>: {reviews?.author}
      <br />
      {reviews?.comment}
      <br />
      <button onClick={removeSelf} className={styles.deleteReviewButton} hidden={hide}>
        Delete
      </button>
      <br />
    </div>
  );
}

export default Review;

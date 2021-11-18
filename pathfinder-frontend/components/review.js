import { useRouter } from 'next/router';
import useUser from '../lib/auth/useUser';
import styles from '../styles/Course.module.css';

function Review(props) {
  const reviews = { ...props.reviews };
  const router = useRouter();
  const { code } = router.query;

  let hide = true;
  const { user, mutateUser } = useUser('');
  if (user && user.email === props.reviews.user) {
    hide = false;
  }

  return (
    <>
      <strong>Rating</strong>: {reviews?.rating} / 10
      <br />
      <strong>Date</strong>: {reviews?.date}
      <br />
      <strong>By</strong>: {reviews?.author}
      <br />
      {reviews?.comment}
      <br />
      <button className={styles.deleteReviewButton} hidden={hide}>
        Delete
      </button>
      <br />
    </>
  );
}

export default Review;

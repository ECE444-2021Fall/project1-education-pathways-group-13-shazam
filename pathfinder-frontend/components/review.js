function Review(props) {
  const reviews = { ...props.reviews };
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
      <br />
    </>
  );
}

export default Review;

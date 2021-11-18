import { apiWithAuth } from '../lib/api';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getCourseInfo = async (code) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const res = await fetch(`${apiUrl}/course/${code}`, requestOptions);
  if (res.ok) {
    return res.json();
  } else {
    return Promise.resolve(0);
  }
};

export const getReviews = async (code) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const res = await fetch(`${apiUrl}/reviews/${code}`, requestOptions);
  if (res.ok) {
    return res.json();
  } else {
    return Promise.resolve([]);
  }
};

export const addReview = async (course, rating, comment) => {
  var newReview = {
    course: course,
    rating: rating,
    comment: comment,
  };

  return await apiWithAuth.post('/reviews/', newReview);
};

export const deleteReview = async (course) => {
  var deleteRequest = {
    course: course,
  };

  return await apiWithAuth.delete('/reviews/', { data: deleteRequest });
};

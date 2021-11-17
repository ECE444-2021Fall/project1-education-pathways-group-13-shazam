const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getCourseInfo = async (code) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const res = await fetch(`${apiUrl}course/${code}`, requestOptions);
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

  const res = await fetch(`${apiUrl}reviews/${code}`, requestOptions);
  if (res.ok) {
    return res.json();
  } else {
    return Promise.resolve([]);
  }
};

export const addReview = async (course, user, rating, comment) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    course: course,
    user: user,
    rating: rating,
    comment: comment,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return await fetch(`${apiUrl}reviews/`, requestOptions);
};

export const deleteReview = async (course, user) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    course: course,
    user: user,
  });

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return await fetch(`${apiUrl}reviews/`, requestOptions);
};

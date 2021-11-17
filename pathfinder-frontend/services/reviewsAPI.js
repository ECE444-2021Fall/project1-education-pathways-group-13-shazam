export const getReviews = async (code) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const res = await fetch(`http://localhost:5000/reviews/${code}`, requestOptions);
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

  return await fetch('http://localhost:5000/reviews/', requestOptions);
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

  return await fetch('http://localhost:5000/reviews/', requestOptions);
};

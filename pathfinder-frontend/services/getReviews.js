const getReviews = async (code) => {
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

export default getReviews;

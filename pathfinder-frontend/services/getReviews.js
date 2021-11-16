const getReviews = (code) => {
  const reviews = [
    {
      rating: 6,
      date: '2021-09-08',
      author: 'Daniel Liang',
      comment: 'A message from me!',
    },
    {
      rating: 9,
      date: '2021-09-28',
      author: 'Some One',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      rating: 7,
      date: '2021-11-07',
      author: 'Who This',
      comment: 'This is the third review.',
    },
  ];

  return reviews;
};

export default getReviews;

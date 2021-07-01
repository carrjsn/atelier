import React from 'react';

const MoreReviews = ({ get2Reviews }) => {
  let handleMoreReviewsClick = () => {
    get2Reviews();
  }
  return (
    <div className='more-reviews'>
      <button type='button' onClick={handleMoreReviewsClick}> MORE REVIEWS</button>
    </div>
  );
};

export default MoreReviews;

import React from 'react';
import ReviewsTile from './reviewsTile.jsx';

const ReviewsList = ({ reviews, increaseReviewHelpfulnesss, reportReview, helpfulReviews, searchTerm }) => {
  return (
    <div className='reviews-list'>
      {
        reviews.length === 0 ? <div> THERE ARE NO REVIEWS FOR THIS PDT </div> :
        reviews.map((review, idx) => <ReviewsTile key={idx} review={review} helpfulReviews={helpfulReviews} searchTerm={searchTerm} increaseReviewHelpfulnesss={increaseReviewHelpfulnesss} reportReview={reportReview}/>)
      }
    </div>
  );
};

export default ReviewsList;
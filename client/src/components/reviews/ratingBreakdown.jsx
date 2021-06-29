import React from 'react';
import RatingSummary from './ratingSummary.jsx';
import StarBreakdown from './starBreakdown.jsx';

const RatingBreakdown = ({ totalReviews, noOfReviews, avgRating, filterReviews, selectedFilters, removeFilters, removedAllFilters }) => {
  let recommendedReviews = totalReviews.filter((review) => review.recommend);
  let recommendPercentage = (recommendedReviews.length / noOfReviews) * 100;
  recommendPercentage = Number(recommendPercentage.toFixed());

  return (
    <div className='reviews-ratings-breakdown'>
      <RatingSummary avgRating={avgRating} noOfReviews={noOfReviews}/>
      <div className='reviews-ratings-breakdown-recommend'>
        {recommendPercentage}% of users recommend this pdt
      </div>
      <StarBreakdown
        totalReviews={totalReviews}
        filterReviews={filterReviews}
        selectedFilters={selectedFilters}
        removeFilters={removeFilters}
        removedAllFilters={removedAllFilters}
      />
    </div>
  );
};

export default RatingBreakdown;
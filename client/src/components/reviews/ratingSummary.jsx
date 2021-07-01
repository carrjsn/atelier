import React from 'react'
import Stars from '../stars/stars.jsx';

const RatingSummary = ({ noOfReviews, avgRating }) => {
  avgRating = Number(avgRating.toFixed(1));

  return (
    <div className='reviews-ratings-breakdown-summary'>
      <div className='avgRating'> {noOfReviews === 0 ? 0 : avgRating} </div>
      <div className='stars'>
        <Stars size={18} rating={avgRating}/>
        <div>{noOfReviews} reviews</div>
      </div>
    </div>
  )
}

export default RatingSummary;
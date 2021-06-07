import React from 'react';
import RatingsBreakdown from './ratingsBreakdown.jsx';
import PdtBreakdown from './pdtBreakdown.jsx';
import ReviewsList from './reviewsList.jsx';
import Search from './search.jsx';
import AddReview from './addReview.jsx';
import MoreReviews from './moreReviews.jsx';

class Reviews extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='reviews'>
        <h2>RATINGS & REVIEWS</h2>
        <div className='reviews-body'>
          <div className='reviews-breakdown'>
            <RatingsBreakdown />
            <PdtBreakdown />
          </div>
          {
            this.props.reviews.length === 0 ?
              <AddReview /> :
              <div className='reviews-main'>
                <div className='reviews-sort'>
                  No. of reviews, sorted by dropdown
                </div>
                <Search />
                <ReviewsList reviews={this.props.reviews} increaseReviewHelpfulnesss={this.props.increaseReviewHelpfulnesss} reportReview={this.props.reportReview}/>
                <div className='reviews-btns'>
                  <MoreReviews />
                  <AddReview />
                </div>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default Reviews;
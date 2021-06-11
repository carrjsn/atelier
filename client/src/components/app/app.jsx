import React from 'react';
import Reviews from '../reviews/reviews.jsx';
import Overview from '../productOverview/Overview.jsx';
import QAndA from '../qAndA/qAndA.jsx';
import RelatedItems from '../relatedItems/RelatedItems.jsx';
import {findAvgRating, sortByCriteria} from '../../../../helper/reviewsHelper.js';
import ReviewsErrorBoundary from '../errorBoundary/reviewsErrorBoundary.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      productId: '22161',
      totalReviews: [],
      currentReviews: [],
      nextReviews: [],
      reviewCriteria: 'relevant',
      noOfReviews: 0,
      avgRating: 0,
      filteredTotalReviews: [],
      filteredCurrentReviews: [],
      filteredNextReviews: [],
      selectedFilters: [],
      removedAllFilters: false
    };
  }

  removeFilters = () => {
    this.setState((prevState) => {
      return {
        filteredTotalReviews: [],
        filteredCurrentReviews: [],
        filteredNextReviews: [],
        selectedFilters: [],
        removedAllFilters: true
      }
    })
  }

  filterReviews = (criteria, isSelected) => {
    //Currently no filters applied applied.
    if (this.state.filteredTotalReviews.length === 0) {
      let filteredTotalReviews = this.state.totalReviews.filter((review) => review.rating === criteria);
      let currentReviewsLength = this.state.currentReviews.length;
      let filteredCurrentReviews = filteredTotalReviews.slice(0, currentReviewsLength);
      let filteredNextReviews = filteredTotalReviews.slice(currentReviewsLength, currentReviewsLength + 2);
      let selectedFilters = [...this.state.selectedFilters, criteria]
      this.setState((prevState) => {
        return {
          filteredTotalReviews,
          filteredCurrentReviews,
          filteredNextReviews,
          selectedFilters,
          removedAllFilters: false
        }
      },() => console.log('state after adding a filter for the first time', this.state))
      //Filter has to applied
    } else if (isSelected) {
      let newFilteredReviews = this.state.totalReviews.filter((review) => review.rating === criteria);
      let filteredTotalReviews = [...this.state.filteredTotalReviews, ...newFilteredReviews];
      let currentReviewsLength = this.state.filteredCurrentReviews.length;
      let filteredCurrentReviews = filteredTotalReviews.slice(0, currentReviewsLength);
      let filteredNextReviews = filteredTotalReviews.slice(currentReviewsLength, currentReviewsLength + 2);
      let selectedFilters = [...this.state.selectedFilters, criteria]
      this.setState((prevState) => {
        return {
          filteredTotalReviews,
          filteredCurrentReviews,
          filteredNextReviews,
          selectedFilters
        }
      }, () => console.log('state after adding a filter', this.state))
      //Filter has to be removed but it is not the last filter
    } else if (this.state.selectedFilters.length > 1) {
      let filteredTotalReviews = this.state.filteredTotalReviews.filter((review) => review.rating !== criteria);
      let currentReviewsLength = this.state.filteredCurrentReviews.length;
      let filteredCurrentReviews = filteredTotalReviews.slice(0, currentReviewsLength);
      let filteredNextReviews = filteredTotalReviews.slice(currentReviewsLength, currentReviewsLength + 2);
      let selectedFilters = this.state.selectedFilters.filter((star) => star !== criteria)
      this.setState((prevState) => {
        return {
          filteredTotalReviews,
          filteredCurrentReviews,
          filteredNextReviews,
          selectedFilters
        }
      }, () => console.log('state after removing a filter', this.state))
      //Last fiiler has to be removed. So display the currentReviews before the first filter was applied
    } else {
      let filteredTotalReviews = this.state.filteredTotalReviews.filter((review) => review.rating !== criteria);
      let currentReviewsLength = this.state.currentReviews.length;
      let filteredCurrentReviews = filteredTotalReviews.slice(0, currentReviewsLength);
      let filteredNextReviews = filteredTotalReviews.slice(currentReviewsLength, currentReviewsLength + 2);
      let selectedFilters = this.state.selectedFilters.filter((star) => star !== criteria)
      this.setState((prevState) => {
        return {
          filteredTotalReviews,
          filteredCurrentReviews,
          filteredNextReviews,
          selectedFilters
        }
      }, () => console.log('state after removing a filter', this.state))
    }
  }

  sortReviews = (criteria) => {
    let totalReviews = sortByCriteria(criteria, this.state.totalReviews.slice());
    let currentReviews = totalReviews.slice(0, 2);
    let nextReviews = totalReviews.slice(2, 4);
    this.setState((prevState) => ({
      totalReviews,
      currentReviews,
      nextReviews,
      reviewCriteria: criteria
    }), () => console.log(`state sorted by ${criteria}`, this.state))
  }

  getAllReviews = (endIdx = 2) => {
    return fetch(`http://localhost:3000/allReviews?productId=${this.state.productId}`)
    .then((resp) => resp.json())
    .then((allReviews) => {
      // console.log('all reviews', allReviews)
      let avgRating = findAvgRating(allReviews);
      let totalReviews = sortByCriteria(this.state.reviewCriteria, allReviews)

      this.setState({
        totalReviews,
        noOfReviews: totalReviews.length,
        avgRating,
        currentReviews: totalReviews.slice(0, endIdx),
        nextReviews: totalReviews.slice(endIdx, endIdx + 2)
      }, () => console.log('state after fetching all reviews', this.state))
    })
    .catch((err) => {
      console.log('ERROR GETTING ALL REVIEWS', err);
    })
  }

  get2Reviews = () => {
    if (this.state.filteredTotalReviews.length === 0) {
      let idx = this.state.currentReviews.length + 2;
      let currentReviews = this.state.totalReviews.slice(0, idx);
      let nextReviews = this.state.totalReviews.slice(idx, idx + 2);
      this.setState((prevState) => ({
        currentReviews,
        nextReviews
      }), () => console.log('state after getting 2 more reviews', this.state))
    } else {
      let idx = this.state.filteredCurrentReviews.length + 2;
      let filteredCurrentReviews = this.state.filteredTotalReviews.slice(0, idx);
      let filteredNextReviews = this.state.filteredTotalReviews.slice(idx, idx + 2);
      this.setState((prevState) => ({
        filteredCurrentReviews,
        filteredNextReviews
      }), () => console.log('state after getting 2 more reviews', this.state))
    }
  }

  increaseReviewHelpfulnesss = (reviewId) => {
    // console.log('got id', reviewId);
    return fetch (`http://localhost:3000/reviews/${reviewId}/helpful`, {
      method: 'PUT'
    })
    .then(() => {
      // console.log('REVIEW WAS HELPFUL')
      let newCurrentReviews = this.state.currentReviews.map((review) => {
        if (review.review_id === reviewId) {
          return {
            ...review,
            helpfulness: review.helpfulness  + 1
          }
        }
        return review;
      })
      // console.log('new current reviews', newCurrentReviews)
      this.setState((prevState) => {
        return {
          ...prevState,
          currentReviews: [...newCurrentReviews]
        }
      }, () => console.log('helpful state', this.state))
    })
    .catch((err) => {
      console.log('ERROR SUBMITTING HELPFULNESS', err)
    })
  }

  reportReview = (reviewId) => {
    return fetch (`http://localhost:3000/reviews/${reviewId}/report`, {
      method: 'PUT'
    })
    .then(() => {
      let endIdx = this.state.currentReviews.length;
      window.alert('REVIEW REPORTED. YOU WILL NO LONGER SEE THE REVIEW');
      // console.log('REVIEW REPORTED', endIdx);
      return this.getAllReviews(endIdx);
    })
    .catch((err) => {
      console.log('ERROR REPORTING REVIEW', err)
    })

  }

  componentDidMount () {
    this.getAllReviews();
  }

  render () {
    return (
      <div className='app'>
        <Overview productId={this.state.productId} avgRating={this.state.avgRating} noOfReviews={this.state.noOfReviews}/>
        <RelatedItems />
        <QAndA productId={this.state.productId}/>
        <ReviewsErrorBoundary>
          <Reviews
            totalReviews={this.state.totalReviews}
            currentReviews={this.state.currentReviews}
            nextReviews={this.state.nextReviews}
            filteredTotalReviews={this.state.filteredTotalReviews}
            filteredCurrentReviews={this.state.filteredCurrentReviews}
            filteredNextReviews={this.state.filteredNextReviews}
            selectedFilters={this.state.selectedFilters}
            noOfReviews={this.state.noOfReviews}
            avgRating={this.state.avgRating}
            reviewCriteria={this.state.reviewCriteria}
            removedAllFilters={this.state.removedAllFilters}
            increaseReviewHelpfulnesss={this.increaseReviewHelpfulnesss}
            reportReview={this.reportReview}
            get2Reviews={this.get2Reviews}
            sortReviews={this.sortReviews}
            filterReviews={this.filterReviews}
            removeFilters={this.removeFilters}
          />
        </ReviewsErrorBoundary>
      </div>
    );
  }
};

export default App;
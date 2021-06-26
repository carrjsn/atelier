import React from 'react';
import Reviews from '../reviews/reviews.jsx';
import Overview from '../productOverview/Overview.jsx';
import QAndA from '../qAndA/qAndA.jsx';
import RelatedItems from '../relatedItems/RelatedItems.jsx';
import {findAvgRating, sortByCriteria} from '../../../../helper/reviewsHelper.js';
import ReviewsErrorBoundary from '../errorBoundary/reviewsErrorBoundary.jsx';
import OverviewErrorBoundary from '../errorBoundary/overviewErrorBoundary.jsx'

export const BACKEND_URL = process.env.NODE_ENV === 'development' ? `http://localhost:3000` : `http://18.118.43.246`;

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      productId: '22161',
      productName: '',
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
      removedAllFilters: false,
      characteristics: [],
      searchedTotalReviews: [],
      searchedNextReviews: [],
      searchedCurrentReviews: [],
      filteredSearchedTotalReviews: [],
      filteredSearchedCurrentReviews: [],
      filteredSearchedNextReviews: [],
      helpfulReviews: [],
      searchTerm: ''
    };
  }

  onReviewsSearch = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase();
    // console.log('searchterm', searchTerm)
    if (searchTerm.length < 4) {
      this.setState((prevState) => ({
        searchedTotalReviews: [],
        searchedNextReviews: [],
        searchedCurrentReviews: [],
        filteredSearchedTotalReviews: [],
        filteredSearchedCurrentReviews: [],
        filteredSearchedNextReviews: [],
        searchTerm: ''
      }), () => console.log('state after searchTerm is less than 3', this.state))
      return;
    }

    if (this.state.filteredTotalReviews.length === 0) {
      let searchedTotalReviews = this.state.totalReviews.filter(({ summary, body, response, reviewer_name }) => summary.toLowerCase().includes(searchTerm) || body.toLowerCase().includes(searchTerm) || (!response ? ''.includes(searchTerm) : response.toLowerCase().includes(searchTerm)) || reviewer_name.toLowerCase().includes(searchTerm));
      // console.log('searchedTotal', searchedTotalReviews)
      let currentReviewsLength = this.state.currentReviews.length;
      let searchedCurrentReviews = searchedTotalReviews.slice(0, currentReviewsLength);
      let searchedNextReviews = searchedTotalReviews.slice(currentReviewsLength, currentReviewsLength + 2);

      this.setState((prevState) => {
        return {
          searchedTotalReviews,
          searchedCurrentReviews,
          searchedNextReviews,
          searchTerm
        }
      }, () => console.log('state after searching', this.state))
    } else {
      let searchedTotalReviews = this.state.totalReviews.filter(({ summary, body, response, reviewer_name }) => summary.toLowerCase().includes(searchTerm) || body.toLowerCase().includes(searchTerm) || (!response ? ''.includes(searchTerm) : response.toLowerCase().includes(searchTerm)) || reviewer_name.toLowerCase().includes(searchTerm));
      // console.log('searchedTotal', searchedTotalReviews)
      let currentReviewsLength = this.state.currentReviews.length;
      let searchedCurrentReviews = searchedTotalReviews.slice(0, currentReviewsLength);
      let searchedNextReviews = searchedTotalReviews.slice(currentReviewsLength, currentReviewsLength + 2);

      let filteredSearchedTotalReviews = this.state.filteredTotalReviews.filter(({ summary, body, response, reviewer_name }) => summary.toLowerCase().includes(searchTerm) || body.toLowerCase().includes(searchTerm) || (!response ? ''.includes(searchTerm) : response.toLowerCase().includes(searchTerm)) || reviewer_name.toLowerCase().includes(searchTerm));
      let filteredCurrentReviewsLength = this.state.filteredCurrentReviews.length;
      let filteredSearchedCurrentReviews = filteredSearchedTotalReviews.slice(0, filteredCurrentReviewsLength);
      let filteredSearchedNextReviews = filteredSearchedTotalReviews.slice(filteredCurrentReviewsLength, filteredCurrentReviewsLength + 2);

      this.setState((prevState) => {
        return {
          searchedTotalReviews,
          searchedCurrentReviews,
          searchedNextReviews,
          filteredSearchedTotalReviews,
          filteredSearchedCurrentReviews,
          filteredSearchedNextReviews,
          searchTerm
        }
      }, () => console.log('state after searching', this.state))
    }
  }

  removeFilters = () => {
    this.setState((prevState) => {
      return {
        filteredTotalReviews: [],
        filteredCurrentReviews: [],
        filteredNextReviews: [],
        filteredSearchedTotalReviews: [],
        filteredSearchedCurrentReviews: [],
        filteredSearchedNextReviews: [],
        selectedFilters: [],
        removedAllFilters: true
      }
    }, () => console.log('state after removing all filters', this.state))
  }

  filterReviews = (criteria, isSelected) => {
    //Currently no filters applied applied.
    if (this.state.filteredTotalReviews.length === 0) {

      let filteredSearchedTotalReviews = this.state.searchedTotalReviews.filter((review) => review.rating === criteria);
      let filteredSearchedCurrentReviewsLength = this.state.searchedCurrentReviews.length;
      let filteredSearchedCurrentReviews = filteredSearchedTotalReviews.slice(0, filteredSearchedCurrentReviewsLength);
      let filteredSearchedNextReviews = filteredSearchedTotalReviews.slice(filteredSearchedCurrentReviewsLength, filteredSearchedCurrentReviewsLength + 2);

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
          removedAllFilters: false,
          filteredSearchedTotalReviews,
          filteredSearchedCurrentReviews,
          filteredSearchedNextReviews
        }
      },() => console.log('state after adding a filter for the first time', this.state))
      //Filter has to applied
    } else if (isSelected) {
      let newFilteredReviews = this.state.totalReviews.filter((review) => review.rating === criteria);
      let unsortedFiteredTotalReviews = [...this.state.filteredTotalReviews, ...newFilteredReviews];
      let filteredTotalReviews = sortByCriteria(this.state.reviewCriteria, unsortedFiteredTotalReviews);
      let currentReviewsLength = this.state.filteredCurrentReviews.length;
      let filteredCurrentReviews = filteredTotalReviews.slice(0, currentReviewsLength);
      let filteredNextReviews = filteredTotalReviews.slice(currentReviewsLength, currentReviewsLength + 2);
      let selectedFilters = [...this.state.selectedFilters, criteria]

      let newFilteredSearchedReviews = this.state.searchedTotalReviews.filter((review) => review.rating === criteria);
      let unsortedFilteredSearchedReviews = [...this.state.filteredSearchedTotalReviews, ...newFilteredSearchedReviews];
      let filteredSearchedTotalReviews = sortByCriteria(this.state.reviewCriteria, unsortedFilteredSearchedReviews);
      let filteredSearchedCurrentReviewsLength = this.state.filteredSearchedCurrentReviews.length === 0 ? this.state.filteredCurrentReviews.length : this.state.filteredSearchedCurrentReviews.length;
      var filteredSearchedCurrentReviews = filteredSearchedTotalReviews.slice(0, filteredSearchedCurrentReviewsLength);
      var filteredSearchedNextReviews = filteredSearchedTotalReviews.slice(filteredSearchedCurrentReviewsLength, filteredSearchedCurrentReviewsLength + 2);

      this.setState((prevState) => {
        return {
          filteredTotalReviews,
          filteredCurrentReviews,
          filteredNextReviews,
          selectedFilters,
          filteredSearchedTotalReviews,
          filteredSearchedCurrentReviews,
          filteredSearchedNextReviews
        }
      }, () => console.log('state after adding a filter', this.state))
      //Filter has to be removed but it is not the last filter
    } else if (this.state.selectedFilters.length > 1) {
      let filteredTotalReviews = this.state.filteredTotalReviews.filter((review) => review.rating !== criteria);
      let currentReviewsLength = this.state.filteredCurrentReviews.length;
      let filteredCurrentReviews = filteredTotalReviews.slice(0, currentReviewsLength);
      let filteredNextReviews = filteredTotalReviews.slice(currentReviewsLength, currentReviewsLength + 2);

      let filteredSearchedTotalReviews = this.state.filteredSearchedTotalReviews.filter((review) => review.rating !== criteria);
      let searchedCurrentReviewsLength = this.state.filteredSearchedCurrentReviews.length;
      let filteredSearchedCurrentReviews = filteredSearchedTotalReviews.slice(0, searchedCurrentReviewsLength);
      let filteredSearchedNextReviews = filteredSearchedTotalReviews.slice(searchedCurrentReviewsLength, searchedCurrentReviewsLength + 2);

      let selectedFilters = this.state.selectedFilters.filter((star) => star !== criteria);

      this.setState((prevState) => {
        return {
          filteredTotalReviews,
          filteredCurrentReviews,
          filteredNextReviews,
          filteredSearchedTotalReviews,
          filteredSearchedCurrentReviews,
          filteredSearchedNextReviews,
          selectedFilters
        }
      }, () => console.log('state after removing a filter', this.state))
      //Last fiiler has to be removed. So display the currentReviews before the first filter was applied
    } else {
      this.setState((prevState) => {
        return {
          filteredTotalReviews: [],
          filteredCurrentReviews: [],
          filteredNextReviews: [],
          filteredSearchedTotalReviews: [],
          filteredSearchedCurrentReviews: [],
          filteredSearchedNextReviews: [],
          selectedFilters: []
        }
      }, () => console.log('state after removing the last filter', this.state))
    }
  }

  sortReviews = (criteria) => {
    if (this.state.searchedTotalReviews.length > 0) {
      let searchedTotalReviews = sortByCriteria(criteria, this.state.searchedTotalReviews.slice());
      let searchedCurrentReviews = searchedTotalReviews.slice(0, 2);
      let searchedNextReviews = searchedTotalReviews.slice(2, 4);
      let totalReviews = sortByCriteria(criteria, this.state.totalReviews.slice());
      let currentReviews = totalReviews.slice(0, 2);
      let nextReviews = totalReviews.slice(2, 4);
      let filteredTotalReviews = sortByCriteria(criteria, this.state.filteredTotalReviews);
      let filteredCurrentReviews = filteredTotalReviews.slice(0, 2);
      let filteredNextReviews = filteredTotalReviews.slice(2, 4);
      let filteredSearchedTotalReviews = sortByCriteria(criteria, this.state.filteredSearchedTotalReviews.slice());
      let filteredSearchedCurrentReviews = filteredSearchedTotalReviews.slice(0, 2);
      let filteredSearchedNextReviews = filteredSearchedTotalReviews.slice(2, 4);
      this.setState((prevState) => ({
        searchedTotalReviews,
        searchedCurrentReviews,
        searchedNextReviews,
        totalReviews,
        currentReviews,
        nextReviews,
        filteredTotalReviews,
        filteredCurrentReviews,
        filteredNextReviews,
        filteredSearchedTotalReviews,
        filteredSearchedCurrentReviews,
        filteredSearchedNextReviews,
        reviewCriteria: criteria
      }), () => console.log('state after sorting searched reviews', this.state))
    } else if (this.state.filteredTotalReviews.length === 0) {
      let totalReviews = sortByCriteria(criteria, this.state.totalReviews.slice());
      let currentReviews = totalReviews.slice(0, 2);
      let nextReviews = totalReviews.slice(2, 4);
      this.setState((prevState) => ({
        totalReviews,
        currentReviews,
        nextReviews,
        reviewCriteria: criteria
      }), () => console.log(`state sorted by ${criteria}`, this.state))
    } else {
      let totalReviews = sortByCriteria(criteria, this.state.totalReviews.slice());
      let currentReviews = totalReviews.slice(0, 2);
      let nextReviews = totalReviews.slice(2, 4);
      let filteredTotalReviews = sortByCriteria(criteria, this.state.filteredTotalReviews);
      let filteredCurrentReviews = filteredTotalReviews.slice(0, 2);
      let filteredNextReviews = filteredTotalReviews.slice(2, 4)
      this.setState((prevState) => ({
        totalReviews,
        currentReviews,
        nextReviews,
        filteredTotalReviews,
        filteredCurrentReviews,
        filteredNextReviews,
        reviewCriteria: criteria
      }), () => console.log(`state sorted by ${criteria}`, this.state))
    }
  }

  getAllReviews = (endIdx = 2) => {
    // console.log('process env', process.env.NODE_ENV)
    let reviewsUrl = `${BACKEND_URL}/allReviews?productId=${this.state.productId}`;

    return fetch(reviewsUrl)
    .then((resp) => resp.json())
    .then((allReviews) => {
      // console.log('all reviews', allReviews)
      let avgRating = findAvgRating(allReviews);
      let totalReviews = sortByCriteria(this.state.reviewCriteria, allReviews)
      let helpfulReviews = JSON.parse(window.localStorage.getItem('helpfulReviews'));

      this.setState({
        totalReviews,
        noOfReviews: totalReviews.length,
        avgRating,
        currentReviews: totalReviews.slice(0, endIdx),
        nextReviews: totalReviews.slice(endIdx, endIdx + 2),
        helpfulReviews: helpfulReviews === null ? [] : helpfulReviews
      }, () => console.log('state after fetching all reviews', this.state))
    })
    .catch((err) => {
      console.log('ERROR GETTING ALL REVIEWS', err);
    })
  }

  get2Reviews = () => {
    if (this.state.filteredSearchedTotalReviews.length > 0) {
      let idx = this.state.filteredSearchedCurrentReviews.length + 2;
      let filteredSearchedCurrentReviews = this.state.filteredSearchedTotalReviews.slice(0, idx);
      let filteredSearchedNextReviews = this.state.filteredSearchedTotalReviews.slice(idx, idx + 2);
      this.setState((prevState) => ({
        filteredSearchedCurrentReviews,
        filteredSearchedNextReviews
      }), () => console.log('state after getting 2 more filtered searched reviews', this.state) )
    } else if (this.state.searchedTotalReviews.length > 0) {
      let idx = this.state.searchedCurrentReviews.length + 2;
      let searchedCurrentReviews = this.state.searchedTotalReviews.slice(0, idx);
      let searchedNextReviews = this.state.searchedTotalReviews.slice(idx, idx + 2);
      this.setState((prevState) => ({
        searchedCurrentReviews,
        searchedNextReviews
      }), () => console.log('state after getting 2 more searched reviews', this.state) )
    } else if (this.state.filteredTotalReviews.length === 0) {
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
      }), () => console.log('state after getting 2 more filtered reviews', this.state))
    }
  }

  increaseReviewHelpfulnesss = (reviewId) => {
    // console.log('got id', reviewId);
    return fetch (`${BACKEND_URL}/reviews/${reviewId}/helpful`, {
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
        let newHelpfulReviews = [...prevState.helpfulReviews, reviewId];
        window.localStorage.setItem('helpfulReviews', JSON.stringify(newHelpfulReviews));
        return {
          ...prevState,
          currentReviews: [...newCurrentReviews],
          helpfulReviews: newHelpfulReviews
        }
      }, () => console.log('helpful state', this.state))
    })
    .catch((err) => {
      console.log('ERROR SUBMITTING HELPFULNESS', err)
    })
  }

  reportReview = (reviewId) => {
    return fetch (`${BACKEND_URL}/reviews/${reviewId}/report`, {
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

  getCharacteristics = () => {
    return fetch (`${BACKEND_URL}/reviewsMeta?productId=${this.state.productId}`)
    .then((resp) => resp.json())
    .then((characteristics) => {
      // console.log('server characteristics', characteristics)
      this.setState({ characteristics: [...characteristics] }, () => console.log('state after getting characteristics', this.state));
    })
    .catch((err) => {
      console.log('ERROR GETTING CHARACTERISTICS', err)
    });
  }

  getProductInfo = () => {
    return fetch(`${BACKEND_URL}/productInfo?productId=${this.state.productId}`)
    .then((resp) => resp.json())
    .then(({ name }) => {
      this.setState({ productName: name }, () => console.log('state after getting pdt info', this.state));
    })
    .catch(() => {
      console.log('Error fetching product info from server');
    });
  }

  componentDidMount () {
    this.getAllReviews()
      .then(this.getCharacteristics)
      .then(this.getProductInfo);
  }

  render () {
    return (
      <div className='app'>
        <div className='nav'><h1>Atelier</h1></div>
        <OverviewErrorBoundary>
          <Overview productId={this.state.productId} avgRating={this.state.avgRating} noOfReviews={this.state.noOfReviews}/>
        </OverviewErrorBoundary>
        <RelatedItems />
        <QAndA productId={this.state.productId}/>
        <ReviewsErrorBoundary>
          <Reviews
            productId={this.state.productId}
            productName={this.state.productName}
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
            characteristics={this.state.characteristics}
            searchedTotalReviews={this.state.searchedTotalReviews}
            searchedCurrentReviews={this.state.searchedCurrentReviews}
            searchedNextReviews={this.state.searchedNextReviews}
            filteredSearchedTotalReviews={this.state.filteredSearchedTotalReviews}
            filteredSearchedCurrentReviews={this.state.filteredSearchedCurrentReviews}
            filteredSearchedNextReviews={this.state.filteredSearchedNextReviews}
            helpfulReviews={this.state.helpfulReviews}
            searchTerm={this.state.searchTerm}
            increaseReviewHelpfulnesss={this.increaseReviewHelpfulnesss}
            reportReview={this.reportReview}
            get2Reviews={this.get2Reviews}
            sortReviews={this.sortReviews}
            filterReviews={this.filterReviews}
            removeFilters={this.removeFilters}
            onReviewsSearch={this.onReviewsSearch}
          />
        </ReviewsErrorBoundary>
      </div>
    );
  }
};

export default App;
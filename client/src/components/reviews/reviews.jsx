import React from 'react';
import RatingBreakdown from './ratingBreakdown.jsx';
import PdtBreakdown from './pdtBreakdown.jsx';
import ReviewsList from './reviewsList.jsx';
import Search from './search.jsx';
import AddReview from './addReview.jsx';
import MoreReviews from './moreReviews.jsx';
import Sort from './sort.jsx';
import WithTracking from '../hoc/withTracking.jsx';

export class Reviews extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let reviewsList = <ReviewsList
                        reviews={
                          this.props.searchTerm.length >= 3 && this.props.selectedFilters.length > 0 ? this.props.filteredSearchedCurrentReviews :
                          (this.props.searchTerm.length >=3 && this.props.selectedFilters.length === 0 ? this.props.searchedCurrentReviews :
                            (this.props.searchTerm.length < 3 && this.props.selectedFilters.length > 0 ? this.props.filteredCurrentReviews :
                              (this.props.currentReviews)
                            )
                          )
                        }
                        searchTerm={this.props.searchTerm}
                        increaseReviewHelpfulnesss={this.props.increaseReviewHelpfulnesss}
                        reportReview={this.props.reportReview}
                        helpfulReviews={this.props.helpfulReviews}
                      />
    let addReviews = <AddReview productId={this.props.productId} productName={this.props.productName} characteristics={this.props.characteristics} />

    return (
      <div className='reviews' id='reviews' onClick={(e) => this.props.onWrappedComponentClick(e)}>
        <h4>RATINGS & REVIEWS</h4>
        <div className='reviews-body'>
          <div className='reviews-breakdown'>
            <RatingBreakdown
              totalReviews={this.props.totalReviews}
              noOfReviews={this.props.noOfReviews}
              avgRating={this.props.avgRating}
              filterReviews={this.props.filterReviews}
              selectedFilters={this.props.selectedFilters}
              removeFilters={this.props.removeFilters}
              removedAllFilters={this.props.removedAllFilters}
            />

            <PdtBreakdown characteristics={this.props.characteristics}/>
          </div>

          <div className='reviews-main'>
            <Sort
              sortReviews={this.props.sortReviews}
              reviewCriteria={this.props.reviewCriteria}
              searchTerm={this.props.searchTerm}
              selectedFilters={this.props.selectedFilters}
              noOfReviews={this.props.noOfReviews}
              noOfFilteredTotalReviews={this.props.filteredTotalReviews.length}
              noOfSearchedTotalReviews={this.props.searchedTotalReviews.length}
              noOfFilteredSearchedTotalReviews={this.props.filteredSearchedTotalReviews.length}
            />

            <Search onReviewsSearch={this.props.onReviewsSearch} productId={this.props.productId}/>

            {
              this.props.searchTerm.length >=3 && this.props.selectedFilters.length > 0 ? (this.props.filteredSearchedCurrentReviews.length === 0 ? null : reviewsList) :
                (
                  this.props.searchTerm.length >=3 && this.props.selectedFilters.length === 0 ? (this.props.searchedCurrentReviews.length === 0 ? null : reviewsList) :
                  (this.props.searchTerm.length < 3 && this.props.selectedFilters.length > 0 ? (this.props.filteredCurrentReviews.length === 0 ? null : reviewsList) :
                    this.props.currentReviews.length === 0 ? null : reviewsList
                  )
                )
            }


            <div className='reviews-btns'>
              {
                this.props.searchTerm.length >=3 && this.props.selectedFilters.length > 0 ? (this.props.filteredSearchedNextReviews.length > 0 ?  <MoreReviews get2Reviews={this.props.get2Reviews}/> : null) :
                  (this.props.searchTerm.length >=3 && this.props.selectedFilters.length === 0 ? (this.props.searchedNextReviews.length > 0 ? <MoreReviews get2Reviews={this.props.get2Reviews}/> : null) :
                    (this.props.searchTerm.length < 3 && this.props.selectedFilters.length > 0 ? (this.props.filteredNextReviews.length > 0 ? <MoreReviews get2Reviews={this.props.get2Reviews}/> : null) :
                      (this.props.nextReviews.length > 0 ? <MoreReviews get2Reviews={this.props.get2Reviews}/> : null)
                    )
                  )
              }
              {addReviews}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ReviewsWithTracking = WithTracking(Reviews, 'reviews');
export default ReviewsWithTracking;
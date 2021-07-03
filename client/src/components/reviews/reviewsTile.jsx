import React from 'react';
import Stars from '../stars/stars.jsx';
import Modal from './modal.jsx';
import CheckCircle from './checkCircle.jsx';
import Response from './response.jsx';

let getHighlightedText = (text, highlight) => {
  if (highlight === '') {
    return <span>{text}</span>
  }
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, idx) => part.toLowerCase() === highlight.toLowerCase() ? <mark key={idx}>{part}</mark> : part)}
    </span>
  );
}

class ReviewsTile extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      showModal: false,
      url: '',
      expandedBody: false
    }
  }

  handleExpandBodyClick = (e) => {
    this.setState((prevState) => ({
      expandedBody: true
    }))
  }

  displayModal = (url) => {
    this.setState({
      showModal: true,
      url
    })
  }

  hideModal = () => {
    this.setState({showModal: false})
  }

  handleYesClick = () => {
    if (this.props.helpfulReviews.indexOf(this.props.review.review_id) > -1) {
      window.alert('YOU HAVE ALREADY MARKED THIS REVIEW HElPFUL.')
      return;
    }
    this.props.increaseReviewHelpfulnesss(this.props.review.review_id);
  }

  handleReportClick = () => {
    this.props.reportReview(this.props.review.review_id);
  }

  render () {
    let {review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos } = this.props.review;
    // console.log('date', new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), photos);

    if (body.length > 250) {
      var shortBody = body.slice(0, 250);
    } else {
      var shortBody = body;
    }

    return (
      <div className='reviews-tile'>
        <div className='reviews-tile-stars-date'>
          <div className='reviews-tile-stars'> <Stars size={18} rating={rating}/> </div>
          <div className='reviews-tile-usernameDate'>
            { getHighlightedText(reviewer_name, this.props.searchTerm) }, { new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }
          </div>
        </div>

        <div className='reviews-tile-summary'> {getHighlightedText(summary, this.props.searchTerm) } </div>

        <div className='reviews-tile-body'>
          <div className='reviews-tile-body-short'>
            {this.state.expandedBody ? getHighlightedText(body, this.props.searchTerm) : getHighlightedText(shortBody, this.props.searchTerm)}
          </div>
          {
            ((body.length > 250) && (!this.state.expandedBody)) ?
            <div className='reviews-tile-body-expand' onClick={this.handleExpandBodyClick}> SHOW MORE </div> :
            null
          }
          <div className='reviews-tile-body-images'>
            {
              photos.length === 0 ? null :
                photos.map((photo) => <img key={photo.id} alt='Product mage by user' src={photo.url} height='60px' width='60px' onClick={() => this.displayModal(photo.url)} style={{cursor: 'pointer'}}/>)
            }
          </div>
          {
            this.state.showModal ? <Modal url={this.state.url} hideModal={this.hideModal}/> : null
          }
        </div>

        {recommend ? <div> <CheckCircle /> I RECOMMEND THIS PDT </div> : null}

        {response ? <Response response={response}/> : null}

        <div className='reviews-tile-actions'>
          <p>WAS THIS REVIEW HELPFUL?
          <span className='reviews-tile-helpfulness' onClick={this.handleYesClick}> YES </span> ( <span className='reviews-tile-helpful-count'> {helpfulness} </span>) OR
          <span> NO </span> (#) |
          <span className='reviews-tile-helpfulness' onClick={this.handleReportClick}> REPORT </span>
          </p>
        </div>
      </div>
    );
  }
};

export default ReviewsTile;
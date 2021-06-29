import React from 'react';

class Sort extends React.Component {
  constructor (props) {
    super(props);
  }

  handleSortChange = (e) => {
    this.props.sortReviews(e.target.value)
  }

  render () {
    return (
      <div className='reviews-sort'>
        <label htmlFor='sortSelect'>
          {
            this.props.searchTerm.length >= 3 && this.props.selectedFilters.length > 0 ? this.props.noOfFilteredSearchedTotalReviews :
            (this.props.searchTerm.length >=3 && this.props.selectedFilters.length === 0 ? this.props.noOfSearchedTotalReviews :
              (this.props.searchTerm.length < 3 && this.props.selectedFilters.length > 0 ? this.props.noOfFilteredTotalReviews :
                (this.props.noOfReviews)
              )
            )
          } reviews, sorted by
        </label>
        <select id='sortSelect' className='reviews-sort-select' value={this.props.reviewCriteria} onChange={this.handleSortChange}>
          <option value='relevant'> Relevant </option>
          <option value='helpful'> Helpful </option>
          <option value='newest'> Newest </option>
        </select>
      </div>
    );
  }

};

export default Sort;
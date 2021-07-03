import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
  }

  handleChange = (e) => {
    console.log('e', e.target.value)
    // this.props.onReviewsSearch(e.target.value);
    this.setState((prevState) => ({
      searchTerm: e.target.value
    }), () => this.props.onReviewsSearch(this.state.searchTerm))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productId !== this.props.productId) {
      this.setState((prevState) => ({
        searchTerm: ''
      }), () => console.log('reviews search component update after changing pdt', this.state))
    }
  }

  render () {
    return (
      <div className='reviews-search'>
        <input type='search' value={this.state.searchTerm} name='reviews-search' id='reviews-search' placeholder='SEARCH HERE' onChange={this.handleChange} />
      </div>
    );
  }
};

export default Search;
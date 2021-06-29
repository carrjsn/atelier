import React from 'react';

const Search = ({ onReviewsSearch }) => {

  return (
    <div className='reviews-search'>
      <input type='search' name='reviews-search' id='reviews-search' placeholder='SEARCH HERE' onChange={(e) => onReviewsSearch(e.target.value)} />
    </div>
  );
};

export default Search;
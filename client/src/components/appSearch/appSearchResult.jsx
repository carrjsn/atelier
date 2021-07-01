import React from 'react';

const AppSearchResult = ({ name, id, handlePdtChange }) => {
  return (
    <div className='app-search-result' onClick={() => handlePdtChange(String(id))}>
      {name}
    </div>
  )
};

export default AppSearchResult;
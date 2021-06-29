import React from 'react';

const Response = ({ response }) => {
  return (
    <div className='reviews-tile-response'>
      <div className='reviews-tile-response-main'>
        <p className='heading'> Response from seller: </p>
        <p> {response} </p>
      </div>

    </div>
  )
}

export default Response;
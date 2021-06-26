import React from 'react';

const SloganDescription = (props) => (
  <div className='slogan-description'>
    <h3 className='product-slogan'>{props.product.slogan}</h3>
    <div className='product-description'>{props.product.description}</div>
  </div>
);

export default SloganDescription;
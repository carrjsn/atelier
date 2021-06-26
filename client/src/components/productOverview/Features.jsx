import React from 'react';

const Features = (props) => {
  // add checkmark and feature for each product feature
  if (!props.product.features) {
    return null;
  }

  return (
    <div className='features'>
      <ul>
      {props.product.features.map((item, idx) => {
         let val = item.value ? ': ' + item.value : null;
         return <li key={idx}>  {item.feature}{val}</li>}
      )}
      </ul>
    </div>
  )
};

export default Features;
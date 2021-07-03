import React from 'react';

const Features = (props) => {
  // add checkmark and feature for each product feature
  if (!props.product.features) {
    return null;
  }

  // remove duplicates
  let features = [];
  let filtered = [];
  props.product.features.forEach(item => {
    if (!features.includes(item.feature)) {
      filtered.push(item);
      features.push(item.feature);
    }

  });

  return (
    <div className='features'>
      <ul>
      {filtered.map((item, idx) => {
         let val = item.value ? ': ' + item.value : null;
         return <li key={idx}> <b> {item.feature}</b>{val}</li>}
      )}
      </ul>
    </div>
  )
};

export default Features;
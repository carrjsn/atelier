import React from 'react';

const CharacteristicBar = ({ label, value }) => {
  if (label === 'Comfort' || label === 'Quality') {
    var poor = 'Poor';
    var avg = 'Average';
    var great = 'Great';
  } else {
    var poor = 'Too small';
    var avg = 'Perfect';
    var great = 'Too big';
  }

  return (
    <div className='characteristic-bar'>
      <div className='characteristic-bar-container'>
        <label htmlFor={`${label}range`}>{label}</label>
        <input id={`${label}range`} name='range' className='characteristic-range' type='range' min='0' max='5' value={value} step='0.1' readOnly/>
      </div>
      <div className='range-meaning'>
        <div> {poor} </div>
        <div> {avg} </div>
        <div> {great} </div>
      </div>
    </div>
  );
};

export default CharacteristicBar;
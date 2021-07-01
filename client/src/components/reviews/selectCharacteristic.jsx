import React from 'react';

const SelectCharacteristic = ({ characteristics, characteristicName, characteristicId, selectedValue, onCharacteristicChange }) => {
  let characteristicTable = {};
  let sizeMeaning = ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'];
  let widthMeaning = ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
  let comfortMeaning = ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
  let qualityMeaning = ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
  let lengthMeaning = ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
  let fitMeaning = ['Tight', 'Slightly tight', 'Perfect', 'Slightly loose', 'Loose'];

  characteristicTable['Size'] = sizeMeaning;
  characteristicTable['Width'] = widthMeaning;
  characteristicTable['Comfort'] = comfortMeaning;
  characteristicTable['Quality'] = qualityMeaning;
  characteristicTable['Fit'] = fitMeaning;
  characteristicTable['Length'] = lengthMeaning;

  // console.log('TABLE', characteristicTable)
  let currentCharacteristic = characteristicTable[characteristicName];
  // console.log('CHECK', characteristics[characteristicId])
  return  (
    <div className='characteristic'>
      {characteristicName} : {currentCharacteristic[Number(characteristics[characteristicId]) - 1] || 'none selected'}
      <div className='radios' onClick={(e) => onCharacteristicChange(e, characteristicId)}>
        <div className='radio'>
          <input type='radio' name={characteristicName} id={`${characteristicId}-one`} value='1'/>
          <label htmlFor={`${characteristicId}-one`}> {currentCharacteristic[0]}  </label>
        </div>

        <div className='radio'>
          <input type='radio' name={characteristicName} id={`${characteristicId}-two`}value='2'/>
          <label htmlFor={`${characteristicId}-two`}> {currentCharacteristic[1]} </label>
        </div>

        <div className='radio'>
          <input type='radio' name={characteristicName} id={`${characteristicId}-three`} value='3'/>
          <label htmlFor={`${characteristicId}-three`}> {currentCharacteristic[2]} </label>
        </div>

        <div className='radio'>
          <input type='radio' name={characteristicName} id={`${characteristicId}-four`} value='4'/>
          <label htmlFor={`${characteristicId}-four`}> {currentCharacteristic[3]}</label>
        </div>

        <div className='radio'>
          <input type='radio' name={characteristicName} id={`${characteristicId}-five`} value='5'/>
          <label htmlFor={`${characteristicId}-five`}> {currentCharacteristic[4]} </label>
        </div>
      </div>
    </div>
  );
}

export default SelectCharacteristic;
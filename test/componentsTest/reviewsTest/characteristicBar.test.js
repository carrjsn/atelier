import React from 'react';
import { shallow } from 'enzyme';
import CharacteristicBar from '../../../client/src/components/reviews/characteristicBar.jsx';

describe ('Bar', () => {
  const wrapper = shallow(<CharacteristicBar />);

  it ('checks if the component exists', () => {
    expect(wrapper.find('.characteristic-bar').exists()).toBe(true);
  });

  it('should have 3 children', () => {
    expect(wrapper.find('.characteristic-bar').children().length).toBe(2)
  });
});
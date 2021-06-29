import React from 'react';
import { shallow } from 'enzyme';
import ReviewsList from '../../../client/src/components/reviews/reviewsList.jsx';

describe ('Reviews List', () => {
  const wrapper = shallow(<ReviewsList reviews={[1]}/>);

  it ('checks if the component exists', () => {
    expect(wrapper.exists('.reviews-list')).toBe(true);
  });

  it('checks that List component is rendering children', () => {
    expect(wrapper.children()).toHaveLength(1);
  });

  it ('should display the correct number of review tiles', () => {
    let reviews = [1, 2, 3];
    wrapper.setProps({ reviews });
    let list = wrapper.children()
    expect(list.length).toBe(3);
  })
});
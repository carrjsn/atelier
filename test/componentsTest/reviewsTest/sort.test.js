import React from 'react';
import { shallow } from 'enzyme';
import Sort from '../../../client/src/components/reviews/sort.jsx';

describe ('Sort Dropdown', () => {
  const wrapper = shallow(<Sort selectedFilters={[1]} searchTerm='a'/>);

  it ('checks if the component exists', () => {
    expect(wrapper.exists('.reviews-sort')).toBe(true);
  });

  it('checks that Sort component is rendering children', () => {
    expect(wrapper.children()).toHaveLength(2);
  });

  it ('should display the correct criteria value', () => {
    wrapper.setProps({reviewCriteria: 'helpful'});
    expect(wrapper.find('select').props().value).toBe('helpful')
  })
});
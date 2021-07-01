import React from 'react';
import { shallow } from 'enzyme';
import SloganDescription from '../../../client/src/components/productOverview/SloganDescription.jsx';


const dummyProduct1 = {
  id: 22122,
  campus: 'hr-rpp',
  name: 'Camo Onesie',
  slogan: 'Blend in to your crowd',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  category: 'Jackets',
  default_price: '140.00',
  features: [
    { feature: 'Fabric', value: 'Canvas' },
    { feature: 'Buttons', value: 'Brass' }
  ]
}

describe('SloganDescription', () => {
  const wrapper = shallow(<SloganDescription product={dummyProduct1}/>)

  it('checks that component exists', () => {
    expect(wrapper.exists('.slogan-description')).toBe(true);
  });

  it('should render a slogan and a description', () => {
    expect(wrapper.text()).toContain('Blend in to your crowd');
    expect(wrapper.text()).toContain('The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.');
    expect(wrapper.exists('.product-slogan')).toBe(true);
    expect(wrapper.exists('.product-description')).toBe(true);
  });

});


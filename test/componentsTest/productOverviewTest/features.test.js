import React from 'react';
import { shallow } from 'enzyme';
import Features from '../../../client/src/components/productOverview/Features.jsx';

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

const dummyProduct2 = {
  id: 22122,
  campus: 'hr-rpp',
  name: 'Camo Onesie',
  slogan: 'Blend in to your crowd',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  category: 'Jackets',
  default_price: '140.00',
  features: [
    { feature: 'Fabric' },
    { feature: 'Buttons', value: 'Brass' },
    { feature: 'Stuff'}
  ]
}


describe('Features', () => {
  const wrapper = shallow(<Features product={dummyProduct1}/>)

  it('checks that component exists', () => {
    const wrapper = shallow(<Features product={dummyProduct1}/>)
    expect(wrapper.exists('.features')).toBe(true);
  });

  it('should render a feature and a value when both are available', () => {
    const wrapper = shallow(<Features product={dummyProduct1}/>)
    expect(wrapper.text()).toContain('Fabric');
    expect(wrapper.text()).toContain('Canvas');
  });

  it('should still render a feature when a value is not given', () => {
    const wrapper = shallow(<Features product={dummyProduct2}/>)
    expect(wrapper.find('.features ul').children()).toHaveLength(3);
    expect(wrapper.find('.features ul').text()).toContain('Stuff');
  });


});
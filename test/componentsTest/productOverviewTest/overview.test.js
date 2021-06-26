import React from 'react';
import { shallow } from 'enzyme';
import { Overview } from '../../../client/src/components/productOverview/Overview.jsx';
import ImageGallery from '../../../client/src/components/productOverview/ImageGallery.jsx';
import StyleSelector from '../../../client/src/components/productOverview/StyleSelector.jsx';
import Cart from '../../../client/src/components/productOverview/Cart.jsx';
import ProductInfo from '../../../client/src/components/productOverview/ProductInfo.jsx';

describe ('Product Overview Widget', () => {
  const wrapper = shallow(<Overview/>, {disableLifecycleMethods: true});

  it ('checks that component exists', () => {
    expect(wrapper.exists('.overview')).toBe(true);
  });

  it ('should render only the image gallery component when in expanded view', () => {
    wrapper.setState({ expandedView: true });
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.exists(ImageGallery)).toBe(true);
    expect(wrapper.exists(ProductInfo)).toBe(false);
    expect(wrapper.exists(StyleSelector)).toBe(false);
    expect(wrapper.exists(Cart)).toBe(false);
  });

  it ('should render all subcomponents when in default view', () => {
    wrapper.setState({ expandedView: false });
    expect(wrapper.children()).toHaveLength(5);
    expect(wrapper.exists(ImageGallery)).toBe(true);
    expect(wrapper.exists(ProductInfo)).toBe(true);
    expect(wrapper.exists(StyleSelector)).toBe(true);
    expect(wrapper.exists(Cart)).toBe(true);
  });

  // test overview methods

  // toggle expanded view
  //...

});

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Overview } from '../../../client/src/components/productOverview/Overview.jsx';
import ImageGallery from '../../../client/src/components/productOverview/ImageGallery.jsx';
import StyleSelector from '../../../client/src/components/productOverview/StyleSelector.jsx';
import Cart from '../../../client/src/components/productOverview/Cart.jsx';
import ProductInfo from '../../../client/src/components/productOverview/ProductInfo.jsx';
import Features from '../../../client/src/components/productOverview/Features.jsx';
import SloganDescription from '../../../client/src/components/productOverview/SloganDescription.jsx';


const currProduct1 = {
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

const currStyle = {
  "style_id": 1,
  "name": "Forest Green & Black",
  "original_price": "140",
  "sale_price": "0",
  "default?": true,
  "photos": [
    {
      "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
      "url": "urlplaceholder/style_1_photo_number.jpg"
    }
  ],
}

const styles = [
  {
    "style_id": 1,
    "name": "Forest Green & Black",
    "original_price": "140",
    "sale_price": "0",
    "default?": true,
    "photos": [
      {
        "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
        "url": "urlplaceholder/style_1_photo_number.jpg"
      }
    ],
  },
  {
    "style_id": 2,
    "name": "Blue",
    "original_price": "80",
    "sale_price": "0",
    "default?": true,
    "photos": [
      {
        "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
        "url": "urlplaceholder/style_2_photo_number.jpg"
      }
    ],
  }
]



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
    expect(wrapper.exists(Features)).toBe(true);
    expect(wrapper.exists(SloganDescription)).toBe(true);
  });

});



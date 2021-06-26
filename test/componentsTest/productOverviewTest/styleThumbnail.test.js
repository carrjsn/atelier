import React from 'react';
import { shallow } from 'enzyme';
import StyleThumbnail from '../../../client/src/components/productOverview/StyleThumbnail.jsx';


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
  }

]

const currStyle = {
  style_id: 111
}

describe('Style Thumbnail', () => {

  it('checks that component exists', () => {
    const wrapper = shallow(<StyleThumbnail updateStyle={() => {}} currentStyle={currStyle} id={111}/>);
    expect(wrapper.exists('.style-thumbnail')).toBe(true);
  });

  it('checks that thumbnail is given the correct classname if it matches the currently displayed image', () => {
    const wrapper = shallow(<StyleThumbnail updateStyle={() => {}} currentStyle={currStyle} id={111}/>);
    expect(wrapper.find('.current-style-selection')).toHaveLength(1);
    expect(wrapper.find('.non-current-style')).toHaveLength(0);
  });

  it('checks that thumbnail is given correct classname if it does not match the currently displayed image', () => {
    const wrapper = shallow(<StyleThumbnail updateStyle={() => {}} currentStyle={currStyle} id={222}/>);
    expect(wrapper.find('.current-style-selection')).toHaveLength(0);
    expect(wrapper.find('.non-current-style')).toHaveLength(1);
  });

});


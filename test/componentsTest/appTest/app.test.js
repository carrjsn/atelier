import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../../../client/src/components/app/app.jsx';

test('checks that app component is rendering', () => {
  const wrapper = shallow(<App />, {disableLifecycleMethods: true})
  expect(wrapper.children()).toHaveLength(2);
});
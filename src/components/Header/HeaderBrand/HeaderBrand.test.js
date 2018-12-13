import React from 'react';
import { shallow } from 'enzyme';
import HeaderBrand from './HeaderBrand';

describe('HeaderBrand', () => {
  it('should render HeaderBrand correctly', () => {
    const wrapper = shallow(<HeaderBrand />);

    expect(wrapper).toMatchSnapshot();
  });
});

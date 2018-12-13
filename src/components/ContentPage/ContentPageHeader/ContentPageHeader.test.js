import React from 'react';
import { shallow } from 'enzyme';
import ContentPageHeader from './ContentPageHeader';

describe('ContentPageHeader', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ContentPageHeader title="Page title" subtitle="Page subtitle" />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render title and subtitle', () => {
    expect(wrapper.find('.blog-content-page__title').text()).toEqual('Page title');
    expect(wrapper.find('.blog-content-page__subtitle').text()).toEqual('Page subtitle');
  });
});

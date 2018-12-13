import React from 'react';
import { shallow } from 'enzyme';
import ContentPageContent from './ContentPageContent';

const childComponent = <div id="id-content">Child Component</div>;
let wrapper;

beforeEach(() => {
  wrapper = shallow(<ContentPageContent>{childComponent}</ContentPageContent>);
});
describe('ContentPageContent', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render child component', () => {
    expect(wrapper.find('#id-content').length).toBe(1);
  });
});

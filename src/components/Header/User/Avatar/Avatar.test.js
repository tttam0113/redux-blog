import React from 'react';
import { shallow } from 'enzyme';
import Avatar from './Avatar';

let wrapper;
let onClickSpy;

beforeEach(() => {
  onClickSpy = jest.fn();
  wrapper = shallow(<Avatar avatar="Avatar image" displayName="tester" onClick={onClickSpy} />);
});

it('should render Avatar correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should call onClick when click on avatar', () => {
  wrapper.simulate('click');

  expect(onClickSpy).toHaveBeenCalled();
});

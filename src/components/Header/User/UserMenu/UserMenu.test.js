import React from 'react';
import { shallow } from 'enzyme';
import UserMenu from './UserMenu';

let wrapper;
let createNewPostSpy;
let onLogoutSpy;

beforeEach(() => {
  createNewPostSpy = jest.fn();
  onLogoutSpy = jest.fn();
  wrapper = shallow(
    <UserMenu displayName="tester" createNewPost={createNewPostSpy} onLogout={onLogoutSpy} />,
  );
});

it('should render UserMenu correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// it('should call onClick when click on avatar', () => {
//   wrapper.simulate('click');

//   expect(onLogoutSpy).toHaveBeenCalled();
// });

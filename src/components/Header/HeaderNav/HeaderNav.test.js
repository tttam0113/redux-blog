import React from 'react';
import { shallow } from 'enzyme';
import HeaderNav from './HeaderNav';

const user = { displayName: 'Tester', photoURL: 'https://google.com' };
// let wrapper;
let loginSpy;
let logoutSpy;

beforeEach(() => {
  // wrapper = shallow(<HeaderNav user={user} />);
  loginSpy = jest.fn();
  logoutSpy = jest.fn();
});

describe('HeaderNav without auth', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<HeaderNav user={null} login={loginSpy} logout={logoutSpy} />);
  });

  it('should render HeaderNav correctly without auth', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call login func when click on login button', () => {
    const loginButton = wrapper.find('button').first();
    loginButton.simulate('click');

    expect(loginSpy).toHaveBeenCalled();
  });
});

describe('HeaderNav with auth', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<HeaderNav user={user} login={loginSpy} logout={logoutSpy} />);
  });

  it('should render HeaderNav correctly with auth', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show UserMenu when click on avatar', () => {
    const avatar = wrapper.find('Avatar').first();
    avatar.prop('onClick')();

    expect(wrapper.state('userMenuVisible')).toBe(true);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('UserMenu').length).toBe(1);
  });

  it('should call right action when click on item createNewPost in UserMenu', () => {
    const avatar = wrapper.find('Avatar').first();
    avatar.prop('onClick')();

    const userMenu = wrapper.find('UserMenu').first();
    userMenu.prop('createNewPost')();

    expect(wrapper.state('userMenuVisible')).toBe(false);
  });

  it('should call right action when click on item logout in UserMenu', () => {
    const avatar = wrapper.find('Avatar').first();
    avatar.prop('onClick')();

    const userMenu = wrapper.find('UserMenu').first();
    userMenu.prop('onLogout')();

    expect(logoutSpy).toHaveBeenCalled();
    expect(wrapper.state('userMenuVisible')).toBe(false);
  });
});

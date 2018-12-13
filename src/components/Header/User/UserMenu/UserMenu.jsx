import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// const items = [];
const UserMenu = ({ displayName, createNewPost, onLogout }) => (
  <ul className="blog-header__user-menu">
    <li className="blog-header__user-menu-item">{displayName}</li>
    <li
      className="blog-header__user-menu-item"
      onClick={createNewPost}
      onKeyPress={createNewPost}
      role="presentation"
    >
      Create new post
    </li>
    <li
      className="blog-header__user-menu-item"
      onClick={onLogout}
      onKeyPress={onLogout}
      role="presentation"
    >
      Sign out
    </li>
  </ul>
);

UserMenu.propTypes = {
  createNewPost: PropTypes.func,
  displayName: PropTypes.string,
  onLogout: PropTypes.func,
};

UserMenu.defaultProps = {
  createNewPost: () => {},
  displayName: '',
  onLogout: () => {},
};

export default UserMenu;

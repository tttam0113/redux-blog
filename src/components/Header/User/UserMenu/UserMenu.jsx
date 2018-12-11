import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// const items = [];
const UserMenu = ({ displayName, createNewPost, logout }) => {
    return (
        <ul className="blog-header__user-menu">
            <li className="blog-header__user-menu-item">{displayName}</li>
            <li className="blog-header__user-menu-item" onClick={createNewPost}>
                Create new post
            </li>
            <li className="blog-header__user-menu-item" onClick={logout}>
                Sign out
            </li>
        </ul>
    );
};

UserMenu.propTypes = {
    displayName: PropTypes.string,
    createNewPost: PropTypes.func,
    logout: PropTypes.func
};

export default UserMenu;

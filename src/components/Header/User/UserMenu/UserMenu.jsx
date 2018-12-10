import React from 'react';
// import { Link } from 'react-router-dom';
// const items = [];

export default ({ displayName, createNewPost, logout }) => {
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

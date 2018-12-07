import React from 'react';
import { Link } from 'react-router-dom';
const items = [
    {
        label: 'Courses',
        linkTo: '/'
    },
    {
        label: 'Features',
        linkTo: '/'
    },
    {
        label: 'Review',
        linkTo: '/'
    },
    {
        label: 'Blog',
        linkTo: '/'
    }
];

const HeaderNavItem = ({ linkTo, label }) => (
    <div className="blog-header__nav-item">
        <Link to={linkTo} className="btn btn--text">
            {label}
        </Link>
    </div>
);

const HeaderNav = ({ login, logout, user }) => (
    <div className="blog-header__nav">
        {/* {items.map((item, key) => (
            <HeaderNavItem key={key} {...item} />
        ))} */}

        {!user ? (
            <div className="blog-header__nav-item">
                <button className="btn btn--secondary " onClick={login}>
                    Login
                </button>
            </div>
        ) : (
            <React.Fragment>
                <div className="blog-header__nav-item">
                    <Link to="/posts/new" className="btn btn--secondary ">
                        Create new post
                    </Link>
                </div>

                <div className="blog-header__nav-item">
                    <button className="btn btn--secondary " onClick={logout}>
                        Logout
                    </button>
                </div>
            </React.Fragment>
        )}
    </div>
);

export default HeaderNav;

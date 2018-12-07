import React from 'react';
import HeaderBrand from './HeaderBrand';
import HeaderNav from './HeaderNav';

const Header = ({ login, logout, user }) => (
    <div className="blog-header">
        <div className="blog-header__content">
            <HeaderBrand />
            <HeaderNav login={login} logout={logout} user={user} />
        </div>
    </div>
);

export default Header;

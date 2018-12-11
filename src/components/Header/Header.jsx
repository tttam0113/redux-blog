import React from 'react';
import PropTypes from 'prop-types';
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

Header.propTypes = {
    login: PropTypes.func,
    logout: PropTypes.func,
    user: PropTypes.object,
};

export default Header;

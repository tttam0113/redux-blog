import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ avatar, displayName, onClick }) => (
    <div className="blog-header__avatar" onClick={onClick}>
        <img
            className="blog-header__avatar-icon"
            src={avatar}
            alt={displayName}
        />
    </div>
);

Avatar.propTypes = {
    avatar: PropTypes.string,
    displayName: PropTypes.string,
    onClick: PropTypes.func
};

export default Avatar;

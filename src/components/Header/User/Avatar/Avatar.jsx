import React from 'react';

const Avatar = ({ avatar, displayName, onClick }) => (
    <div className="blog-header__avatar" onClick={onClick}>
        <img
            className="blog-header__avatar-icon"
            src={avatar}
            alt={displayName}
        />
    </div>
);

export default Avatar;

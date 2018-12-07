import React from 'react';

const ContentPageHeader = ({title, subtitle}) => (
    <div className="blog-content-page__header">
        <h1 className="blog-content-page__title">{title}</h1>
        <p className="blog-content-page__subtitle">{subtitle}</p>
    </div>
);

export default ContentPageHeader;
import React from 'react';
import PropTypes from 'prop-types';
import ContentPageHeader from './ContentPageHeader';
// import ContentPageContent from './ContentPageContent';

const ContentPage = ({ title, subtitle, children }) => (
    <div className="blog-content-page">
        <ContentPageHeader title={title} subtitle={subtitle} />
        <div className="blog-content-page__content">{children}</div>
    </div>
);

ContentPage.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};

export default ContentPage;

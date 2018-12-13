import React from 'react';
import PropTypes from 'prop-types';

const ContentPageHeader = ({ title, subtitle }) => (
  <div className="blog-content-page__header">
    <h1 className="blog-content-page__title">{title}</h1>
    <p className="blog-content-page__subtitle">{subtitle}</p>
  </div>
);

ContentPageHeader.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ContentPageHeader;

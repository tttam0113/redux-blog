import React from 'react';
import PropTypes from 'prop-types';

const ContentPageContent = ({ children }) => (
  <div className="blog-content-page__content">{children}</div>
);

ContentPageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentPageContent;

import React from 'react';
import PropTypes from 'prop-types';
import ContentPageHeader from './ContentPageHeader';
import ContentPageContent from './ContentPageContent';

const ContentPage = ({ title, subtitle, children }) => (
  <div className="blog-content-page">
    <ContentPageHeader title={title} subtitle={subtitle} />
    {/* <div className="blog-content-page__content">{children}</div> */}
    <ContentPageContent>{children}</ContentPageContent>
  </div>
);

ContentPage.propTypes = {
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ContentPage;

import React from 'react';
import ContentPage from 'components/ContentPage';
import PostsListContainer from 'containers/PostsListContainer';

const PostsListView = props => (
  <ContentPage title="Blog" subtitle="Javascript Guides, Tips and Tricks">
    <PostsListContainer {...props} />
  </ContentPage>
);

export default PostsListView;

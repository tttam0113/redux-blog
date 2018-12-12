import React from 'react';
import ContentPage from 'components/ContentPage';
import PostsEditPageContainer from 'containers/PostsEditPageContainer';

const PostsEditView = props => (
  <ContentPage
    title="Edit post"
    subtitle="Carefully to edit a post which is not published by yourself"
  >
    <PostsEditPageContainer {...props} />
  </ContentPage>
);

export default PostsEditView;

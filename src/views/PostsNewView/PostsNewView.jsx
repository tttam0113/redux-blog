import React from 'react';
import ContentPage from 'components/ContentPage';
import PostsNewPageContainer from '../../containers/PostsNewPageContainer';

const PostsNewView = () => (
    <ContentPage
        title="Create New Post"
        subtitle="Write your own post in markdown language"
    >
        <PostsNewPageContainer />
    </ContentPage>
);

export default PostsNewView;

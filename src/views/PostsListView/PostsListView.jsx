import React from 'react';
import ContentPage from 'components/ContentPage';
import PostsListContainer from 'containers/PostsListContainer';

const PostsListView = () => (
    <ContentPage title="Blog" subtitle="Javascript Guides, Tips and Tricks">
        <PostsListContainer />
    </ContentPage>
)

export default PostsListView;
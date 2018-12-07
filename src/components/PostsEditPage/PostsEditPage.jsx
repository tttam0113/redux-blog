import React from 'react';

import PostsForm from '../PostsForm'

class PostsEditPage extends React.Component {
    onSubmit = (id, update) => {
        this.props.updatePost({id, update});
    }

    render() {
        return (
            <div>
                <PostsForm post={this.props.post} onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default PostsEditPage;
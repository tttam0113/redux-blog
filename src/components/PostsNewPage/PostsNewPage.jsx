import React from 'react';

import PostForm from '../PostsForm';

export class PostNewPage extends React.Component {
    onSubmit = post => {
        this.props.addPost({ post });
        // this.props.history.push('/');
    };

    render() {
        return (
            <div className="blog-post-form">
                <PostForm onSubmit={this.onSubmit} />
                {this.props.submitting ? <span>Submitting...</span> : null}
            </div>
        );
    }
}

export default PostNewPage;

import React from 'react';

import PostsForm from '../PostsForm';
import Spinner from '../Spinner';

class PostsEditPage extends React.Component {
    componentDidMount() {
        const { postId } = this.props.match.params;
        this.props.fetchPost({ postId });
    }

    onSubmit = update => {
        const { postId } = this.props.match.params;
        this.props.updatePost({ id: postId, update });
    };

    render() {
        const { loading, post } = this.props;
        return (
            <div>
                {loading ? <Spinner /> : null}
                {post && post.content ? (
                    <div className="blog-post-form">
                        <PostsForm
                            post={this.props.post}
                            onSubmit={this.onSubmit}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default PostsEditPage;

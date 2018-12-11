import React from 'react';
import PropTypes from 'prop-types';
import PostForm from '../PostsForm';

export class PostNewPage extends React.Component {
    onSubmit = (post) => {
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

PostNewPage.propTypes = {
    addPost: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
};

PostNewPage.defaultProps = {
    submitting: false,
};

export default PostNewPage;

import React from 'react';
import PropTypes from 'prop-types';
import PostsForm from '../PostsForm';
import Spinner from '../Spinner';

class PostsEditPage extends React.Component {
  componentDidMount() {
    const { post } = this.props;
    const { postId } = this.props.match.params;
    if (!post || post.id !== postId) {
      this.props.fetchPost({ postId });
    }
  }

  handleOnSubmit = update => {
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
            <PostsForm post={this.props.post} onSubmit={this.handleOnSubmit} />
          </div>
        ) : null}
      </div>
    );
  }
}

PostsEditPage.propTypes = {
  fetchPost: PropTypes.func,
  loading: PropTypes.bool,
  match: PropTypes.object,
  post: PropTypes.object,
  updatePost: PropTypes.func,
};

PostsEditPage.defaultProps = {
  loading: false,
  post: undefined,
};

export default PostsEditPage;

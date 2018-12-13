import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'markdown-to-jsx';
import ContentPage from '../ContentPage';
import Spinner from '../Spinner';

class PostDetail extends React.Component {
  componentDidMount() {
    const { post } = this.props;
    const { postId } = this.props.match.params;
    if (!post || post.id !== postId) {
      this.props.fetchPost({ postId });
    }
  }

  renderActions = postId => (
    <div className="blog-post-detail__actions">
      <Link to="/posts/new" className="btn btn--secondary">
        Create new post
      </Link>
      <Link to={`/posts/edit/${postId}`} className="btn btn--secondary">
        Edit
      </Link>
    </div>
  );

  renderPostContent = postContent => (
    <ReactMarkdown className="blog-post-detail__content markdown-element">
      {postContent.replace(/<br\/>/gi, '\n')}
    </ReactMarkdown>
  );

  render() {
    const { loading, post = {} } = this.props;
    const { id = '', content = '', title = '', author = 'Unknown' } = post;
    const subtitle = `Published by ${author}`;
    return (
      <ContentPage title={title} subtitle={subtitle}>
        <div className="blog-post-detail">
          {loading ? <Spinner /> : null}
          {content ? (
            <React.Fragment>
              {this.renderActions(id)}
              {this.renderPostContent(content)}
            </React.Fragment>
          ) : null}
        </div>
      </ContentPage>
    );
  }
}

PostDetail.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  post: PropTypes.object,
};

PostDetail.defaultProps = {
  post: {},
};

export default PostDetail;

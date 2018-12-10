import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'markdown-to-jsx';

import ContentPage from '../ContentPage';
import Spinner from '../Spinner';

class PostDetail extends React.Component {
    componentDidMount() {
        const { postId } = this.props.match.params;
        this.props.fetchPost({ postId });
    }

    render() {
        const { loading, post } = this.props;
        const title = post && post.title ? post.title : '';
        const subtitle =
            post && post.author ? `Published by ${post.author}` : '';
        return (
            <ContentPage title={title} subtitle={subtitle}>
                <div className="blog-post-detail">
                    {loading ? <Spinner /> : null}
                    {post && post.content ? (
                        <React.Fragment>
                            <div className="blog-post-detail__actions">
                                <Link
                                    to="/posts/new"
                                    className="btn btn--secondary"
                                >
                                    Create new post
                                </Link>
                                <Link
                                    to={`/posts/edit/${post.id}`}
                                    className="btn btn--secondary"
                                >
                                    Edit
                                </Link>
                            </div>
                            <ReactMarkdown className="blog-post-detail__content markdown-element">
                                {post.content.replace(/<br\/>/gi, '\n')}
                            </ReactMarkdown>
                        </React.Fragment>
                    ) : null}
                </div>
            </ContentPage>
        );
    }
}

export default PostDetail;

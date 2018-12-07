import React from 'react';
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
        const subtitle = post && post.author ? `Published by ${post.author}` : '';
        return (
            <ContentPage title={title} subtitle={subtitle}>
                <div className="blog-post-detail">
                    {loading ? <Spinner /> : null}
                    {post && post.content ? (
                        <ReactMarkdown className="blog-post-detail__content markdown-element">
                            {post.content.replace(/<br\/>/gi, '\n')}
                        </ReactMarkdown>
                    ) : null}
                </div>
            </ContentPage>
        );
    }
}

export default PostDetail;

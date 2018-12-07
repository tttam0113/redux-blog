import React from 'react';

import Spinner from '../Spinner';
import PostPreview from './PostPreview';

class PostsList extends React.Component {
    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        const {authenticated, loading, items } = this.props;
        return (
            <div className="blog-posts">
                {items && items.length > 0 ? (
                    <div>
                        {items.map(post => (
                            <PostPreview key={post.id} item={post} authenticated/>
                        ))}
                    </div>
                ) : null}
                {loading ? <Spinner /> : null}
                {/* {currentPage <= totalPages && !loading ? (
            <LoadMoreBtn text="Load More" onClick={loadMoreMovies} />
        ) : null} */}
            </div>
        );
    }
}

export default PostsList;

import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import PostPreview from './PostPreview';

class PostsList extends React.Component {
    UNSAFE_componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        const { authenticated, loading, items } = this.props;
        return (
            <div className="blog-posts">
                {items && items.length > 0 ? (
                    <div>
                        {items.map(post => (
                            <PostPreview
                                key={post.id}
                                item={post}
                                authenticated={authenticated}
                            />
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

PostsList.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    authenticated: PropTypes.bool,
    loading: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object),
};

PostsList.defaultProps = {
    authenticated: false,
    loading: false,
    items: [],
};

export default PostsList;

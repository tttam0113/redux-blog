import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import PostPreview from './PostPreview';

class PostsList extends React.Component {
    componentWillMount() {
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
    authenticated: PropTypes.bool,
    fetchPosts: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
};

PostsList.defaultProps = {
    authenticated: false,
    loading: false,
    items: [],
};

export default PostsList;

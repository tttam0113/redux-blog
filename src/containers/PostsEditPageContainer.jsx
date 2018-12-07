import { connect } from 'react-redux';

import PostsEditPage from '../components/PostsEditPage';

import { updatePost, fetchPost } from '../redux/actions/postDetail';

import {
    getPostDetailLoading,
    getPostDetailUpdating
} from '../redux/selectors/ui';
import { getPostDetail } from '../redux/selectors/posts';

const mapStateToProps = state => ({
    // post: state.posts.items.find(p => p.id === props.match.params.postId)
    loading: getPostDetailLoading(state),
    updating: getPostDetailUpdating(state),
    post: getPostDetail(state)
});

const mapDispatchToProps = { fetchPost, updatePost };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsEditPage);

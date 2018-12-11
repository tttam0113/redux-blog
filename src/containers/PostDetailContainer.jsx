import { connect } from 'react-redux';

import PostDetail from '../components/PostDetail';

import { fetchPost } from '../redux/actions/postDetail';

import { getPostDetailLoading } from '../redux/selectors/ui';
import { getPostDetail } from '../redux/selectors/posts';

const mapStateToProps = state => ({
    loading: getPostDetailLoading(state),
    post: getPostDetail(state),
});

const mapDispatchToProps = { fetchPost };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostDetail);

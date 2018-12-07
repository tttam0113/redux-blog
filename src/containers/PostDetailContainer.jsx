import { connect } from 'react-redux';
import { fetchPost } from '../redux/actions/postDetail';
import PostDetail from '../components/PostDetail';

const mapStateToProps = (state, props) => ({
    loading: state.ui.postDetail.loading,
    post: state.postDetail
});

const mapDispatchToProps = { fetchPost };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetail);

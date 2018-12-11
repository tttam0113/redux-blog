import { connect } from 'react-redux';
import { addPost } from 'redux/actions/postDetail';
import PostsNewPage from '../components/PostsNewPage';

// import requireAuth from '../hoc/requireAuth';

const mapStateToProps = state => ({
    submitting: state.ui.postForm.submitting
});

const mapDispatchToProps = {
    addPost
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsNewPage);

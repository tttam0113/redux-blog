import { connect } from 'react-redux';

import PostsEditPage from '../components/PostsEditPage';

import { updatePost } from '../redux/actions/postDetail';

const mapStateToProps = (state, props) => ({
    post: state.posts.items.find(p => p.id === props.match.params.postId)
});

const mapDispatchToProps = { updatePost };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsEditPage);
